import { ChatMessage } from "src/entities/chatMessage.entity";


export class createChatRoomDto {

    cid: number;
    type: string;
    owner: number;
    messages: ChatMessage[];
    createdAt: Date;
}