import { IBooking, IDatabase, IListing, IUser } from 'lib/types';
import { MongoClient } from 'mongodb';

// const url = `mongodb+srv://${process.env.DB_USER}:${
//   process.env.DB_USER_PASSWORD
// }@${process.env.DB_CLUSTER}.mongodb.net`;

const url = `${process.env.MONGO_URI}`;

export const connectDatabase = async (): Promise<IDatabase> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = client.db('main');

  return {
    bookings: db.collection<IBooking>('bookings'),
    listings: db.collection<IListing>('listings'),
    users: db.collection<IUser>('users'),
  };
};
