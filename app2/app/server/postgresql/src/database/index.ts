import { IDatabase } from 'lib/types';
import { createConnection } from 'typeorm';
import { BookingEntity, ListingEntity, UserEntity } from './entity';

export const connectDatabase = async (): Promise<IDatabase> => {
  const connection = await createConnection();

  return {
    bookings: connection.getRepository(BookingEntity),
    listings: connection.getRepository(ListingEntity),
    users: connection.getRepository(UserEntity),
  };
};
