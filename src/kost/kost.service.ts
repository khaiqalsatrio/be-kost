import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual } from 'typeorm';
import { Kost } from '../entities/kost.entity';
import { CreateKostDto, UpdateKostDto } from './dto/kost.dto';

@Injectable()
export class KostService {
  constructor(
    @InjectRepository(Kost)
    private kostRepository: Repository<Kost>,
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
      relations: ['owner'],
    });

    if (!kost) {
      throw new NotFoundException(`Kost with ID ${id} not found`);
    }

    return kost;
  }

  async create(ownerId: string, createKostDto: CreateKostDto): Promise<Kost> {
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
    const kost = await this.findOne(id);

    if (kost.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have permission to delete this kost');
    }

    await this.kostRepository.remove(kost);
  }
}
