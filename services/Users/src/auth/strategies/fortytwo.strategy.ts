import { Controller, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { profile } from 'console';
import { urlencoded } from 'express';
import { Strategy } from 'passport-42';
import { CreateUserDto } from 'src/dtos/user.dto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class fortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly userService: UserService) {
    // console.log(config.get<string>('clientID'));
    // const clientID = config.get<string>('clientID');
    // const clientSecret = config.get<string>('clientSecret');
    // const callbackURL = config.get<string>('callbackURL');
    super({
      clientID:
        'a57b6c08b2acdbe87240256738b7e23fc9e049afd718f6730f5d2642c246d1c3',
      clientSecret:
        '4d32bb5563dba87ab21742bb50ed5c10e3b82fab31f842ccd57bf0ba79532b41',
      callbackURL: 'http://localhost:8000/auth42',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: any,
  ) {
    // console.log(username, password, "hello");
    // this.authService.validateUser()

    if (!profile) return null;
    let userFound: User;
    if (
      (userFound = await this.userService.findByUsername(profile['username']))
    )
      return cb(null, userFound);
    const user = new CreateUserDto();
    console.log(profile)
    user.displayedName = profile['displayName'];
    user.avatar = profile['photos'][0]['value'];
    user.email = profile['emails'][0]['value'];
    user.login = profile['username'];
    user.level = 1;
    user.xp = 0;
    user.wins = 0;
    user.losses = 0;
    user.status = "offline";

    const saltOrRounds = 10;
    const hash = await bcrypt.hash('defaultpass', saltOrRounds);
    user.password = hash;
    // user.
    // user.picture
    console.log(cb);
    return cb(null, await this.userService.create(user));
  }
}

