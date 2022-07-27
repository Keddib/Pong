import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/entities/user.entity";
import { AuthService } from "../auth.service";


@Injectable()
export class LocalStrat extends PassportStrategy(Strategy, 'local') {

    constructor( private readonly authService: AuthService) {
    
        super();
    }


    async validate(username: string, password: string) : Promise<User | void> {
    
        const user = await this.authService.ValidateUser(username, password);

        if (!user)
            throw new UnauthorizedException();
        return user;
    }
}