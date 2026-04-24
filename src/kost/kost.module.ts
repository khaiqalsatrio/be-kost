import { Module } from '@nestjs/common';
import { KostController } from './kost.controller';
import { KostService } from './kost.service';

@Module({
  controllers: [KostController],
  providers: [KostService]
})
export class KostModule {}
