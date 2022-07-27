import { ChatMessage } from "./chatMessage.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class ChatRoom {

    @PrimaryGeneratedColumn()
    cid: string;

    @Column()
    type: string;
    
    @ManyToOne(type => User, user => user.uid)
    owner: string;
    
    @OneToMany(type => ChatMessage, chatMessage => chatMessage.roomId)
    messages: ChatMessage[];

    @Column()
    createdAt: Date;

    @Column({})
    name: string;
}
