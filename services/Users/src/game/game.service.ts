import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { Game } from 'src/entities/game.entity';
import { CreateGameDto, UpdateGameDto } from 'src/dtos/game.dto';
import { UserService } from 'src/user/user.service';



@Injectable()
export class GameService {


  constructor(
    @InjectRepository(Game)
    private gameRepo: Repository<Game>,
    private userService: UserService
    ) {}


    async createGame(dto: CreateGameDto): Promise<Game>{

      // await this.userService.incrementLevel(winner);
      await this.userService.setStatus( dto.playerOne, "playing");
      await this.userService.setStatus( dto.playerTwo, "playing");
      return this.gameRepo.save(dto);
      // set users as ingame here
    }
    async updateGame(gameId: string,dto: UpdateGameDto): Promise<Game>{
      let game = await this.gameRepo.findOne({where:{gameId}});
      if (game.status === 1) return game;
      game = {...game, ...dto}

      if (dto.status === 1){ //game is done
      // here update users 
        let winner = game.winner ? game.winner : (game.scoreOne > game.scoreTwo ? game.playerOne : game.playerTwo)
        let loser = (game.playerOne === winner ? game.playerTwo : game.playerOne)

        await this.userService.incrementWins(winner);
        await this.userService.incrementXp(winner, 20);
        // await this.userService.incrementLevel(winner);
        await this.userService.incrementLosses(loser);
        await this.userService.setStatus( game.playerOne, "online");
        await this.userService.setStatus( game.playerTwo, "online");

      }
      return this.gameRepo.save(game);
    }

    async getAllGames(): Promise<Game[]>{
      return this.gameRepo.find();
    }
    async getUserGameHistory(userId: string,): Promise<Game[]>{
      return this.gameRepo.find({where:[{playerOne: userId , status:1},{playerTwo: userId , status:1}]});
    }
    async getUserCurrentGame(userId: string,): Promise<Game[]>{
      return this.gameRepo.find({where:[{playerOne: userId , status:0},{playerTwo: userId , status:0}]});
    }




  //   async create(createUserDto: CreateUserDto) : Promise<User> {
      
  //     this.gameRepo.create(createUserDto);
  //     return await this.gameRepo.save(createUserDto);
  //   }
    
  //   async findAll() : Promise<User[]> {
  //   // 'This action returns all user`;
  
  //   return await this.gameRepo.find({relations:["friendList","friendRequests"]});
  // }

  // async findOne(id: string) : Promise<User>{
  //   // `This action returns a #${id} user`; 
  
  //   const user = await this.gameRepo.findOne({ where: { uid: id }, relations:["friendList","friendRequests"]});
  //   if (user)
  //     return user;
  //   return null;
  // }

  // async findByUsername(username: string) : Promise<Game>{
  //   // `This action returns a #${id} user`; 
  
  //   const user = await this.gameRepo.findOne({ where: { login: username }});

  //   if (user)
  //     return user;
  //   return null;
  // }



  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // async remove(id: string) : Promise<User> {
  //   // `This action removes a #${id} user`;
  
  //   const user = await this.userRepo.findOne({ where: { uid: id }});

  //   if (user)
  //   {
  //     return await this.userRepo.remove(user);
  //   }
    
  //   return null;
  // }
}
