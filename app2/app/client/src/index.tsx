import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider as ApolloHooksProvider,
  useMutation,
} from '@apollo/react-hooks';
import { Affix, Layout, Spin } from 'antd';
import { AppHeaderSkeleton, ErrorBanner } from 'lib/components';
import { LOG_IN } from 'lib/graphql/mutations';
import {
  LogIn as LogInData,
  LogInVariables,
} from 'lib/graphql/mutations/LogIn/__generated__/LogIn';
import { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Elements, StripeProvider } from 'react-stripe-elements';
import { IViewer } from './lib/types';
import {
  AppHeader,
  Home,
  Host,
  Listing,
  Listings,
  Login,
  NotFound,
  Stripe,
  User,
} from './sections';
import './styles/index.css';

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

const initialViewer: IViewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<IViewer>(initialViewer);
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
    <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
  ) : null;

  return (
    <StripeProvider
      apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string}
    >
      <Router>
        <Layout id="app">
          {logInErrorBannerElement}
          <Affix offsetTop={0} className="app__affix-header">
            <AppHeader viewer={viewer} setViewer={setViewer} />
          </Affix>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/host"
              render={(props) => <Host {...props} viewer={viewer} />}
            />
            <Route
              exact
              path="/listing/:id"
              render={(props) => (
                <Elements>
                  <Listing {...props} viewer={viewer} />
                </Elements>
              )}
            />
            <Route exact path="/listings/:location?" component={Listings} />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} setViewer={setViewer} />}
            />
            <Route
              exact
              path="/stripe"
              render={(props) => (
                <Stripe {...props} viewer={viewer} setViewer={setViewer} />
              )}
            />

            <Route
              exact
              path="/user/:id"
              render={(props) => (
                <User {...props} viewer={viewer} setViewer={setViewer} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </StripeProvider>
  );
};

render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
