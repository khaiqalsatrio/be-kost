import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { KostService } from './kost.service';
import { Kost } from '../entities/kost.entity';
import { Room } from '../entities/room.entity';
import { CreateKostDto, UpdateKostDto } from './dto/kost.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../entities/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Kost')
@Controller('kost')
export class KostController {
  constructor(private readonly kostService: KostService) {}

  // --- Public Endpoints ---

  @Get()
  @ApiOperation({ summary: 'Mencari semua kost dengan filter opsional' })
  @ApiQuery({ name: 'city', required: false, example: 'Jakarta' })
  @ApiQuery({ name: 'maxPrice', required: false, example: 2000000 })
  async findAll(
    @Query('city') city?: string,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<Kost[]> {
    return this.kostService.findAll(city, maxPrice);
  }

  // --- Pemilik Endpoints ---

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Membuat listing kost baru' })
  async create(
    @GetUser('id') ownerId: string,
    @Body() createKostDto: CreateKostDto,
  ): Promise<Kost> {
    return this.kostService.create(ownerId, createKostDto);
  }

  @Get('my')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Melihat daftar kost miliknya' })
  async findMyKosts(@GetUser('id') ownerId: string): Promise<Kost[]> {
    return this.kostService.findByOwner(ownerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail kost berdasarkan ID' })
  async findOne(@Param('id') id: string): Promise<Kost> {
    return this.kostService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Mengupdate informasi kost' })
  async update(
    @Param('id') id: string,
    @GetUser('id') ownerId: string,
    @Body() updateKostDto: UpdateKostDto,
  ): Promise<Kost> {
    return this.kostService.update(id, ownerId, updateKostDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Menghapus listing kost' })
  async delete(
    @Param('id') id: string,
    @GetUser('id') ownerId: string,
  ): Promise<void> {
    return this.kostService.delete(id, ownerId);
  }

  // --- Room Management Endpoints (Owner Only) ---

  @Post('rooms')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Menambahkan tipe kamar baru' })
  async createRoom(
    @GetUser('id') ownerId: string,
    @Body() createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    return this.kostService.createRoom(ownerId, createRoomDto);
  }

  @Patch('rooms/:roomId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Mengupdate data kamar' })
  async updateRoom(
    @Param('roomId') roomId: string,
    @GetUser('id') ownerId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    return this.kostService.updateRoom(roomId, ownerId, updateRoomDto);
  }

  @Delete('rooms/:roomId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.OWNER)
  @ApiOperation({ summary: 'Pemilik: Menghapus tipe kamar' })
  async deleteRoom(
    @Param('roomId') roomId: string,
    @GetUser('id') ownerId: string,
  ): Promise<void> {
    return this.kostService.deleteRoom(roomId, ownerId);
  }
}
