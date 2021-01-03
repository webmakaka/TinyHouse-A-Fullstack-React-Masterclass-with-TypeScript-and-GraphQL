import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import { Listings } from './sections';
import './styles/index.css';

const httpLink = createHttpLink({
  uri: '/api',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse Listings" />
  </ApolloProvider>,
  document.getElementById('root')
);
