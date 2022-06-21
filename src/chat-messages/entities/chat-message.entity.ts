import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {


    @PrimaryGeneratedColumn()
    cid: number;

    @Column( { unique: true })
    text: string;

    @Column()
    ownerId: number;

    @Column()
    createdAt: Date;

}
