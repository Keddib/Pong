import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";

export class CreateUserDto {

    uid: number;
    displayedName: string;
    avatar: string;
    login: string;
    password: string;
    email: string;
    chatRooms: ChatRoom[];
    // status
}
