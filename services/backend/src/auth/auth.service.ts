import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';


@Injectable()
export class AuthService {

    constructor( private userService: UserService) {
    
    }

    async validateUser(username: string, password: string) : Promise<User> {
    
        const user = await this.userService.findByUsername(username);

        //  check if password matchs with bcrypt
        if (!user || user.password != password) {
            throw new UnauthorizedException();
        }
        return user;
    }

    async validateIntraUser(username: string, password: string) : Promise<User> {

        const user = await this.userService.findByUsername(username);

        //  check if password matchs with bcrypt
        if (!user || user.password != password) {
            return user;
        }
        return user;
    }

    async login(@Request() req) {

        //  create session
        console.log(' session created for  ', req.user);
    }


    async loginWithIntra() {

    }

    async logout() {
    

        //  destory session
    }
}
