import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { SessionSerializer } from '../auth/serializer/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { FriendController } from './friendRequests/friend.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SessionSerializer],
  controllers: [UserController, FriendController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
