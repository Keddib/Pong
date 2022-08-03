import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface User {
  uid: string;
  displayedName: string;
  avatar?: string;

  // @Column({
  //     // type: 'bytea',
  //     nullable: true
  // })
  // picture: Uint8Array;
  login: string;
  email: string;

  // ChatRooms: ChatRoom[];
}

@Injectable()
export class AuthService {
  async isAuthenticated(cookie: string): Promise<false | User> {
    try {
      const res = await axios.get('http://localhost:3500/auth/isLogged', { // http://users:3500 when docker compose
        headers: { cookie },
      });
      return res.data;
    } catch (e) {
      //console.log(e);
      return false;
    }
  }
}
