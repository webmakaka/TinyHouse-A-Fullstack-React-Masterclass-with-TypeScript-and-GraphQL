import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider, useMutation } from '@apollo/react-hooks';
import { LOG_IN } from 'lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables,
} from 'lib/graphql/mutations/LogIn/__generated__/LogIn';
import { AppHeaderSkeleton, ErrorBanner } from 'lib/components';
import { Affix, Spin, Layout } from 'antd';
import {
  AppHeader,
  Home,
  Host,
  Listing,
  Listings,
  NotFound,
  User,
  Login,
} from './sections';
import { Viewer } from './lib/types';
import './styles/index.css';
import { setContext } from '@apollo/client/link/context';

// https://www.apollographql.com/docs/react/networking/authentication/

const httpLink = createHttpLink({
  uri: '/api',
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token') || null;

  return {
    headers: {
      ...headers,
      'X-CSRF-TOKEN': token || '',
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// const client = new ApolloClient({
//   uri: '/api',
//   request: async (operation) => {
//     const token = sessionStorage.getItem('token');
//     operation.setContext({
//       headers: {
//         'X-CSRF-TOKEN': token || '',
//       },
//     });
//   },
//   cache: new InMemoryCache({}),
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem('token', data.logIn.token);
        } else {
          sessionStorage.removeItem('token');
        }
      }
    },
  });

  const logInRef = useRef(logIn);

  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Tinyhouse" />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We weren't able to virify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          <Route
            exact
            path="/login"
            render={(props) => <Login {...props} setViewer={setViewer} />}
          />
          <Route exact path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
