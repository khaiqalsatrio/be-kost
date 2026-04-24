import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity('kosts')
export class Kost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  city: string;

  @Column()
  price_per_month: number;

  @Column('simple-array')
  facilities: string[];

  @Column('simple-array')
  images: string[];

  @Column()
  ownerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.kosts)
  owner: User;

  @OneToMany(() => Booking, (booking) => booking.kost)
  bookings: Booking[];
}
