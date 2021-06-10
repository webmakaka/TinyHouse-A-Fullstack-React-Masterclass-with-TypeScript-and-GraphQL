import { EListingType, IBookingsIndex } from 'lib/types';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('listings')
export class ListingEntity extends BaseEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('varchar', { length: 5000 })
  description: string;

  @Column('text')
  image: string;

  @Column('text')
  host: string;

  @Column({ type: 'enum', enum: EListingType })
  type: EListingType;

  @Column('text')
  address: string;

  @Column('text')
  country: string;

  @Column('text')
  admin: string;

  @Column('text')
  city: string;

  @Column('simple-array')
  bookings: string[];

  @Column('simple-json')
  bookingsIndex: IBookingsIndex;

  @Column('integer')
  price: number;

  @Column('integer')
  numOfGuests: number;
}
