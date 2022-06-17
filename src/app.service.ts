import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';
import { UsersService } from './users/users.service';
import axios from "axios";
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  
  @InjectRepository(User)
  private userRepository : Repository<User>

  constructor(private readonly apiConf: ConfigService,  private readonly users : UsersService) {

  }

  async getHello(@Query() code): Promise<any> {

    try {
      console.log(code);
      const authToken = await axios({
      
        url: "https://api.intra.42.fr/oauth/token",
        method: "POST",
        data: {
          grant_type: "authorization_code",
          client_id: this.apiConf.get<string>('clientID'),
          client_secret: this.apiConf.get<string>('clientSecret'),
          code: code['code'],
          redirect_uri: this.apiConf.get<string>('callbackURL'),
        }

      });
    
      console.log('extracting authToken');
      const token =  authToken.data["access_token"];
      // console.log(token);
      console.log(token);
      const userData = await axios({
        url: "https://api.intra.42.fr/v2/me",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      // const test = await this.userRepository.findOneBy({ login: userData.data.login });
      // console.log(test);
      // To check later for all user details and update
      if (await this.userRepository.findOneBy({ login: userData.data.login })) {
        return "User already in Database";
      }

      console.log(userData.data.email);
      const user = new CreateUserDto;

      user.email = userData.data.email;
      user.displayedName = userData.data.login;
      user.avatar = userData.data.image_url;
      user.login = userData.data.login;
      user.password = 'defaultpassword';
      this.userRepository.create(user);
      this.userRepository.save(user);
    }
    catch (error) {

      return error;
    }
    return "Added New User To database check /users";
  }

}
