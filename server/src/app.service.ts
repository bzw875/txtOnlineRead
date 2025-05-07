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
    const arr: string[] = [];
    for (const file of files) {
      const filePath = `./txt/${file}`;
      if ((await stat(filePath)).isDirectory() || !file.endsWith('.txt')) {
        continue;
      }
      const novelItem = allNovels.find((item) => item.name === file);
      if (novelItem) {
        continue;
      }
      const buf = await readFile(filePath);
      const [isCover, content] = convertToUtf8(buf);
      if (isCover) {
        await writeFile(filePath, content, 'utf-8');
      }
      const author = content
        .slice(0, 100)
        .split('\n')
        .filter((line) => !!line)[1];
      const novel = new Novel();
      novel.name = file.replace('.text', '');
      novel.content = content;
      novel.author = author || '';
      novel.starRating = 0;
      novel.wordCount = content.length;
      novel.readCount = 0;
      await this.novelService.createNovel(novel);
      arr.push(file);
    }
    return arr;
  }
}
