import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateChatRoomDto } from 'src/chat-rooms/dto/create-chat-room.dto';
import { ChatRoom } from 'src/chat-rooms/entities/chat-room.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(ChatRoom)
    private readonly chatRepository: Repository<ChatRoom>
  ) {}

  async createChatRoom(createChatRoom: CreateChatRoomDto) {
  
    const chatRoom = new CreateChatRoomDto;
  
      chatRoom.owner
  }

  async create(createUserDto: CreateUserDto) : Promise<User> {
  

    this.userRepository.create(createUserDto);
    return this.userRepository.save(createUserDto);
    // return 'This action adds a new user';
  }

  async findAll():  Promise<User[]> {

      // return this.userRepository.findOne({ where: [3] });
    return await this.userRepository.find();
    // return `This action returns all users`;
  }

  findOne(id: number) : Promise<User[]> {

    return this.userRepository.findBy({ uid: id });
    // return `This action returns a #${id} user`;
  }

  update(avatar: string, updateUserDto: UpdateUserDto) {

    // return this.userRepository.update({ avatar: avatar });
    return `This action updates a #${avatar} user`;
  }

  remove(id: number) {
  
    // return this.userRepository.remove(this.findOne(id));
    return `This action removes a #${id} user`;
  }
}
