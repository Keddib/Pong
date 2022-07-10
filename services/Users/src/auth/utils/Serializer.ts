import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "../auth.service";

@Injectable()
export class SessionSerializer extends PassportSerializer{

    constructor(@Inject('AUTH_SERVICE') private readonly authService : AuthService){
        super();
    }
    
    serializeUser(user: any, done: (err: Error, user: User)=>void) {
        done(null, user);
    }

    async deserializeUser(user: User, done: (err: Error, user: User) => void) {
        const userDb = await this.authService.findUser(user.ftId);
        //console.log(userDb)
        return userDb ? done(null, userDb) : done(null, null);
    }
}