import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as bcrypt from 'bcrypt';


@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
