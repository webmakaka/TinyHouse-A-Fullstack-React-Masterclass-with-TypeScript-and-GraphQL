import { IResolvers } from 'apollo-server-express';
import { IBooking, IDatabase, IListing } from 'lib/types';

export const bookingResolvers: IResolvers = {
  Booking: {
    id: (booking: IBooking): string => {
      return booking._id.toString();
    },
    listing: (
      booking: IBooking,
      _args: {},
      { db }: { db: IDatabase }
    ): Promise<IListing | null> => {
      return db.listings.findOne({ _id: booking.listing });
    },
  },
};
