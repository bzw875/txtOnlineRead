import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Novel } from 'src/entity/novel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NovelService {
  constructor(
    @InjectRepository(Novel)
    private readonly novelRepository: Repository<Novel>,
  ) {}

  createNovel(novel: Novel) {
    return this.novelRepository.save(novel);
  }

  async updateNovel(id: number, novel: Novel) {
    return this.novelRepository.update(id, novel);
  }

  getNovelsLimit(page: number, limit: number) {
    return this.novelRepository.find({
      select: ['id', 'name', 'author', 'wordCount', 'starRating', 'readCount'],
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  getNovelByName(name: string) {
    return this.novelRepository.findOne({ where: { name } });
  }

  getNovel(id: number) {
    return this.novelRepository.findOne({ where: { id } });
  }

  getNovels() {
    return this.novelRepository.find();
  }

  deleteNovel(id: number) {
    return this.novelRepository.delete(id);
  }
}
