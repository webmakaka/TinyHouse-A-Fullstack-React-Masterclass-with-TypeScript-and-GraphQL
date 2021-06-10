import merge from 'lodash.merge';
import { userResolvers } from './User';
import { listingResolvers } from './Listing';
import { bookingResolvers } from './Booking';
import { viewerResolvers } from './Viewer';

export const resolvers = merge(
  userResolvers,
  listingResolvers,
  bookingResolvers,
  viewerResolvers
);
