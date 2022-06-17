import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatRoom {


    @PrimaryGeneratedColumn()
    cid: number;

    @Column()
    owner: string;

}
