import { IResolvers } from 'apollo-server-express';
import crypto from 'crypto';
import { Request } from 'express';
import { ICreateBookingArgs } from 'graphql/resolvers/Booking/types';
import { Stripe } from 'lib/api';
import { IBooking, IBookingsIndex, IDatabase } from 'lib/types';
import { authorize } from 'lib/utils';

const millisecondsPerDay = 86400000;

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

    dateCursor = new Date(dateCursor.getTime() + millisecondsPerDay);
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

        const listing = await db.listings.findOne({ id });

        if (!listing) {
          throw new Error('[App] listing cannot be found');
        }

        if (listing.host === viewer.id) {
          throw new Error('[App] cannot book own listing');
        }

        const today = new Date();
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        if (checkInDate.getTime() > today.getTime() + 90 * millisecondsPerDay) {
          throw new Error(
            "[App] check in date can't be more than 90 days from today"
          );
        }

        if (
          checkOutDate.getTime() >
          today.getTime() + 90 * millisecondsPerDay
        ) {
          throw new Error(
            "[App] check out date can't be more than 90 days from today"
          );
        }

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
          ((checkOutDate.getTime() - checkInDate.getTime()) /
            millisecondsPerDay +
            1);

        const host = await db.users.findOne({
          id: listing.host,
        });

        if (!host || !host.walletId) {
          throw new Error(
            '[App] the host either cannot be found or is not connected with Stripe'
          );
        }

        await Stripe.charge(totalPrice, source, host.walletId);

        const newBooking: IBooking = {
          id: crypto.randomBytes(16).toString('hex'),
          listing: listing.id,
          tenant: viewer.id,
          checkIn,
          checkOut,
        };

        const insertedBooking = await db.bookings.create(newBooking).save();

        host.income = host.income + totalPrice;
        await host.save();

        viewer.bookings.push(insertedBooking.id);
        await viewer.save();

        listing.bookingsIndex = bookingsIndex;
        listing.bookings.push(insertedBooking.id);
        await listing.save();

        return insertedBooking;
      } catch (error) {
        {
          throw new Error(`[App] Failed to create a booking: ${error}`);
        }
      }
    },
  },
  Booking: {
    listing: (booking: IBooking, _args: {}, { db }: { db: IDatabase }) => {
      return db.listings.findOne({ id: booking.listing });
    },
    tenant: (booking: IBooking, args: {}, { db }: { db: IDatabase }) => {
      return db.users.findOne({
        id: booking.tenant,
      });
    },
  },
};
