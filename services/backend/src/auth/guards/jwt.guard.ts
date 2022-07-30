import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}



export class jwtRefreshAuthGuard extends AuthGuard('jwtRefresh') {}