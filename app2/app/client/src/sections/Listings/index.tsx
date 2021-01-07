import { useQuery } from '@apollo/client';
import { Layout, List, Typography } from 'antd';
import { ListingCard } from 'lib/components';
import { ListingsFilter } from 'lib/graphql/globalTypes';
import { LISTINGS } from 'lib/graphql/queries';
import {
  Listings as ListingsData,
  ListingsVariables,
} from 'lib/graphql/queries/Listings/__generated__/Listings';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface MatchParams {
  location: string;
}

const { Content } = Layout;
const { Paragraph, Text, Title } = Typography;

const PAGE_LIMIT = 8;

export const Listings = ({ match }: RouteComponentProps<MatchParams>) => {
  const { data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables: {
      location: match.params.location,
      filter: ListingsFilter.PRICE_LOW_TO_HIGH,
      limit: PAGE_LIMIT,
      page: 1,
    },
  });

  const listings = data ? data.listings : null;
  const listingsRegion = listings ? listings.region : null;

  const listingsSectionElement =
    listings && listings.result.length ? (
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={listings.result}
        renderItem={(listing) => (
          <List.Item>
            <ListingCard listing={listing} />
          </List.Item>
        )}
      />
    ) : (
      <div>
        <Paragraph>
          It appears that no listings have yet been created for{' '}
          <Text mark>"{listingsRegion}"</Text>{' '}
        </Paragraph>
        <Paragraph>
          Be the first person to create a{' '}
          <Link to="/host">listing in this area </Link>!
        </Paragraph>
      </div>
    );

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return (
    <Content className="Listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  );
};
