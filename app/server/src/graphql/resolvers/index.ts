import merge from 'lodash.merge';
import { userResovers } from './User';
import { viewerResolvers } from './Viewer';

export const resolvers = merge(userResovers, viewerResolvers);
