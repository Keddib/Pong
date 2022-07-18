import { Controller, Get, Post, UseGuards, Request, Response,  Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { User } from 'src/entities/user.entity';
import { isAuthGuard } from './guards/session.guard';
import { fortyTwoGuard } from './guards/fortytwo.guard';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {

    constructor( private authService: AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Request() req) {

        return this.authService.login(req);
    }

    @Get('')
    @UseGuards(fortyTwoGuard)
    async userProfile(@Query() code) {

        // if (code['code'])
        //     return this.authService.loginWithIntra(code);
        // else
        //     throw new UnauthorizedException();
    }

    @Get('intra')
    @UseGuards(fortyTwoGuard)
    async loginWithIntra() {
    }


    @Get('logout')
    @UseGuards(isAuthGuard)
    async logout(@Request() req, @Response() res) {
        
        return this.authService.logout(req, res);
         
    }

}