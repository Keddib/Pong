import { Entity, JoinTable, ManyToMany } from "typeorm";
import { PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ChatRoom } from './chatRoom.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    uid: string;

    @Column({ unique: true, nullable: true})
    displayedName: string;

    @Column({nullable: true})
    avatar: string;

    // @Column({
    //     // type: 'bytea',
    //     nullable: true
    // })
    // picture: Uint8Array;

    @Column({ unique: true })
    login: string;

    @Column()
    password: string;

    @Column({ unique: true, nullable: true })
    email: string;

    @OneToMany(type => ChatRoom, chatroom => chatroom.owner)
    ChatRooms: ChatRoom[];

    @Column({nullable:true})
    wins : number;

    @Column({nullable:true})
    losses : number;

    @Column({nullable:true})
    xp : number;

    @Column({nullable:true})
    level : number;
    
    @Column({nullable:true})
    status : "online" | "offline" | "playing" | "spectating";

    @ManyToMany(()=> User, (user)=>user.friendList, { onUpdate: 'CASCADE' })
    @JoinTable({name:"friend_list"})
    friendList: User[];

    @ManyToMany(()=> User, (user)=>user.friendRequests)
    @JoinTable({name:"friend_requests"})
    friendRequests: User[]
}
// - 42 ID
// - Username
// - Nickname
// - Avatar (profile img link)
// - Wins
// - Losses
// - XP
// - Level
// - Status : online | offline | playing | spectating
// - Friendlist : User[]
// - FriendRequests : User[]
// - Blocklist : User[]