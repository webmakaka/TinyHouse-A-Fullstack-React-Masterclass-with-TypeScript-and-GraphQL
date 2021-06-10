import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class BookingEntity extends BaseEntity {
  @PrimaryColumn('text')
  id: string;

  @Column('text')
  listing: string;

  @Column('text')
  tenant: string;

  @Column('text')
  checkIn: string;

  @Column('text')
  checkOut: string;
}
