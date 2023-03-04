import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authors extends BaseEntity {
  @PrimaryGeneratedColumn()
  authorId: number;

  @Column({
    nullable: false,
    default: '',
  })
  name: string;
}
