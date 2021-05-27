require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import { connectDatabase } from 'database';
import express, { Application } from 'express';
import { resolvers, typeDefs } from './graphql';

// const allowUnauthorized = process.env.NODE_TLS_REJECT_UNAUTHORIZED === '0';
// console.log('ALLOW UNAUTHORIZED', allowUnauthorized);

const envChecks = async () => {
  if (!process.env.PORT) {
    throw new Error('[APP]: PORT must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('[APP]: MONGO_URI must be defined');
  }

  if (!process.env.PUBLIC_URL) {
    throw new Error('[APP]: PUBLIC_URL must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error('[APP]: GOOGLE_CLIENT_ID must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('[APP]: GOOGLE_CLIENT_SECRET must be defined');
  }

  if (!process.env.COOKIE_PARSER_SECRET) {
    throw new Error('[APP]: COOKIE_PARSER_SECRET must be defined');
  }

  if (!process.env.NODE_ENV) {
    throw new Error('[APP]: NODE_ENV must be defined');
  }

  if (!process.env.GOOGLE_GEOCODING_API_KEY) {
    throw new Error('[APP]: GOOGLE_GEOCODING_API_KEY must be defined');
  }
};

envChecks();

const mount = async (app: Application) => {
  const db = await connectDatabase();

  app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });

  server.applyMiddleware({ app, path: '/api' });
  app.listen(process.env.GRAPHQL_PORT, () => {
    console.log(`[app] : http://localhost:${process.env.GRAPHQL_PORT}/api/`);
  });
};

mount(express());
