import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";



@Injectable()
export class JwtStartRefresh extends PassportStrategy(Strategy, 'jwtRefresh' ) {

    constructor(private readonly configService: ConfigService) {
    

        console.log('Jsut Called JWTRefresh ');
        super({

            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {

                    let data = request?.cookies['jwt-rft'];
                    console.log(" refresh Token currently used ",data);
                    if (!data)
                        return null;
                    return data;
                }
            ]),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('RFH_SECRET'),
        });
    }


    async validate(payload : any) {

        return { userId: payload.sub, username: payload.username };
    }
}