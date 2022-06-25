import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatGateway } from './chat-rooms.gateway';
import { User } from 'src/users/entities/user.entity';
import { ChatRoom } from 'src/chat-rooms/entities/chat-room.entity';
import { ChatMessage } from 'src/chat-messages/entities/chat-message.entity';
import { UsersService } from 'src/users/users.service';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { ChatRoomsModule } from 'src/chat-rooms/chat-rooms.module';
import { UsersModule } from  'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User, ChatRoom]), UsersModule, ChatRoomsModule],
  exports: [ChatGateway],
  providers: [UsersService, ChatGateway]
})
export class ChatGatewayModule {}
