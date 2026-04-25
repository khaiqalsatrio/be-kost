import { IsNotEmpty, IsString, IsNumber, Min, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({ example: 'Kamar Mandi Dalam' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Kamar luas dengan jendela' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1200000 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price_per_month: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  total_rooms: number;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  available_rooms: number;

  @ApiPropertyOptional({ example: ['Kasur', 'Lemari', 'KM Dalam'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];
}

export class UpdateRoomDto {
  @ApiPropertyOptional({ example: 'Kamar Mandi Dalam Updated' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  price_per_month?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(1)
  total_rooms?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  available_rooms?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];
}
