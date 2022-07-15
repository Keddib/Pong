import { Controller, Get, Post, UseGuards, Request, Query } from '@nestjs/common';
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
    
        // //  created session using gaurd
        // return req.user;

        return this.authService.login(req);
    }


    @Get()
    @UseGuards(fortyTwoGuard)
    async loginWithIntra(@Query() code) {

        console.log(code['code']);
        return this.authService.loginWithIntra();
    }

    @Get('logged')
    @UseGuards(isAuthGuard)
    async logged() {

        return console.log('user logged in ');
    }

    @Get('logout')
    async logout() {
        
        return this.authService.logout();
    }
}
