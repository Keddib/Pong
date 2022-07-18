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
      res.send();
    }
}
