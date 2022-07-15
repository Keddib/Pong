import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { User } from "src/entities/user.entity";
import { AuthService } from "../auth.service";

@Injectable()
export class fortyTwoStrategy extends PassportStrategy(Strategy, "42") {

    constructor(private readonly authService: AuthService) {
    
        // console.log(config.get<string>('clientID'));
        // const clientID = config.get<string>('clientID');
        // const clientSecret = config.get<string>('clientSecret');
        // const callbackURL = config.get<string>('callbackURL');
        super({
            clientID: " ",
            clientSecret: " ",
            callbackURL: " ",
        });
    }

    async validate(username: string, password: string) : Promise<User> {

        console.log(username);
        return await this.authService.validateUser("username", "password");
    }
}