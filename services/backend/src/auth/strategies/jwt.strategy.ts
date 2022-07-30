import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy, 'jwt' ) {

    constructor(private readonly configService: ConfigService) {
    
        console.log('Jsut Called JWT ');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }


    async validate(payload : any) {

        return { userId: payload.sub, username: payload.username };
    }
}