import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesController } from './chat-messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ChatMessage])],
  controllers: [ChatMessagesController],
  providers: [ChatMessagesService]
})
export class ChatMessagesModule {}
