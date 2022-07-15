import { ChatRoom } from "./chatRoom.entity";
import { User } from "./user.entity";
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

