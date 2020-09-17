import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { LISTING } from 'lib/graphql/queries';

import { useQuery } from '@apollo/client';
import {
  Listing as ListingData,
  ListingVariables,
} from 'lib/graphql/queries/Listing/__generated__/Listing';
import { PageSkeleton, ErrorBanner } from 'lib/components';

import { Col, Layout, Row } from 'antd';
import { ListingDetails, ListingBookings } from 'sections/Listing/components';

interface MatchParams {
  id: string;
}

const { Content } = Layout;
const PAGE_LIMIT = 3;

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1);
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(
    LISTING,
    {
      variables: {
        id: match.params.id,
        bookingsPage,
        limit: PAGE_LIMIT,
      },
    }
  );

  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    );
  }

  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon!" />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data ? data.listing : null;
  const listingBookings = listing ? listing.bookings : null;

  const listingDetailsElement = listing ? (
    <ListingDetails listing={listing} />
  ) : null;

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      limit={PAGE_LIMIT}
      setBookingsPage={setBookingsPage}
    />
  ) : null;

  return (
    <Content className="listings">
      <Row gutter={24} justify="space-between"></Row>
      <Col xs={24} lg={14}>
        {listingDetailsElement}
        {listingBookingsElement}
      </Col>
    </Content>
  );
};
