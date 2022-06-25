import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketServer } from "@nestjs/websockets";
import { ChatMessage } from "src/chat-messages/entities/chat-message.entity";
import { WebSocketGateway } from "@nestjs/websockets";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { ChatRoom } from "../chat-rooms/entities/chat-room.entity";
import { UsersService } from "src/users/users.service";

@WebSocketGateway(8080, {
  cors: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() 
  private server;

  usersCount: number = 0;

  constructor(private readonly userService: UsersService) {
  }
  
  @SubscribeMessage('message')
  // async handleMessage(client, data) {
  async handleMessage(@MessageBody() message: string) {

    console.log('handling message');
    this.server.emit('message', message);
  }

  async handleConnection() {
  
    this.usersCount++;

    console.log('handle connection');
    this.server.emit('users', this.usersCount);

  }

  async handleDisconnect( ) {
   
    this.usersCount--;
    console.log('handle disconnect');
    this.server.emit('users', this.usersCount);

  }
}