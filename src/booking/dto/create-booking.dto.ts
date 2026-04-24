import { IsNotEmpty, IsUUID, IsDateString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'uuid-kost-id' })
  @IsUUID()
  @IsNotEmpty()
  kostId: string;

  @ApiProperty({ example: '2024-05-01' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: 3, description: 'Durasi sewa dalam bulan' })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  durationMonths: number;
}
