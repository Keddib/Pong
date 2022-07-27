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
        'dac506e7095f7f042e1e9de45db80a9706974bbc636c35a367dd88b2bfdcebbb',
      clientSecret:
        '63b7afc9ee41a50a5ae846692c5c412f58e3970e12e3dd57efb707d9a338f403',
      callbackURL: 'http://localhost/auth42/',
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

    user.displayedName = profile['displayName'];
    user.avatar = profile['photos']['value'];
    user.email = profile['emails'][0]['value'];
    user.login = profile['username'];
    const saltOrRounds = 10;
    const hash = await bcrypt.hash('defaultpass', saltOrRounds);
    user.password = hash;
    // user.
    // user.picture
    console.log(cb);
    return cb(null, await this.userService.create(user));
  }
}
