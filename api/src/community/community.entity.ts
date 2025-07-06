import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'communities' })
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
