import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class fortyTwoGuard extends AuthGuard('42') {
    
}