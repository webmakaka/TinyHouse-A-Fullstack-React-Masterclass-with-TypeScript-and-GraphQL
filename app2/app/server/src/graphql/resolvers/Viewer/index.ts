import { IResolvers } from 'apollo-server-express';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { Google, Stripe } from 'lib/api';
import { IDatabase, IUser, IViewer } from 'lib/types';
import { authorize } from 'lib/utils';
import { IConnectStripeArgs, ILogInArgs } from './types';

const cookieOptions = {
  httpOnly: true,
  sameSite: true,
  signed: true,
  secure: process.env.NODE_ENV === 'development' ? false : true,
};

const logInViaCookie = async (
  token: string,
  db: IDatabase,
  req: Request,
  res: Response
): Promise<IUser | undefined> => {
  const updateRes = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } },
    { returnOriginal: false }
  );

  const viewer = updateRes.value;

  if (!viewer) {
    res.clearCookie('viewer', cookieOptions);
  }

  return viewer;
};

const logInViaGoogle = async (
  code: string,
  token: string,
  db: IDatabase,
  res: Response
): Promise<IUser | undefined> => {
  const { user } = await Google.logIn(code);

  if (!user) {
    throw new Error('[APP]: Google login error');
  }

  const userNamesList = user.names && user.names.length ? user.names : null;
  const userPhotosList = user.photos && user.photos.length ? user.photos : null;
  const userEmailsList =
    user.emailAddresses && user.emailAddresses.length
      ? user.emailAddresses
      : null;

  // User Display Name
  const userName = userNamesList ? userNamesList[0].displayName : null;

  const userId =
    userNamesList &&
    userNamesList[0].metadata &&
    userNamesList[0].metadata.source
      ? userNamesList[0].metadata.source.id
      : null;

  const userAvatar =
    userPhotosList && userPhotosList[0].url ? userPhotosList[0].url : null;

  const userEmail =
    userEmailsList && userEmailsList[0].value ? userEmailsList[0].value : null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error('[App] Google login error');
  }

  const updateRes = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnOriginal: false }
  );

  let viewer = updateRes.value;

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: [],
    });

    viewer = insertResult.ops[0];
  }

  res.cookie('viewer', userId, {
    ...cookieOptions,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });

  return viewer;
};

export const viewerResolvers: IResolvers = {
  Query: {
    authUrl: (): string => {
      try {
        return Google.authUrl;
      } catch (error) {
        throw new Error(`[APP]: Failed to query Google Auth Url: ${error}`);
      }
    },
  },

  Mutation: {
    logIn: async (
      _root: undefined,
      { input }: ILogInArgs,
      { db, req, res }: { db: IDatabase; req: Request; res: Response }
    ): Promise<IViewer> => {
      try {
        const code = input ? input.code : null;
        const token = crypto.randomBytes(16).toString('hex');

        const viewer: IUser | undefined = code
          ? await logInViaGoogle(code, token, db, res)
          : await logInViaCookie(token, db, req, res);

        if (!viewer) {
          return { didRequest: true };
        }

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`[APP]: Failed to log in ${error}`);
      }
    },
    logOut: (
      _root: undefined,
      _args: {},
      { res }: { res: Response }
    ): IViewer => {
      try {
        res.clearCookie('viewer', cookieOptions);
        return { didRequest: true };
      } catch (error) {
        throw new Error(`[APP]: Failed to log out: ${error}`);
      }
    },
    connectStripe: async (
      _root: undefined,
      { input }: IConnectStripeArgs,
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IViewer> => {
      try {
        const { code } = input;
        let viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error('[App] viewer cannot be found');
        }

        const wallet = await Stripe.connect(code);

        if (!wallet) {
          throw new Error('[App] stripe grant error');
        }

        const updateRes = await db.users.findOneAndUpdate(
          {
            _id: viewer._id,
          },
          { $set: { walletId: wallet.stripe_user_id } },
          { returnOriginal: false }
        );

        if (!updateRes.value) {
          throw new Error('[App] viewer could not be updated');
        }

        viewer = updateRes.value;

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`[App] Failed to connect with Stripe: ${error}`);
      }
    },

    disconnectStripe: async (
      _root: undefined,
      _args: {},
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IViewer> => {
      try {
        let viewer = await authorize(db, req);
        if (!viewer) {
          throw new Error('[App] viewer cannot be found');
        }

        const updateRes = await db.users.findOneAndUpdate(
          { _id: viewer._id },
          { $set: { walletId: undefined } },
          { returnOriginal: false }
        );

        if (!updateRes.value) {
          throw new Error('[App] viewer could not be updated');
        }

        viewer = updateRes.value;

        return {
          _id: viewer._id,
          token: viewer.token,
          avatar: viewer.avatar,
          walletId: viewer.walletId,
          didRequest: true,
        };
      } catch (error) {
        throw new Error(`[App] Failed to disconnect with Stripe: ${error}`);
      }
    },
  },
  Viewer: {
    id: (viewer: IViewer): string | undefined => {
      return viewer._id;
    },
    hasWallet: (viewer: IViewer): boolean | undefined => {
      return viewer.walletId ? true : undefined;
    },
  },
};
