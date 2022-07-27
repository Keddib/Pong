import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ChatMessage } from './entities/chatMessage.entity';
import { ChatRoom } from './entities/chatRoom.entity';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { fortyTwoStrat } from './auth/strategies/fortytwo.strategy';
import { JwtStart } from './auth/strategies/jwt.strategy';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    }),
    UserModule,
    ChatModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [fortyTwoStrat, JwtStart],
})
export class AppModule {}
