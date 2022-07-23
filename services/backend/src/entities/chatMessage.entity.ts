import { ChatRoom } from "./chatRoom.entity";
import { User } from "./user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {

    @PrimaryGeneratedColumn()
    messageId: string;

    @Column( { unique: true })
    text: string;

    @OneToOne(type => ChatRoom, chatRoom => chatRoom.cid)
    roomId: string;

    @OneToOne(type => User, user => user.uid)
    ownerId: string;

    @Column()
    createdAt: Date;

}

