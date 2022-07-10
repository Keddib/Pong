import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthenticatedGuard, FortyTwoAuthGuard } from "./auth.guard";

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
    res.send("Redirected after oauth login");
  }

  // /auth/status get auth status
  @Get("status")
  @UseGuards(AuthenticatedGuard)
  status() {
    return "ok";  
  }

  // /auth/logout destroy session
  @Get("logout")
  logout() {}
}
