import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('novel')
export class Novel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  author: string;

  @Column()
  wordCount: number;

  @Column()
  content: string;

  @Column()
  starRating: number;

  @Column()
  readCount: number;
}
