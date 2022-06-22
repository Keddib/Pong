import { Module } from '@nestjs/common';
import { AppController, fortyTwoAuth } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/users/entities/user.entity";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { Game } from "src/games/entities/game.entity";
import { ConfigModule } from '@nestjs/config';
import { ChatMessagesModule } from './chat-messages/chat-messages.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { ChatMessage } from './chat-messages/entities/chat-message.entity';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [TypeOrmModule.forRoot( {
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "root",
    password: "root",
    database: "test_db",
    logging: true,
    subscribers: [],
    migrations: [],
    entities: [User, Game, ChatRoom, ChatMessage],
    synchronize: true, // to remove when finished 
  }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ChatRoomsModule,
    GamesModule,
    ChatMessagesModule,
    AuthModule
  ],
  controllers: [fortyTwoAuth, AppController],
  providers: [AppService],
})
export class AppModule {
}
