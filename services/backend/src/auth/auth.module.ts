import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrat } from './strategies/local.strategy';
import { JwtStart } from './strategies/jwt.strategy';
import { fortyTwoStrat } from './strategies/fortytwo.strategy';


@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXP_H')
        }
      }),
      inject: [ConfigService],
    }),
    UserModule
  ],
  controllers:[fortyTwoStrat],
  providers: [AuthService, LocalStrat, JwtStart],
  exports: [AuthService]
})
export class AuthModule {}
