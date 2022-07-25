import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserCreateDto = {
    ftId : string;
    username: string;
    avatar: string;
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ft_id', unique: true})
  ftId: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatar: string;
}
