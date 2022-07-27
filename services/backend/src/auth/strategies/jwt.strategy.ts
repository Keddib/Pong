import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStart extends PassportStrategy(Strategy, 'jwt' ) {

    constructor(private readonly configService: ConfigService) {
    
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {

                    let data = request?.cookies['auth-jwt'];
                    console.log(data);
                    if (!data)
                        return null;
                    return data;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }


    async validate(payload : any) {

        return { userId: payload.sub, username: payload.username };
    }
}