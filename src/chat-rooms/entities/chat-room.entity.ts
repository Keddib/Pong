import { ChatMessage } from "src/chat-messages/entities/chat-message.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatRoom {

    @PrimaryGeneratedColumn()
    cid: number;

    @Column()
    type: string;
    
    @Column()
    owner: number;
    

    @OneToMany(type => ChatMessage, chatMessage => chatMessage.roomId)
    messages: ChatMessage[];

    @Column()
    createdAt: Date;

}
