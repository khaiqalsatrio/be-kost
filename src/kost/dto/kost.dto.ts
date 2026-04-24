import { IsNotEmpty, IsString, IsNumber, Min, IsArray, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateKostDto {
  @ApiProperty({ example: 'Kost Ceria' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Kost nyaman dan strategis dekat kampus' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Jl. Merdeka No. 10' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Jakarta' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 1500000 })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price_per_month: number;

  @ApiProperty({ example: ['AC', 'WiFi', 'Laundry'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  facilities: string[];

  @ApiProperty({ example: ['https://image.com/1.jpg'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  images: string[];
}

export class UpdateKostDto {
  @ApiPropertyOptional({ example: 'Kost Ceria Updated' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Min(0)
  price_per_month?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  facilities?: string[];

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
