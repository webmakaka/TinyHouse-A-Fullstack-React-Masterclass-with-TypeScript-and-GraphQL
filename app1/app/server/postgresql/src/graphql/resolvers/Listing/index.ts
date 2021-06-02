import { IResolvers } from 'apollo-server-express';
import crypto from 'crypto';
import { Database, Listing } from 'lib/types';

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ id });

      if (!listing) {
        throw new Error(`[App] Failed to find listing with id: ${id}`);
      }

      return listing;
    },

    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      return await db.listings.find({});
    },
  },
  Mutation: {
    createListing: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing> => {
      const newListing = {
        id: crypto.randomBytes(16).toString('hex'),
        title: 'Clean and fully furnished apartment. 5 min away from CN Tower',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg',
        address: '3210 Scotchmere Dr W, Toronto, ON, CA',
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5,
      };

      return await db.listings.create(newListing).save();
    }, 

    updateListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ id });

      if (!listing) {
        throw new Error(`[App] Failed to find listing with id: ${id}`);
      }

      listing.title = '[UPDATED] This is my updated title!';

      return await listing.save();
    },

    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      const listing = await db.listings.findOne({ id });
      if (!listing) {
        throw new Error(`[App] Failed to find listing with id: ${id}`);
      }
      return await listing.remove();
    },
  },
};
