import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TypeOrmConfigService } from '@/shared/typeorm/typeorm.service';

const db = new TypeOrmConfigService().createTypeOrmOptions().type


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public email!: string;

  @Exclude()
  @Column({ type: 'varchar' })
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public name: string | null;

  @Column({ type: (db==="sqlite" ? 'datetime' : 'timestamp'), nullable: true, default: null })
  public lastLoginAt: Date | null;
}
