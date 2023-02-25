import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Info {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'text',
    name: 'description',
    nullable: false,
    default: '',
  })
  info: string;
}
