import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking, BookingStatus } from '../entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-status.dto';
import { KostService } from '../kost/kost.service';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private kostService: KostService,
  ) {}

  async createBooking(userId: string, createBookingDto: CreateBookingDto): Promise<Booking> {
    const { kostId, startDate, durationMonths } = createBookingDto;

    const kost = await this.kostService.findOne(kostId);
    const totalPrice = kost.price_per_month * durationMonths;

    const booking = this.bookingRepository.create({
      userId,
      kostId,
      startDate: new Date(startDate),
      durationMonths,
      totalPrice,
      status: BookingStatus.PENDING,
    });

    return this.bookingRepository.save(booking);
  }

  async findMyBookings(userId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { userId },
      relations: ['kost'],
      order: { createdAt: 'DESC' },
    });
  }

  async findIncomingBookings(ownerId: string): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: { kost: { ownerId } },
      relations: ['kost', 'user'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(id: string, ownerId: string, updateStatusDto: UpdateBookingStatusDto): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: ['kost'],
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    if (booking.kost.ownerId !== ownerId) {
      throw new ForbiddenException('You do not have permission to update this booking');
    }

    booking.status = updateStatusDto.status;
    return this.bookingRepository.save(booking);
  }
}
