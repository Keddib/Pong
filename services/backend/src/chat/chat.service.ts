import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { Repository } from 'typeorm';
import { createChatMessageDto } from '../dtos/chatMessage.dto';
// import { UpdateChatDto } from '../dtos/';


@Injectable()
export class ChatService {
  
  constructor(

    @InjectRepository(ChatMessage)
    private chatMessageRepo : Repository<ChatMessage>,
    @InjectRepository(ChatRoom)
    private chatRoomRepo: Repository<ChatRoom> )   {

  }


  async create(createChatDto: createChatMessageDto) : Promise<ChatMessage> {
   
    this.chatMessageRepo.create(createChatDto);
    console.log(createChatDto);
    return await this.chatMessageRepo.save(createChatDto);
    // return 'This action adds a new chat';
  }

  async joinRoom() {

  }

  async typing() {
    
  }

  async findAll() : Promise<ChatMessage[]> {
  
    return await this.chatMessageRepo.find();
    // return `This action returns all chat`;
  
  }

  async findOne(id: string) : Promise<ChatMessage> {

    return await this.chatMessageRepo.findOne({where: {messageId: id}});
    // return `This action returns a #${id} chat`;
  }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  async remove(id: string) : Promise<ChatMessage> {
  
    const chatMessage : ChatMessage  =  await this.findOne(id);
    return this.chatMessageRepo.remove(chatMessage);
  }
}
