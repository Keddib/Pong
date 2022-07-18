import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext } from "@nestjs/common";
 

export class LocalGuard extends AuthGuard('local') {


    // trigerring session creation after login 
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const result = (await super.canActivate(context)) as boolean;
    
        if (result)  {
        
            const req = context.switchToHttp().getRequest();
            await  super.logIn(req);
        }
        
        // console.log(result, "hmmm");
        return true;

    }
}