import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    uid: number;


    @Column({ unique: true })
    displayedName: string;

    @Column({ type: 'bytea' })
    avatar: Uint8Array;

    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    email: string;
}
