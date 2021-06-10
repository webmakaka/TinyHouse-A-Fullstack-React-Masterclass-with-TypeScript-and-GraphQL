import { IBooking, IListing } from 'lib/types';

export interface IUserArgs {
  id: string;
}

export interface IUserBookingsArgs {
  limit: number;
  page: number;
}

export interface IUserBookingsData {
  total: number;
  result: IBooking[];
}

export interface IUserListingsArgs {
  limit: number;
  page: number;
}

export interface IUserListingsData {
  total: number;
  result: IListing[];
}
