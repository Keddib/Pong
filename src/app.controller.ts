import { Controller, Get, Query, Post, Body, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/entities/user.entity';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import {Strategy} from 'passport-42'
import { ConfigService } from '@nestjs/config';

const Profile = {
  'id': function (obj) { return obj.id;},
  'username': 'login',
  'displayName': 'displayname',
  'name.familyName': 'last_name',
  'name.givenName': 'first_name',
  'profileUrl': 'url',
  'emails.0.value': 'email',
  'phoneNumbers.0.value': 'phone',
  'photos.0.value': 'image_url'
}


@Controller()
export class fortyTwoAuth extends PassportStrategy(Strategy, "42") {

  constructor(private readonly apiConf: ConfigService, private readonly appService: AppService) {

    const clientID = apiConf.get<string>('clientID');
    const clientSecret = apiConf.get<string>('clientSecret');
    const callbackURL = apiConf.get<string>('callbackURL');
    super(
      {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: callbackURL,
      }
    )
  }



  @Get('login')
  @UseGuards(AuthGuard('42'))
  auth(@Req() req) {
  }

}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  // @Post('login')
  // @Get()
  // authUser(@Body() b){
  

  //   console.log(b.user);
    // const user = new CreateUserDto;

    // user.avatar = b.avatar;
    // user.displayedName = b.displayName;
    // user.login = b.login;
    // user.email = b.email;
    // user.password = b.password;
    // console.log(b);
    // console.log(user);
    // return this.appService.authUser(user);
  // }

  @Get()
  getHello(@Query() code ): Promise<any> {

    // console.log(req);
    // console.log(res); 
    return this.appService.getHello(code);
  }
}
