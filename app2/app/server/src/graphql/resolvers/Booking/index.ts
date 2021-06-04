import { IResolvers } from 'apollo-server-express';
import { Request } from 'express';
import { ICreateBookingArgs } from 'graphql/resolvers/Booking/types';
import { Stripe } from 'lib/api';
import { IBooking, IBookingsIndex, IDatabase, IListing } from 'lib/types';
import { authorize } from 'lib/utils';
import { ObjectId } from 'mongodb';

const resolveBookingsIndex = (
  bookingsIndex: IBookingsIndex,
  checkInDate: string,
  checkOutDate: string
): IBookingsIndex => {
  let dateCursor = new Date(checkInDate);
  let checkOut = new Date(checkOutDate);
  const newBookingsIndex: IBookingsIndex = { ...bookingsIndex };

  while (dateCursor <= checkOut) {
    const y = dateCursor.getUTCFullYear();
    const m = dateCursor.getUTCMonth();
    const d = dateCursor.getDate();

    if (!newBookingsIndex[y]) {
      newBookingsIndex[y] = {};
    }

    if (!newBookingsIndex[y][m]) {
      newBookingsIndex[y][m] = {};
    }

    if (!newBookingsIndex[y][m][d]) {
      newBookingsIndex[y][m][d] = true;
    } else {
      throw new Error(
        '[App] selected dates cannot overlap dates that have already been booked'
      );
    }

    dateCursor = new Date(dateCursor.getTime() + 86400000);
  }

  return newBookingsIndex;
};

export const bookingResolvers: IResolvers = {
  Mutation: {
    createBooking: async (
      _root: undefined,
      { input }: ICreateBookingArgs,
      { db, req }: { db: IDatabase; req: Request }
    ): Promise<IBooking> => {
      try {
        const { id, source, checkIn, checkOut } = input;

        let viewer = await authorize(db, req);

        if (!viewer) {
          throw new Error('[App] viewer cannot be found');
        }

        const listing = await db.listings.findOne({
          _id: new ObjectId(id),
        });

        if (!listing) {
          throw new Error('[App] listing cannot be found');
        }

        if (listing.host === viewer._id) {
          throw new Error('[App] cannot book own listing');
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkOutDate < checkInDate) {
          throw new Error(
            '[App] check out date cannot be before check in date'
          );
        }

        const bookingsIndex = resolveBookingsIndex(
          listing.bookingsIndex,
          checkIn,
          checkOut
        );

        const totalPrice =
          listing.price *
          ((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1);

        const host = await db.users.findOne({
          _id: listing.host,
        });
        if (!host || !host.walletId) {
          throw new Error(
            '[App] the host either cannot be found or is not connected with Stripe'
          );
        }

        await Stripe.charge(totalPrice, source, host.walletId);

        const insertRes = await db.bookings.insertOne({
          _id: new ObjectId(),
          listing: listing._id,
          tenant: viewer._id,
          checkIn,
          checkOut,
        });

        const insertedBooking: IBooking = insertRes.ops[0];

        await db.users.updateOne(
          {
            _id: host._id,
          },
          {
            $inc: { income: totalPrice },
          }
        );

        await db.users.updateOne(
          {
            _id: viewer._id,
          },
          {
            $push: { bookings: insertedBooking._id },
          }
        );

        await db.listings.updateOne(
          {
            _id: listing._id,
          },
          {
            $set: { bookingsIndex },
            $push: { bookings: insertedBooking._id },
          }
        );

        return insertedBooking;
      } catch (error) {
        {
          throw new Error(`[App] Failed to create a booking: ${error}`);
        }
      }
    },
  },
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
    tenant: (booking: IBooking, args: {}, { db }: { db: IDatabase }) => {
      return db.users.findOne({
        _id: booking.tenant,
      });
    },
  },
};
