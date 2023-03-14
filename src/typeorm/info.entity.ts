import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Info extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    name: 'description',
    nullable: false,
    default: '',
  })
  info: string;
}
