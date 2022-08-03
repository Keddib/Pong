import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionSerializer } from '../auth/serializer/session.serializer';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Game } from 'src/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), SessionSerializer],
  controllers: [GameController ],
  providers: [GameService],
  exports: [GameService]
})
export class GameModule {}
