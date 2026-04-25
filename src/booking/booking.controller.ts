import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../entities/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Booking } from '../entities/booking.entity';

@ApiTags('Booking')
@ApiBearerAuth()
@Controller('booking')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  // --- Pencari Endpoints ---

  @Post()
  @Roles(Role.CUSTOMER)
  @ApiOperation({ summary: 'Pencari: Membuat pesanan (booking) kost' })
  async createBooking(
    @GetUser('id') userId: string,
    @Body() createBookingDto: CreateBookingDto,
  ): Promise<Booking> {
    return this.bookingService.createBooking(userId, createBookingDto);
  }

  @Get()
  @Roles(Role.CUSTOMER)
  @ApiOperation({ summary: 'Pencari: Melihat riwayat pesanan sendiri' })
  async findMyBookings(@GetUser('id') userId: string): Promise<Booking[]> {
    return this.bookingService.findMyBookings(userId);
  }

  // --- Pemilik Endpoints ---

  @Get('incoming')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Melihat daftar pesanan yang masuk' })
  async findIncomingBookings(@GetUser('id') ownerId: string): Promise<Booking[]> {
    return this.bookingService.findIncomingBookings(ownerId);
  }

  @Patch(':id/status')
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Mengupdate status pesanan (APPROVE/REJECT)' })
  async updateStatus(
    @Param('id') id: string,
    @GetUser('id') ownerId: string,
    @Body() updateStatusDto: UpdateBookingStatusDto,
  ): Promise<Booking> {
    return this.bookingService.updateStatus(id, ownerId, updateStatusDto);
  }
}
