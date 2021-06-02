import { ListingEntity } from 'database/entity';
import { Database } from 'lib/types';
import { createConnection } from 'typeorm';

export const connectDatabase = async (): Promise<Database> => {
  const connection = await createConnection();

  return {
    listings: connection.getRepository(ListingEntity),
  };
};
