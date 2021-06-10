import { BookingEntity, ListingEntity, UserEntity } from 'database/entity';
import { Repository } from 'typeorm';

export interface IViewer {
  id?: string;
  token?: string;
  avatar?: string;
  walletId?: string | null;
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
  id: string;
  listing: string;
  tenant: string;
  checkIn: string;
  checkOut: string;
}

export interface IListing {
  id: string;
  title: string;
  description: string;
  image: string;
  host: string;
  type: EListingType;
  address: string;
  country: string;
  admin: string;
  city: string;
  bookings: string[];
  bookingsIndex: IBookingsIndex;
  price: number;
  numOfGuests: number;
  authorized?: boolean;
}

export interface IUser {
  id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string | null;
  income: number;
  bookings: string[];
  listings: string[];
  authorized?: boolean;
}

export interface IDatabase {
  bookings: Repository<BookingEntity>;
  listings: Repository<ListingEntity>;
  users: Repository<UserEntity>;
}
