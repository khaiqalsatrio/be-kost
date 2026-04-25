import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Chat')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('start')
  @ApiOperation({ summary: 'Memulai atau mendapatkan ID percakapan' })
  async startConversation(
    @GetUser('id') userId: string,
    @Body('ownerId') ownerId: string,
  ) {
    return this.chatService.startConversation(userId, ownerId);
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua percakapan saya' })
  async getMyConversations(@GetUser('id') userId: string) {
    return this.chatService.getConversations(userId);
  }

  @Get(':conversationId')
  @ApiOperation({ summary: 'Mendapatkan riwayat pesan dalam satu percakapan' })
  async getMessages(
    @Param('conversationId') conversationId: string,
    @GetUser('id') userId: string,
  ) {
    return this.chatService.getMessages(conversationId, userId);
  }
}
