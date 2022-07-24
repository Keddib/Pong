import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsResponse } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { createChatMessageDto } from '../dtos/chatMessage.dto';
// import { UpdateChatDto } from '../dtos/';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { UseGuards } from '@nestjs/common';
import { isAuthGuard } from 'src/auth/guards/session.guard';
import { Request } from '@nestjs/common';
import { CreateDateColumn } from 'typeorm';
import  axios from 'axios';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { createChatRoomDto } from 'src/dtos/chatRoom.dto';


@WebSocketGateway({
  cors: {
    origin: '*',
  }, 
  // cookie: true
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatService: ChatService) {}


  afterInit(server: Server) {
    

    console.log('Connection Initialized For ', server);
    // Do Stuffs
  }

  handleDisconnect(client: Socket) {
  
    console.log('Disconnected : ', client.id);
    // Do stuffs
  }

  handleConnection(client: Socket, ...args: any[]) {

    console.log('Connected ', client);
    // Do Stuffs
  }



  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() roomName: string) : Promise<ChatRoom> {

    let room : ChatRoom = new createChatRoomDto();


    room.createdAt = new Date();  
    // room.owner = "sdffdsg";
    room.name = roomName;
    room.type = "public";
    this.server.emit("RoomCreated", roomName);
    return this.chatService.createRoom(room);
  }

  @WebSocketServer()
  private server: Server;

  // @UseGuards(isAuthGuard)
  @SubscribeMessage('msgToServer')
  async create( @MessageBody() text: string) : Promise<ChatMessage> {
    
    const chatMessage: ChatMessage = new createChatMessageDto;
    // console.log(req.user);
    chatMessage.ownerId = "dsfd";
    chatMessage.roomId = "sdff";
    chatMessage.text = text;
    chatMessage.createdAt = new Date();
    this.server.emit('msgToClient', text);
    return  this.chatService.create(chatMessage);
  }
  // @SubscribeMessage('msgToServer')
  // async create(@MessageBody() createChatDto: createChatMessageDto) : Promise<ChatMessage> {

  //   this.server.emit('msgToClient', createChatDto);
  //   return  this.chatService.create(createChatDto);
  // }


  @SubscribeMessage('joinRoom')
  async joinRoom(room : string ) {

    // console.log(req.user, "  we know user  ");
    const room = this.chatService.findOne(room);
    return this.chatService.joinRoom();
  }

  @SubscribeMessage('typing')
  async typing() {
  
    return this.chatService.typing();
  }


  @SubscribeMessage('findAllChat')
  async findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  async findOne(@MessageBody() id: string) {
    return this.chatService.findOne(id);
  }

  // @SubscribeMessage('updateChat')
  // update(@MessageBody() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(updateChatDto.id, updateChatDto);
  // }

  @SubscribeMessage('removeChat')
  async remove(@MessageBody() id: string) {
    return this.chatService.remove(id);
  }
}
