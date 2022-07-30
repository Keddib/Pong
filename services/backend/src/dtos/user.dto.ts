import { ChatRoom } from "src/entities/chatRoom.entity";


export  class CreateUserDto {

    uid: string;
    displayedName: string;
    avatar: string;
    picture: Uint8Array;
    login: string;
    password: string;
    email: string;
    chatRooms: ChatRoom[]; 
    refreshToken: string;
}