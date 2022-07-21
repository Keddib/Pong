import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class isAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
    
        const request = context.switchToHttp().getRequest();

        console.log(request.user);
        if (request.user === undefined) {
            throw new UnauthorizedException();
            return false;
        }
        return request.isAuthenticated();
    }
}