import { Entity } from "typeorm";
import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChatRoom } from './chatRoom.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    uid: number;

    @Column({ unique: true })
    displayedName: string;

    @Column({nullable: true})
    avatar: string;

    @Column({
        type: 'bytea',
        nullable: true
    })
    picture: Uint8Array;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @OneToMany(type => ChatRoom, chatroom => chatroom.owner)
    ChatRooms: ChatRoom[];

}