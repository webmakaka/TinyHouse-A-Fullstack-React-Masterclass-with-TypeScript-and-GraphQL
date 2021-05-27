require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import express, { Application } from 'express';
import { connectDatabase } from './database';
import { resolvers, typeDefs } from './graphql';

const envChecks = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('Error: MONGO_URI must be defined');
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

  app.listen(process.env.GRAPHQL_PORT, () => {
    console.log(`[app] : http://localhost:${process.env.GRAPHQL_PORT}/api/`);
  });
};

mount(express());
