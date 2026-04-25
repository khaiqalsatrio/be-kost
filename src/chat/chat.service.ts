import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async startConversation(customerId: string, ownerId: string) {
    // Cek apakah sudah ada percakapan antara mereka
    let conversation = await this.conversationRepository.findOne({
      where: [
        { customerId, ownerId },
        { customerId: ownerId, ownerId: customerId }, // Backup jika role dibalik (jarang terjadi tapi aman)
      ],
    });

    if (!conversation) {
      conversation = this.conversationRepository.create({
        customerId,
        ownerId,
      });
      await this.conversationRepository.save(conversation);
    }

    return conversation;
  }

  async getConversations(userId: string) {
    return this.conversationRepository.find({
      where: [
        { customerId: userId },
        { ownerId: userId },
      ],
      relations: ['customer', 'owner'],
      order: { updatedAt: 'DESC' },
    });
  }

  async getMessages(conversationId: string, userId: string) {
    const conversation = await this.conversationRepository.findOne({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Pastikan user adalah bagian dari percakapan ini
    if (conversation.customerId !== userId && conversation.ownerId !== userId) {
      throw new ForbiddenException('You are not part of this conversation');
    }

    return this.messageRepository.find({
      where: { conversationId },
      order: { createdAt: 'ASC' },
      relations: ['sender'],
    });
  }

  async saveMessage(conversationId: string, senderId: string, text: string) {
    // Simpan pesan
    const message = this.messageRepository.create({
      conversationId,
      senderId,
      text,
    });
    const savedMessage = await this.messageRepository.save(message);

    // Update last message di conversation
    await this.conversationRepository.update(conversationId, {
      lastMessage: text,
      updatedAt: new Date(),
    });

    return this.messageRepository.findOne({
      where: { id: savedMessage.id },
      relations: ['sender'],
    });
  }
}
