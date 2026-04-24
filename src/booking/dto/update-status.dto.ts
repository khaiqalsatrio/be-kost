import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus } from '../../entities/booking.entity';

export class UpdateBookingStatusDto {
  @ApiProperty({ enum: [BookingStatus.APPROVED, BookingStatus.REJECTED], example: BookingStatus.APPROVED })
  @IsEnum([BookingStatus.APPROVED, BookingStatus.REJECTED])
  @IsNotEmpty()
  status: BookingStatus;
}
