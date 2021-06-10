import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import { IDatabase, IUser } from 'lib/types';
import { authorize } from 'lib/utils';
import {
  IUserArgs,
  IUserBookingsArgs,
  IUserBookingsData,
  IUserListingsArgs,
  IUserListingsData,
} from './types';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: IUserArgs,
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IUser> => {
      try {
        const user = (await db.users.findOne({ id })) as IUser;

        if (!user) {
          throw new Error("[APP]: User can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer.id === user.id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`[APP]: Failed to query user: ${error}`);
      }
    },
  },
  User: {
    hasWallet: (user: IUser): boolean => {
      return Boolean(user.walletId);
    },
    income: (user: IUser): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: IUser,
      { limit, page }: IUserBookingsArgs,
      { db }: { db: IDatabase }
    ): Promise<IUserBookingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const data: IUserBookingsData = {
          total: 0,
          result: [],
        };

        const bookings = await db.bookings.findByIds(user.bookings, {
          skip: page > 0 ? (page - 1) * limit : 0,
          take: limit,
        });

        data.total = user.bookings.length;
        data.result = bookings;

        return data;
      } catch (error) {
        throw new Error(`[APP]: Failed to query user bookings: ${error}`);
      }
    },
    listings: async (
      user: IUser,
      { limit, page }: IUserListingsArgs,
      { db }: { db: IDatabase }
    ): Promise<IUserListingsData | null> => {
      try {
        const data: IUserListingsData = {
          total: 0,
          result: [],
        };

        const listings = await db.listings.findByIds(user.listings, {
          skip: page > 0 ? (page - 1) * limit : 0,
          take: limit,
        });

        data.total = user.listings.length;
        data.result = listings;

        return data;
      } catch (error) {
        throw new Error(`[APP]: Failed to query user listings: ${error}`);
      }
    },
  },
};
