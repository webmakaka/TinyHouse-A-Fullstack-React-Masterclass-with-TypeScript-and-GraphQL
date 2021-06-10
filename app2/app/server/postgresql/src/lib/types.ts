import { Collection, ObjectId } from 'mongodb';

export interface IViewer {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export enum EListingType {
  Apartment = 'APARTMENT',
  House = 'HOUSE',
}

export interface IBookingIndexMonth {
  [key: string]: boolean;
}

export interface IBookingsIndexYear {
  [key: string]: IBookingIndexMonth;
}

export interface IBookingsIndex {
  [key: string]: IBookingsIndexYear;
}

export interface IBooking {
  _id: ObjectId;
  listing: ObjectId;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface IListing {
  _id: ObjectId;
  title: string;
  description: string;
  image: string;
  host: string;
  type: EListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: ObjectId[];
  bookingsIndex: IBookingsIndex;
  price: number;
  numOfGuests: number;
  authorized?: boolean;
}

export interface IUser {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;
  income: number;
  bookings: ObjectId[];
  listings: ObjectId[];
  authorized?: boolean;
}

export interface IDatabase {
  bookings: Collection<IBooking>;
  listings: Collection<IListing>;
  users: Collection<IUser>;
}
