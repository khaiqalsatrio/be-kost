import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { KostModule } from './kost/kost.module';
import { BookingModule } from './booking/booking.module';
import { User } from './entities/user.entity';
import { Kost } from './entities/kost.entity';
import { Booking } from './entities/booking.entity';
import { Room } from './entities/room.entity';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Kost, Booking, Room, Conversation, Message],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true),
      }),
    }),
    AuthModule,
    KostModule,
    BookingModule,
    ChatModule,
  ],
})
export class AppModule {}
