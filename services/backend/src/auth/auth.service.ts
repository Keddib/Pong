import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/user.dto';
import axios from 'axios';
import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private readonly configService: ConfigService,
        ) {

    }

    async verify(authToken: string) {
    
        return await  this.jwtService.verify(authToken, {secret: this.configService.get<string>('JWT_SECRET')});
    }

    async ValidateUser(username: string, password: string) : Promise<any>  {
    
        const user = await this.userService.findByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);
        if ( user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async ValidatePayload(payload: any) : Promise< User| null>{
    
        const user : User = await this.userService.findByUsername(payload['username']);
        if (user && user.uid === payload['sub'])
            return user;
        return null;
    }

    async returnUser(code : string) : Promise<string | undefined> {
   

        console.log(this.configService.get<string>('clientID'),
            this.configService.get<string>('clientSecret'),
            this.configService.get<string>('callbackURL')
        );

        const authToken = await axios({
        
          url: "https://api.intra.42.fr/oauth/token",
          method: "POST",
          data: {
            grant_type: "authorization_code",
            client_id: this.configService.get<string>('clientID'),
            client_secret: this.configService.get<string>('clientSecret'),
            code,
            redirect_uri: this.configService.get<string>('callbackURL'),
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
  
        const user = await this.userService.findByUsername(userData.data.login);
        if ( user ) {
            return this.login(user);
        }
        return null;
      }

    async login(user: any) : Promise<any> {

        const payload = { username: user.login, sub: user.uid };
        console.log(payload);
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async signUp(createUserDto: CreateUserDto) {
    
        return this.userService.create(createUserDto);
    }
    async signUpLocal(username: string, password: string) {
    
        return this.userService.createLocal(username, password);
    }
}
