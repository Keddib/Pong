import { Module } from '@nestjs/common';
import { AppController, fortyTwoAuth } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChatRoomsModule } from './chat-rooms/chat-rooms.module';
import { GamesModule } from './games/games.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "src/users/entities/user.entity";
import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { Game } from "src/games/entities/game.entity";
import { ConfigModule } from '@nestjs/config';

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
    entities: [User, Game, ChatRoom],
    synchronize: true, // to remove when finished 
  }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ChatRoomsModule,
    GamesModule
  ],
  controllers: [fortyTwoAuth, AppController],
  providers: [AppService],
})
export class AppModule {
}