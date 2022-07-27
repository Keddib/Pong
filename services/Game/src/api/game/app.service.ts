import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface User {
  id: number;
  ftId: string;
  avatar: string;
  username: string;
}

@Injectable()
export class AuthService {
  async isAuthenticated(cookie: string): Promise<false | User> {
    try {
      const res = await axios.get('http://users:3500/auth/isLogged', {
        headers: { cookie },
      });
      return { ...res.data, ftId: res.data.uid };
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
