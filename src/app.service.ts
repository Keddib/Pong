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

    }).then(resp => {
      return resp;
    });

    const token =  authToken.data["access_token"];
    // console.log(token);

    const userData = await axios({
      url: "https://api.intra.42.fr/v2/me",
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token
      }
    }).then((res) => {
      return res.data;
    });


    console.log(userData.email);
    const user = new CreateUserDto;

    user.email = userData.email;
    user.displayedName = userData.login;
    user.avatar = userData.image_url;
    return "HELLO";
  }

  
  async authUser(user: CreateUserDto): Promise<User> {

    this.userRepository.create(user);
    console.log('created user');
    return this.userRepository.save(user);
  }
}
