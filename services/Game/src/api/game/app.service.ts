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
      const res = await axios.get('http://localhost:3000/auth/status', {
        headers: { cookie },
      });
      return res.data;
    } catch (e) {
      return false;
    }
  }
}
