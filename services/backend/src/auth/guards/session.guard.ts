import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class isAuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
    
        const request = context.switchToHttp().getRequest();

        return request.isAuthenticated();
    }
}