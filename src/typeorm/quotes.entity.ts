import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Authors } from './authors.entity';

@Entity()
export class Quotes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  quote: string;

  @OneToOne(() => Authors)
  @JoinColumn()
  author: Authors;
}
