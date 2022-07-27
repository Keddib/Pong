import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ChatMessage } from 'src/entities/chatMessage.entity';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [ChatGateway, ChatService],
  imports: [TypeOrmModule.forFeature([User, ChatMessage, ChatRoom]), AuthModule]
})
export class ChatModule {


}
