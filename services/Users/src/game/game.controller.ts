import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateGameDto, UpdateGameDto } from 'src/dtos/game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // @Post()
  // createLocal(@Body() localgame: JSON) {
  
  //   return this.gameService.createLocal(localgame["gamename"], localgame["password"]);
  // }

  @Post()
  createGame(@Body() dto: CreateGameDto) {
    return this.gameService.createGame(dto);
  }

  @Post(":id")
  updateGame(@Param('id') gameId : string,@Body() dto: UpdateGameDto) {
    return this.gameService.updateGame(gameId, dto);
  }

  @Get()
  // @UseGuards(isAuthGuard)
  findAll() {
    return this.gameService.getAllGames();
  }

  // // @UseGuards(isAuthGuard)
  // @Get(':id/')
  // async findOne(@Param('id') id: string) {
  //   return this.gameService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updategameDto: UpdategameDto) {
  //   return this.gameService.update(+id, updategameDto);
  // }

//   @Delete(':id')
//   // @UseGuards(isAuthGuard)
//   remove(@Param('id') id: string) {
//     return this.userService.remove(id);
//   }

}