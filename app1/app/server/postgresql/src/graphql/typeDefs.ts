import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Listing {
    id: ID!
    title: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Float!
  }

  type Query {
    listing(id: ID!): Listing!
    listings: [Listing!]!
  }

  type Mutation {
    createListing: Listing!
    updateListing(id: ID!): Listing!
    deleteListing(id: ID!): Listing!
  }
`;
