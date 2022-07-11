import { Strategy, Profile } from "passport-42";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable } from "@nestjs/common";
import { AuthenticationProvider, AuthService } from "./auth.service";
import { User } from "src/users/entities/user.entity";

const FORTYTWO_APP_ID =
  "a57b6c08b2acdbe87240256738b7e23fc9e049afd718f6730f5d2642c246d1c3";
const FORTYTWO_APP_SECRET =
  "4d32bb5563dba87ab21742bb50ed5c10e3b82fab31f842ccd57bf0ba79532b41";
const FORTYTWO_CALLBACK_URI = "http://localhost:3000/auth/redirect";

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, "42") {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService : AuthenticationProvider
  ) {
    super({
      clientID: FORTYTWO_APP_ID,
      clientSecret: FORTYTWO_APP_SECRET,
      callbackURL: FORTYTWO_CALLBACK_URI,
      scope: ["public"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<User> {
    // console.log(profile);
    return this.authService.validateUser({ftId: profile.id.toString(), username: profile.username, avatar: profile.photos[0].value});
  }
}
