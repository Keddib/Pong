import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatRoomDto } from './dto/create-chat-room.dto';
import { UpdateChatRoomDto } from './dto/update-chat-room.dto';
import { ChatRoom } from './entities/chat-room.entity';

@Injectable()
export class ChatRoomsService {
  
  constructor(
    @InjectRepository(ChatRoom)
    private readonly chatRoom: Repository<ChatRoom>
    ) {}

  create(createChatRoomDto: CreateChatRoomDto) {

  
    this.chatRoom.create(createChatRoomDto);
    return this.chatRoom.save(createChatRoomDto);
    // return 'This action adds a new chatRoom';
  }

  findAll() {
    return this.chatRoom.find();

    // return `This action returns all chatRooms`;
  }

  findOne(id: number) {
    
    // return this.chatRoom.findBy( )
    return `This action returns a #${id} chatRoom`;
  }

  update(id: number, updateChatRoomDto: UpdateChatRoomDto) {
    return `This action updates a #${id} chatRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatRoom`;
  }
}
