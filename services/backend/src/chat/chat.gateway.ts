import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { createChatMessageDto } from '../dtos/chatMessage.dto';
// import { UpdateChatDto } from '../dtos/';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { UseGuards } from '@nestjs/common';
import { isAuthGuard } from 'src/auth/guards/session.guard';
import { Request } from '@nestjs/common';



@WebSocketGateway({
  cors: {
    origin: '*',
  }
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

    console.log('Connected ', client.id);
    // Do Stuffs
  }


  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('msgToServer')
  async create(@MessageBody() createChatDto: createChatMessageDto) : Promise<ChatMessage> {

    this.server.emit('msgToClient', createChatDto);
    return  this.chatService.create(createChatDto);
  }


  @SubscribeMessage('join')
  async joinRoom(@Request() req) {

    console.log(req.user, "  we know user  ");
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
