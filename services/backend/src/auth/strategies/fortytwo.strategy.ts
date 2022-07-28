import { Controller, Get, Injectable, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard, PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";
import { CreateUserDto } from "src/dtos/user.dto";
import { User } from "src/entities/user.entity";
import { AuthService } from "../auth.service";
import * as bcrypt from 'bcrypt';
import { UserService } from "src/user/user.service";

@Controller()
export class fortyTwoStrat extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService, private readonly configService: ConfigService) {

        super({
            clientID: configService.get<string>('clientID'),
            clientSecret: configService.get<string>('clientSecret'),
            callbackURL: configService.get<string>('callbackURL')
        })
    }

    async validate(access_token: string, refreshToken: string, profile: any, cb: any) {
    
        // Find Or create 

        console.log('Calling validate Function throught 42 Contoller')

        if (!profile)
            return null;
        let userFound: User;
        if ( userFound = await this.userService.findByUsername(profile['username']))
            return cb(null, userFound);
        const user = new CreateUserDto;

        user.displayedName = profile['displayName'];
        user.avatar = profile['photos']['value'];
        user.email = profile['emails'][0]['value'];
        user.login = profile['username'];
        const saltOrRounds = 10;
        const hash = await bcrypt.hash("defaultpass", saltOrRounds);
        user.password = hash;
        console.log(user);
        return cb(null, await this.userService.create(user));
    }


}