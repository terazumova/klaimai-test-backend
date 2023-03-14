import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'userId' })
  userId: number;

  @OneToOne(() => Users, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({
    nullable: false,
    default: '',
  })
  token: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  expiresAt: string;
}
