import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

@Entity('test_listings')
export class ListingEntity extends BaseEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('varchar', { length: 100 })
  title: string;

  @Column('text')
  image: string;

  @Column('text')
  address: string;

  @Column('integer')
  price: number;

  @Column('integer')
  numOfGuests: number;

  @Column('integer')
  numOfBeds: number;

  @Column('integer')
  numOfBaths: number;

  @Column('decimal')
  rating: number;
}
