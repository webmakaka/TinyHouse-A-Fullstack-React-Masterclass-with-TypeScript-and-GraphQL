import { useQuery } from '@apollo/client';
import { Col, Layout, Row } from 'antd';
import { ErrorBanner, PageSkeleton } from 'lib/components';
import { USER } from 'lib/graphql/queries';
import {
  User as UserData,
  UserVariables,
} from 'lib/graphql/queries/User/__generated__/User';
import { Viewer } from 'lib/types';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { UserBookings, UserListings, UserProfile } from './components';

interface IProps {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

interface MatchParams {
  id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 4;

export const User = ({
  viewer,
  setViewer,
  match,
}: IProps & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);

  const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(
    USER,
    {
      variables: {
        id: match.params.id,
        bookingsPage,
        listingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );

  const handleUserRefetch = async () => {
    await refetch();
  };

  const stripeError = new URL(window.location.href).searchParams.get(
    'stripe_error'
  );
  const stripeErrorBanner = stripeError ? (
    <ErrorBanner description="We had an issue connection with Stripe. Please try again soon." />
  ) : null;

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist of we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const viewerIsUser = viewer.id === match.params.id;

  const userListings = user ? user.listings : null;
  const userBookings = user ? user.bookings : null;

  const userProfileElement = user ? (
    <UserProfile
      user={user}
      viewer={viewer}
      viewerIsUser={viewerIsUser}
      setViewer={setViewer}
      handleUserRefetch={handleUserRefetch}
    />
  ) : null;

  const userListingsElement = userListings ? (
    <UserListings
      userListings={userListings}
      listingsPage={listingsPage}
      limit={PAGE_LIMIT}
      setListingsPage={setListingsPage}
    />
  ) : null;

  const userBookingsElement = userBookings ? (
    <UserBookings
      userBookings={userBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  return (
    <Content className="user">
      s user may Row {stripeErrorBanner}
      <Row gutter={12} justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement} {userBookingsElement}
        </Col>
      </Row>
    </Content>
  );
};
