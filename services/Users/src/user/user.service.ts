import { Injectable, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
    ) {}

    
    async createLocal(username: string, password: string) : Promise<User> {
      
      // 'This action adds a new user';
      
      let newUser = new CreateUserDto();
      
      newUser.login = username;
      newUser.displayedName = username;

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      newUser.password = hash;
      password = undefined;
      // createUserDto.password = bycrypt
      // console.log(newUser, username, password);
      // this.userRepo.create(newUser);
      return await this.userRepo.save(newUser);
    }

    async create(createUserDto: CreateUserDto) : Promise<User> {
      
      // 'This action adds a new user';
  
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      createUserDto.password = hash;
      this.userRepo.create(createUserDto);
      return await this.userRepo.save(createUserDto);
    }
    
    async findAll() : Promise<User[]> {
    // 'This action returns all user`;
  
    return await this.userRepo.find({relations:["friendList","friendRequests"]});
  }

  async findOne(id: string) : Promise<User>{
    // `This action returns a #${id} user`; 
  
    const user = await this.userRepo.findOne({ where: { uid: id }, relations:["friendList","friendRequests"]});
    if (user)
      return user;
    return null;
  }

  async findByUsername(username: string) : Promise<User>{
    const user = await this.userRepo.findOne({ where: { login: username }});
    if (user)
      return user;
    return null;
  }

  async update(id: string, updateUserDto: User) {
      let user = await this.userRepo.findOne({where:{uid:id}});
      user = {...user, ...updateUserDto}
      return this.userRepo.save(user);
  }

  async setStatus(id: string, userStatus: "online" | "offline" | "playing" | "spectating") {
    let user = await this.userRepo.findOne({where:{uid:id}});
    user = {...user, status: userStatus}
    return this.userRepo.save(user);
  } 
  async incrementWins(id: string) {
    let user = await this.userRepo.findOne({where:{uid:id}});
    user = {...user, wins: user.wins + 1}
    console.log("incrementing wins")
    return this.userRepo.save(user);
  } 
  async incrementLosses(id: string) {
    let user = await this.userRepo.findOne({where:{uid:id}});
    user = {...user, losses: user.losses + 1}
    console.log("incrementing losses")

    return this.userRepo.save(user);
  }
  async incrementXp(id: string, amount: number) {
    let user = await this.userRepo.findOne({where:{uid:id}});
    user = {...user, xp:user.xp + amount}
    console.log("incrementing xp")

    return this.userRepo.save(user);
  }
  async incrementLevel(id: string) {
    let user = await this.userRepo.findOne({where:{uid:id}});
    user = {...user, level: user.level}
    console.log("incrementing level")

    return this.userRepo.save(user);

  }

  async remove(id: string) : Promise<User> {
    // `This action removes a #${id} user`;
  
    const user = await this.userRepo.findOne({ where: { uid: id }});

    if (user)
    {
      return await this.userRepo.remove(user);
    }
    
    return null;
  }
}
