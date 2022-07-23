import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serializer/session.serializer';
import { fortyTwoStrategy } from './strategies/fortytwo.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule , PassportModule.register({ session:  true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, fortyTwoStrategy],
  exports: [AuthService]
})
export class AuthModule {}
