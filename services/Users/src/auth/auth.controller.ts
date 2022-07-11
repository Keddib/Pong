import { Controller, Get, Res, Req, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { AuthenticatedGuard, FortyTwoAuthGuard } from "./auth.guard";


interface AuthenticatedRequest extends Request{
    user: any;
    logOut: (callback:()=>void) => void;
}

@Controller("auth")
export class AuthController {
  // /auth/login route user will use to authenticate
  @Get("login")
  @UseGuards(FortyTwoAuthGuard)
  login() {
    return;
  }

  // /auth/redirect redirect url oauth provider will call after success
  @Get("redirect")
  @UseGuards(FortyTwoAuthGuard)
  redirect(@Res() res: Response) {
    res.send("Logged in succesfully");
  }

  // /auth/status get auth status
  @Get("status")
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: AuthenticatedRequest) {
    return req.user;  
  }

  // /auth/logout destroy session
  @Get("logout")
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: AuthenticatedRequest) {
    req.logOut(()=>{return;})
    return "Logged out succesfully";
  }
}