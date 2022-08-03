import { Module } from '@nestjs/common';
import { AppGateway } from './game.gateway'; //ws
import { AuthService } from './auth.service';
import { GameService } from './game.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AppGateway,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'GAME_SERVICE',
      useClass: GameService,
    },
  ],
})
export class GameModule {}
