import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn()
    messageId: number;

    @Column( { unique: true })
    text: string;

    @OneToOne(type => ChatRoom, chatRoom => chatRoom.cid)
    roomId: number;

    @OneToOne(type => User, user => user.uid)
    ownerId: number;

    @Column()
    createdAt: Date;

}
