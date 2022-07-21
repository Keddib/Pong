import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import chatGateway from './chat.gateway';

@Module({

    imports: [PassportModule.register({ session:  true })],
    providers: [chatGateway],
    controllers: []
})
export class ChatGatewayModule {


}
 