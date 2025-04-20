import { Injectable } from '@nestjs/common';
import { Novel } from './entity/novel.entity';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { convertToUtf8 } from './utils';
import { NovelService } from './service/novel.service';

@Injectable()
export class AppService {
  constructor(private readonly novelService: NovelService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async doScanning() {
    const allNovels = await this.novelService.getNovels();
    const files = await readdir('./txt');
    const arr: Novel[] = [];
    for (const file of files) {
      const filePath = `./txt/${file}`;
      if ((await stat(filePath)).isDirectory() || !file.endsWith('.txt')) {
        continue;
      }
      const buf = await readFile(filePath);
      const [isCover, content] = convertToUtf8(buf);
      if (isCover) {
        await writeFile(filePath, content, 'utf-8');
      }
      const novel = new Novel();
      novel.name = file;
      novel.content = content;
      novel.author = content.split('\n').filter((line) => !!line)[1];
      novel.starRating = 0;
      novel.wordCount = content.length;
      novel.readCount = 0;
      const novelItem = allNovels.find((item) => item.name === novel.name);
      if (novelItem) {
        // await this.novelService.updateNovel(novelItem.id, novel);
      } else {
        await this.novelService.createNovel(novel);
      }
      arr.push(novel);
    }
    return arr;
  }
}
