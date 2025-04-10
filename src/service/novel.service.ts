import { Injectable } from '@nestjs/common';
import type { Novel } from 'src/entity/novel.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class NovelService {
  constructor(private readonly novelRepository: Repository<Novel>) {}

  createNovel(novel: Novel) {
    return this.novelRepository.save(novel);
  }

  updateNovel(id: number, novel: Novel) {
    return this.novelRepository.update(id, novel);
  }

  getNovels() {
    return this.novelRepository.find();
  }
}
