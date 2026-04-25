import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KostController } from './kost.controller';
import { KostService } from './kost.service';
import { Kost } from '../entities/kost.entity';
import { Room } from '../entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Kost, Room])],
  controllers: [KostController],
  providers: [KostService],
  exports: [KostService],
})
export class KostModule {}
