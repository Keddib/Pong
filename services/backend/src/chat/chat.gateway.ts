import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WsResponse, WsException, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { createChatMessageDto } from '../dtos/chatMessage.dto';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { createChatRoomDto } from 'src/dtos/chatRoom.dto';
import { UseGuards } from '@nestjs/common';
import { JwtWebSocketGuard } from 'src/auth/guards/jwtWS.guard';



@WebSocketGateway({
  cors: {
    origin: '*',
  }, 
})
@UseGuards(JwtWebSocketGuard)
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private readonly chatService: ChatService) {}


  afterInit(server: Server) {

  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
  
    console.log('usre Logged Out ', client.data.user);
    console.log('Disconnected : ', client.id);

  }

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {

    console.log('Logged in user ', client.data.user);
    console.log('Connected ', client.id);
  }



  @SubscribeMessage('createRoom')
  async createRoom( @ConnectedSocket() client: Socket, @MessageBody() roomName: string) : Promise<ChatRoom> {


    // console.log('user created Room', client.data.user);
    let room : ChatRoom = new createChatRoomDto();


    room.createdAt = new Date();  
    room.owner = client.data.user.uid;
    room.name = roomName;
    room.type = "public";
    this.server.emit("RoomCreated", roomName);
    return this.chatService.createRoom(room);
  }

  @WebSocketServer()
  private server: Server;

  // @UseGuards(isAuthGuard)
  @SubscribeMessage('msgToServer')
  async create(@ConnectedSocket() client: Socket, @MessageBody() message: {room: string, message: string}) : Promise<ChatMessage> {
    
    const chatMessage: ChatMessage = new createChatMessageDto;
    console.log(message);
    chatMessage.ownerId = client.data.user.uid;
    chatMessage.roomId = "sdff";
    chatMessage.text = message['message'];
    chatMessage.createdAt = new Date();
    this.server.to(message['room']).emit('msgToClient', {username: client.data.user.displayedName, message: message['message']});
    return  this.chatService.create(chatMessage);
  }


  // @SubscribeMessage('msgToServer')
  // async create(@MessageBody() createChatDto: createChatMessageDto) : Promise<ChatMessage> {

  //   this.server.emit('msgToClient', createChatDto);
  //   return  this.chatService.create(createChatDto);
  // }


  @SubscribeMessage('joinRoomToServer')
  joinRoom(client: Socket, room: string ) {

    client.join(room);
    // client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoomToServer')
  leaveRoom(client: Socket, room: string ) {

    client.leave(room);
    // console.log(req.user, "  we know user  ");
    // const roomFound = this.chatService.findRoomByName(room);
    // if (roomFound) {  
      // this.server.socketsJoin(room);
    // console.log(room);
    // this.server.emit('joinRoomToClient', room);
    // }
    return room;
    // return null;
  }


  @SubscribeMessage('messageToRoom')
  messageToRoom(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
  
    console.log(body, body['message']);
    const chatMessage: ChatMessage = new createChatMessageDto;
    console.log('Message To room from ', client.data.user);
    chatMessage.ownerId = client.data.user.uid;
    chatMessage.roomId = body[1];
    chatMessage.text = body[0];
    chatMessage.createdAt = new Date();

    this.server.to(body[0]).emit('msgToClientifRoom', body[1]);
    return  this.chatService.create(chatMessage);
  }

  @SubscribeMessage('typing')
  async typing() {
  
    return this.chatService.typing();
  }


  @SubscribeMessage('findAllRooms')
  async findAllRooms() {
    return await this.chatService.findAllRooms();
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
