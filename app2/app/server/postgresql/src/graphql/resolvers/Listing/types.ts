import { EListingType, IBooking, IListing } from 'lib/types';

export enum EListingsFilter {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
}

export interface IListingArgs {
  id: string;
}

export interface IListingBookingsArgs {
  limit: number;
  page: number;
}

export interface IListingBookingsData {
  total: number;
  result: IBooking[];
}

export interface IListingsArgs {
  location: string | null;
  filter: EListingsFilter;
  limit: number;
  page: number;
}

export interface IListingsData {
  region: string | null;
  total: number;
  result: IListing[];
}

export interface IListingsQuery {
  country?: string;
  admin?: string;
  city?: string;
}

export interface IHostListingInput {
  title: string;
  description: string;
  image: string;
  type: EListingType;
  address: string;
  price: number;
  numOfGuests: number;
}

export interface IHostListingArgs {
  input: IHostListingInput;
}

export interface IOrder {
  price: 1 | 'ASC' | 'DESC' | -1 | undefined;
}
