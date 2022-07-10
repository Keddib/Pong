import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class FortyTwoAuthGuard extends AuthGuard("42") {

  async canActivate(context: ExecutionContext){
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return activate; 
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //console.log(request.isAuthenticated());
    return request.isAuthenticated();
  }
}