import { Module } from '@nestjs/common';
import { ChatRoomsService } from './chat-rooms.service';
import { ChatRoomsController } from './chat-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatRoom } from './entities/chat-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  controllers: [ChatRoomsController],
  providers: [ChatRoomsService]
})
export class ChatRoomsModule {}
