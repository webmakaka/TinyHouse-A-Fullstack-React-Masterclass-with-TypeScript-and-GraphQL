import { IResolvers } from 'apollo-server-express';

export const userResovers: IResolvers = {
  Query: {
    user: () => {
      return 'Query.user';
    },
  },
};
