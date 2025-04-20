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

  @Column({ type: 'longtext' }) // 修改为 longtext 类型
  content: string;

  @Column()
  starRating: number;

  @Column()
  readCount: number;
}
