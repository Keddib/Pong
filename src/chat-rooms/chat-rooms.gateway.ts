import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { ChatMessage } from "src/chat-messages/entities/chat-message.entity";
import { WebSocketGateway } from "@nestjs/websockets";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ChatRoom } from "./entities/chat-room.entity";

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() 
  private server;
  usersCount: number = 0;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(ChatRoom)
  private chatRoomRepository: Repository<ChatRoom>;

  async handleConnection() {
  
    this.usersCount++;

    this.server.emit('users', this.usersCount);

  }

  async handleDisconnect( ) {
   
    this.usersCount--;
    this.server.emit('users', this.usersCount);

  }

  @SubscribeMessage('chat')
 async onChat(client, message) {
  
  client.broadcast.emit('chat', message);
 }
}