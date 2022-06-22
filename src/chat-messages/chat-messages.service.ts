import { Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { ChatMessage } from './entities/chat-message.entity';
@Injectable()
export class ChatMessagesService {


  constructor(
    @InjectRepository(ChatMessage)
    private chatMessageRepository: Repository<ChatMessage>
  ) {}


  async create(createChatMessageDto: CreateChatMessageDto) : Promise<ChatMessage> {

    createChatMessageDto.createdAt = new Date();
    // createChatMessageDto.
    this.chatMessageRepository.create(createChatMessageDto);
    return await this.chatMessageRepository.save(createChatMessageDto);
    // return 'This action adds a new chatMessage';
  }

  async findAll() : Promise<ChatMessage[]> {

    return await this.chatMessageRepository.find();
    // return `This action returns all chatMessages`;
  }

  async findOne(id: number) {

    // return this.chatMessageRepository.find( cha: id)
    return `This action returns a #${id} chatMessage`;
  }

  update(id: number, updateChatMessageDto: UpdateChatMessageDto) {
    return `This action updates a #${id} chatMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatMessage`;
  }
}
