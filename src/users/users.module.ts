import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChatRoomsService } from 'src/chat-rooms/chat-rooms.service';
import { ChatRoom } from 'src/chat-rooms/entities/chat-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChatRoom])],
  controllers: [UsersController],
  providers: [UsersService, ChatRoomsService],
  exports: [UsersService]
})
export class UsersModule {}
