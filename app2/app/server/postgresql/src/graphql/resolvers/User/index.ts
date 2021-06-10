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
        const user = await db.users.findOne({ _id: id });

        if (!user) {
          throw new Error("[APP]: User can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === user._id) {
          user.authorized = true;
        }
        return user;
      } catch (error) {
        throw new Error(`[APP]: Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: IUser): string => {
      return user._id;
    },
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

        let cursor = await db.bookings.find({
          _id: { $in: user.bookings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

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

        let cursor = await db.listings.find({
          _id: { $in: user.listings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`[APP]: Failed to query user listings: ${error}`);
      }
    },
  },
};
