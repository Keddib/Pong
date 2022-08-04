import { Injectable, UnauthorizedException, Response ,Request, Query } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import  axios from 'axios';
import { CreateUserDto } from 'src/dtos/user.dto';
import { ChatRoom } from 'src/entities/chatRoom.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor( private userService: UserService) {
    
    }

    async validateUser(username: string, password: string) : Promise<User> {
    
        const user = await this.userService.findByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);
        //  check if password matchs with bcrypt
        if (!user || !isMatch) {
          throw new UnauthorizedException();
        }
        return user;
    }


    async returnUser(code : string) : Promise<User | undefined> {
   
      const authToken = await axios({
      
        url: "https://api.intra.42.fr/oauth/token",
        method: "POST",
        data: {
          grant_type: "authorization_code",
          client_id: "701e6934d4fe51b1cb9441ec66efe6749314ca61646406288bc4f058d5a9ec05",
          client_secret: "1a6c63ae00df1990b58af86bf2a7c89249424ca8d86691fd0b3a28b027feda02",
          code,
          redirect_uri: "http://localhost/auth42",
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
      if ( user )
        return user;

      return null;
    }
    async getUser(uid : string) : Promise<User | undefined> {
      return this.userService.findOne(uid);
    }

    async validateIntraUser(username: string, password: string) : Promise<User> {

        const user = await this.userService.findByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);
        //  check if password matchs with bcrypt
        if (!user || !isMatch) {
          throw new UnauthorizedException();
        }
        return user;
    }

    async login(@Request() req) {

        //  create session
        return " Logged in ";
    }


 
    async logout(@Request() req, @Response() res) {
    
      req.session.destroy();
      res.clearCookie('connect.sid');
      req.logout(()=>{});
      res.send("Logged out");
    }
}
