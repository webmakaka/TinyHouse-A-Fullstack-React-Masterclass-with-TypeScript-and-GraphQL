import { ListingEntity } from 'database/entity';
import { Repository } from 'typeorm';

export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfGuests: number;
  numOfBeds: number;
  numOfBaths: number;
  rating: number;
}

export interface Database {
  listings: Repository<ListingEntity>;
}
