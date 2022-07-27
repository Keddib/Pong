import { Controller, Post, UseGuards, Request, Response, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { fortyTwoGuard } from './auth/guards/fortytwo.guard';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { LocalGuard } from './auth/guards/local.guard';

@Controller('')
export class AppController {

  constructor(private readonly authService: AuthService) {

  }

  @Get('auth/isLogged')
  @UseGuards(JwtAuthGuard)
  isLogged(@Request() req) {
  
    return req.user;
  }

  @Get('auth42')
  async LoginfortyTwo(@Query() code, @Response({ passthrough: true}) res) : Promise<any>{
  
    code = code['code'];
    console.log(code);
    if (code) {
      const payload = await this.authService.returnUser(code);
  
      res.cookie('auth-jwt', payload['access_token'], {httpOnly: true});
      return {status: 'logged in'}
    }
    return undefined;
  }

  @Post('auth/login')
  @UseGuards(LocalGuard)
  async login(@Request() req, @Response({ passthrough: true }) res) { 

    const payload = await this.authService.login(req.user);

    res.cookie('auth-jwt', payload['access_token'], {httpOnly: true});
    return {status: 'logged in'}
  }

  @Get('auth/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Response({ passthrough: true }) res) {
  
    res.cookie('auth-jwt', {expires: Date.now()}, {httpOnly: true});
  }

  @Post('auth/signup')
  signUpLocal(@Body() payload: JSON) {
  

    console.log(payload)
    this.authService.signUpLocal(payload['username'], payload['password']);
  }

  @Get('auth/42')
  @UseGuards(fortyTwoGuard)
  signUp(@Request() req) {
    return req.user;
  }

}
