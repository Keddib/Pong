import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from 'src/auth/serializer/session.serializer';

@Module({
  providers: [ChatGateway, ChatService],
  imports: [TypeOrmModule.forFeature([User, ChatMessage, ChatRoom]), PassportModule.register({ session:  true }), SessionSerializer]
})
export class ChatModule {

}
