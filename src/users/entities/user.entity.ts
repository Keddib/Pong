import { ChatRoom } from "src/chat-rooms/entities/chat-room.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    uid: number;


    @Column({ unique: true })
    displayedName: string;

    @Column({nullable: true})
    avatar: string;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @OneToMany(type => ChatRoom, chatroom => chatroom.owner)
    ChatRooms: ChatRoom[];

}
