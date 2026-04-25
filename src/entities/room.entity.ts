import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Kost } from './kost.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Misal: "Kamar Tipe A", "Kamar Mandi Dalam"

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  price_per_month: number;

  @Column({ default: 1 })
  total_rooms: number; // Total kapasitas kamar tipe ini

  @Column({ default: 0 })
  available_rooms: number; // Sisa kamar yang tersedia

  @Column('simple-array', { nullable: true })
  facilities: string[];

  @Column()
  kostId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Kost, (kost) => kost.rooms)
  kost: Kost;
}
