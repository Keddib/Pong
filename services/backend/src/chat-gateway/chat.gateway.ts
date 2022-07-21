import { UseGuards } from "@nestjs/common";
import { WebSocketGateway } from "@nestjs/websockets";
import { SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from 'dgram';
import { isAuthGuard } from "src/auth/guards/session.guard";

@UseGuards(isAuthGuard)
@WebSocketGateway( { cors: '*' } )
export default  class chatGateway {

    @SubscribeMessage('events')
    handleEvent(  @MessageBody() data: string   ) : string {
    
        console.log("recieved the following message : ", data);
        return data + " World";
    }
} 