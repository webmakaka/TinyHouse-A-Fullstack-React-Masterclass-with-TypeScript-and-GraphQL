require('dotenv').config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql';

const envChecks = async () => {
  if (!process.env.PORT) {
    throw new Error('Error: PORT must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Error: MONGO_URI must be defined');
  }

  if (!process.env.PUBLIC_URL) {
    throw new Error('Error: PUBLIC_URL must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('Error: GOOGLE_CLIENT_ID must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Error: GOOGLE_CLIENT_SECRET must be defined');
  }
};

envChecks();

const mount = async (app: Application) => {
  const db = await connectDatabase();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
