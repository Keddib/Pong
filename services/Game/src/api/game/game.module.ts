import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway'; //ws
import { AuthService } from './app.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AppGateway,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
  ],
})
export class GameModule {}
