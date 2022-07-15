import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatMessage } from './entities/chatMessage.entity';
import { ChatRoom } from './entities/chatRoom.entity';
import { User } from './entities/user.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "db_admin",
    password: "db_pass",
    database: "endpoint",
    logging: true,
    subscribers: [],
    migrations: [],
    entities: [User, ChatMessage, ChatRoom],
    synchronize: true, // to remove when finished 
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
