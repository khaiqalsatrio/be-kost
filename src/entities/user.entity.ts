import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Kost } from './kost.entity';
import { Booking } from './booking.entity';

export enum Role {
  PENCARI = 'PENCARI',
  PEMILIK = 'PEMILIK',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PENCARI,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Kost, (kost) => kost.owner)
  kosts: Kost[];

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
