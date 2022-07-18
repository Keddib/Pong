import { Inject, Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class fortyTwoGuard extends AuthGuard('42') {

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const result = (await super.canActivate(context)) as boolean;

        const req = context.switchToHttp().getRequest();

        return req.user;
    }
}