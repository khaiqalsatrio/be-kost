import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Kost } from '../entities/kost.entity';
import { Room } from '../entities/room.entity';
import { CreateKostDto, UpdateKostDto } from './dto/kost.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class KostService {
  constructor(
    @InjectRepository(Kost)
    private kostRepository: Repository<Kost>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async findAll(city?: string, maxPrice?: number): Promise<Kost[]> {
    const query: any = {};

    if (city) {
      query.city = city;
    }

    if (maxPrice) {
      query.price_per_month = LessThanOrEqual(maxPrice);
    }

    return this.kostRepository.find({
      where: query,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Kost> {
    const kost = await this.kostRepository.findOne({
      where: { id },
      relations: ['owner', 'rooms'],
    });

    if (!kost) {
      throw new NotFoundException(`Kost with ID ${id} not found`);
    }

    return kost;
  }
  async create(ownerId: string, createKostDto: CreateKostDto): Promise<Kost> {
    const existingKost = await this.kostRepository.findOne({ where: { ownerId } });
    if (existingKost) {
      throw new ConflictException('Owner can only have one kost');
    }

    const kost = this.kostRepository.create({
      ...createKostDto,
      ownerId,
    });
    return this.kostRepository.save(kost);
  }

  async findByOwner(ownerId: string): Promise<Kost[]> {
    return this.kostRepository.find({
      where: { ownerId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, ownerId: string, updateKostDto: UpdateKostDto): Promise<Kost> {
    const kost = await this.findOne(id);

    if (kost.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have permission to update this kost');
    }

    Object.assign(kost, updateKostDto);
    return this.kostRepository.save(kost);
  }

  async delete(id: string, ownerId: string): Promise<void> {
    throw new ForbiddenException('Kost data cannot be deleted, only rooms can be deleted');
  }

  // --- Room Management ---

  async createRoom(ownerId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const kost = await this.kostRepository.findOne({ where: { ownerId } });
    if (!kost) {
      throw new NotFoundException('You must create a Kost profile first');
    }

    const room = this.roomRepository.create({
      ...createRoomDto,
      kostId: kost.id,
    });
    return this.roomRepository.save(room);
  }

  async findRoomsByKost(kostId: string): Promise<Room[]> {
    return this.roomRepository.find({
      where: { kostId },
      order: { createdAt: 'DESC' },
    });
  }

  async updateRoom(roomId: string, ownerId: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['kost'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.kost.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have permission to update this room');
    }

    Object.assign(room, updateRoomDto);
    return this.roomRepository.save(room);
  }

  async deleteRoom(roomId: string, ownerId: string): Promise<void> {
    const room = await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['kost'],
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.kost.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have permission to delete this room');
    }

    await this.roomRepository.remove(room);
  }
}
