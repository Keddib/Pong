import { ChatMessage } from "src/entities/chatMessage.entity";


export class createChatRoomDto {

    cid: string;
    type: string;
    owner: string;
    name: string;
    messages: ChatMessage[];
    createdAt: Date;
}