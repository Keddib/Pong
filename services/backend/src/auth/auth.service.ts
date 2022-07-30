import { BadRequestException, ForbiddenException, Injectable, Request, Res, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dtos/user.dto';
import axios from 'axios';
import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { ChatRoom } from 'src/entities/chatRoom.entity';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UserService,
        private readonly configService: ConfigService,
        ) {

    }



    async refreshToken(@Request() req, @Response({ passthrough: true }) res) : Promise< any > {
    
        const refreshToken = req?.cookies['jwt-rft'];


        if ( !refreshToken ) throw new BadRequestException();

        const payload = await this.verifyRT(refreshToken);


        console.log( 'Payload from cookie ', payload);
        const user = await this.userService.findByUsername(payload.username);

        if (!user) throw new ForbiddenException();

        console.log(user.refreshToken);
        if (await bcrypt.compare(refreshToken, user.refreshToken)) {

            console.log( 'Payload matchs rft in db  ', payload);
            const tokens = await this.getTokens(payload.sub, payload.username);

            await this.updateRtHash(payload.sub, tokens.refreshToken);

            return tokens;
        }
        throw new BadRequestException();
    }

    async verifyRT(authToken: string) {
    
        return await  this.jwtService.verify(authToken, {secret: this.configService.get<string>('RFH_SECRET')});
    }

    async verify(authToken: string) {
    
        return await  this.jwtService.verify(authToken, {secret: this.configService.get<string>('JWT_SECRET')});
    }

    async ValidateUser(username: string, password: string) : Promise<any>  {
    
        const user = await this.userService.findByUsername(username);

        const isMatch = await bcrypt.compare(password, user.password);
        if ( user && isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }



    async ValidatePayload(payload: any) : Promise< User| null>{
    
        const user : User = await this.userService.findByUsername(payload['username']);
        if (user && user.uid === payload['sub'])
            return user;
        return null;
    }

    async findOrCreate(code: string) : Promise<User | null> {
    
        const authToken = await axios({
    
            url: "https://api.intra.42.fr/oauth/token",
            method: "POST",
            data: {
                grant_type: "authorization_code",
                client_id: this.configService.get<string>('clientID'),
                client_secret: this.configService.get<string>('clientSecret'),
                code,
                redirect_uri: this.configService.get<string>('callbackURL'),
            }
        });

        const token =  authToken.data["access_token"];
  
        const userData = await axios({
        
            url: "https://api.intra.42.fr/v2/me",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        })


        let user  = await this.userService.findByUsername(userData.data.login);
        if ( user ) {

            const tokens = await this.getTokens(user.uid, user.login);

            await this.updateRtHash(user.uid, tokens.refreshToken);

            return tokens;
        }

        const newUser = new CreateUserDto;

        newUser.email = userData.data.email;
        newUser.displayedName = userData.data.displayname;
        newUser.avatar = userData.data.image_url;
        newUser.login = userData.data.login;
        // const chatRoom = new ChatRoom;
        // newUser.chatRooms =  [chatRoom];
        newUser.password = 'defaultpassword';
        await this.userService.create(newUser);
        const tokens = await this.getTokens(newUser.uid, newUser.login);
        await this.updateRtHash(newUser.uid, tokens.refreshToken);

        console.log('created New User and assigned RefreshToken');
        return tokens;
    }

    async getTokens(uid: string, login: string) : Promise<any> {

        const payload = { username: login, sub: uid };

        return {
            access_token: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_SECRET'),
                expiresIn:  this.configService.get<string>('JWT_EXP_H'),    
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('RFH_SECRET'),
                expiresIn: this.configService.get<string>('RFH_EXP_D')
            }),
        }

    }

    async updateRtHash(uid: string, rt: string) : Promise<any> {


        const rtHash : string = await bcrypt.hash(rt, 10);

        return this.userService.updateRt(uid, rtHash);

    }



    async signUpLocal(username: string, password: string) {
    
        return this.userService.createLocal(username, password);
    }
}
