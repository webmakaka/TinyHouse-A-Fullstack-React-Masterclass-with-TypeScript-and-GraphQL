import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import {
  EListingsFilter,
  IHostListingArgs,
  IHostListingInput,
  IListingArgs,
  IListingBookingsArgs,
  IListingBookingsData,
  IListingsArgs,
  IListingsData,
  IListingsQuery,
} from 'graphql/resolvers/Listing/types';
import { Cloudinary, Google } from 'lib/api';
import { EListingType, IDatabase, IListing, IUser } from 'lib/types';
import { authorize } from 'lib/utils';
import { ObjectId } from 'mongodb';

const verifyHostListingInput = ({
  title,
  description,
  type,
  price,
}: IHostListingInput) => {
  if (title.length > 100) {
    throw new Error('listing title must be under 100 characters');
  }
  if (description.length > 5000) {
    throw new Error('listing description must be under 5000 characters');
  }
  if (type !== EListingType.Apartment && type !== EListingType.House) {
    throw new Error('listing must be either an apartment of house');
  }
  if (price < 0) {
    throw new Error('price must be greater than 0');
  }
};

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: IListingArgs,
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IListing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) });
        if (!listing) {
          throw new Error("[APP]: Listing can't be found");
        }

        const viewer = await authorize(db, req);

        if (viewer && viewer._id === listing.host) {
          listing.authorized = true;
        }

        return listing;
      } catch (error) {
        throw new Error(`[APP]: Failed to query listing: ${error}`);
      }
    },
    listings: async (
      _root: undefined,
      { location, filter, limit, page }: IListingsArgs,
      { db }: { db: IDatabase }
    ): Promise<IListingsData> => {
      try {
        const query: IListingsQuery = {};
        const data: IListingsData = {
          region: null,
          total: 0,
          result: [],
        };

        if (location) {
          const { country, admin, city } = await Google.geocode(location);
          if (city) query.city = city;
          if (admin) query.admin = admin;
          if (country) {
            query.country = country;
          } else {
            throw new Error('[App] No country found!');
          }

          const cityText = city ? `${city}, ` : '';
          const adminText = admin ? `${admin}, ` : '';
          data.region = `${cityText}${adminText}${country}`;
        }

        let cursor = await db.listings.find(query);

        if (filter && filter === EListingsFilter.PRICE_LOW_TO_HIGH) {
          cursor = cursor.sort({ price: 1 });
        }

        if (filter && filter === EListingsFilter.PRICE_HIGH_TO_LOW) {
          cursor = cursor.sort({ price: -1 });
        }
        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`[APP]: Failed to query listings: ${error}`);
      }
    },
  },
  Mutation: {
    hostListing: async (
      _root: undefined,
      { input }: IHostListingArgs,
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IListing> => {
      verifyHostListingInput(input);
      const viewer = await authorize(db, req);
      if (!viewer) {
        throw new Error('viewer cannot be found');
      }
      const { country, admin, city } = await Google.geocode(input.address);
      if (!country || !admin || !city) {
        throw new Error('invalid address input');
      }

      const imageUrl = await Cloudinary.upload(input.image);

      const insertResult = await db.listings.insertOne({
        _id: new ObjectId(),
        ...input,
        image: imageUrl,
        bookings: [],
        bookingsIndex: {},
        country,
        admin,
        city,
        host: viewer._id,
      });

      const insertedListing: IListing = insertResult.ops[0];
      await db.users.updateOne(
        {
          _id: viewer._id,
        },
        { $push: { listings: insertedListing._id } }
      );
      return insertedListing;
    },
  },
  Listing: {
    id: (listing: IListing): string => {
      return listing._id.toString();
    },
    host: async (
      listing: IListing,
      _args: {},
      { db }: { db: IDatabase }
    ): Promise<IUser> => {
      const host = await db.users.findOne({ _id: listing.host });
      if (!host) {
        throw new Error("[App]: Host can't be found!");
      }
      return host;
    },
    bookingsIndex: (listing: IListing): string => {
      return JSON.stringify(listing.bookingsIndex);
    },
    bookings: async (
      listing: IListing,
      { limit, page }: IListingBookingsArgs,
      { db }: { db: IDatabase }
    ): Promise<IListingBookingsData | null> => {
      try {
        if (!listing.authorized) {
          return null;
        }

        const data: IListingBookingsData = {
          total: 0,
          result: [],
        };

        let cursor = await db.bookings.find({
          _id: { $in: listing.bookings },
        });

        cursor = cursor.skip(page > 0 ? (page - 1) * limit : 0);
        cursor = cursor.limit(limit);

        data.total = await cursor.count();
        data.result = await cursor.toArray();

        return data;
      } catch (error) {
        throw new Error(`[APP]: Failed to query listing bookings: ${error}`);
      }
    },
  },
};
