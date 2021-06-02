require('dotenv').config();

import crypto from 'crypto';
import { connectDatabase } from 'database';
import { Listing } from 'lib/types';

const seed = async () => {
  try {
    console.log('[seed] : running...');

    const db = await connectDatabase();
    const listings: Listing[] = [
      {
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
      },
      {
        id: crypto.randomBytes(16).toString('hex'),
        title: 'Luxurious home with private pool',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg',
        address: '100 Hollywood Hills Dr, Los Angeles, California',
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4,
      },
      {
        id: crypto.randomBytes(16).toString('hex'),
        title: 'Single bedroom located in the heart of downtown San Fransisco',
        image:
          'https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg',
        address: '200 Sunnyside Rd, San Fransisco, California',
        price: 25000,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3,
      },
    ];

    for (const listing of listings) {
      await db.listings.create(listing).save();
    }

    console.log('[seed] : success');
  } catch {
    throw new Error('failed to seed database');
  } finally {
    process.exit();
  }
};

seed();
