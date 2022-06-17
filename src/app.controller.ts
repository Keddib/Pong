import { Controller, Get, Query, Post, Body, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42'
import { ConfigService } from '@nestjs/config';



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

  @Get()
  getHello(@Query() code ): Promise<any> {

    return this.appService.getHello(code);
  }
}
