import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Novel } from './entity/novel.entity';
import { NovelService } from './service/novel.service';

import { readFile, readdir, stat } from 'node:fs/promises';
import { UpdateResult } from 'typeorm';

const pageSize = 5000;

interface novelInfo extends Novel  {
  pageSize: number,
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly novelService: NovelService) {}

  @Get('/')
  async Index(): Promise<string> {
    return readFile('./index.html', 'utf-8');
  }

  @Get('/novels')
  async getNovels(): Promise<Novel[]> {
    return (await this.novelService.getNovels()).map((novel) => {
      novel.content = novel.content.slice(0, 50);
      return novel;
    });
  }

  @Get('/novelByName/:name')
  async getNovelByName(@Param('name') name: string): Promise<Novel> {
    const novel = await this.novelService.getNovelByName(name);
    if (!novel) {
      throw new Error('Novel not found');
    }
    return novel;
  }

  @Get('/novel/:id')
  async getNovel(@Param('id') id: string, @Query('page') page?: number): Promise<novelInfo> {
    const novel = await this.novelService.getNovel(Number(id));
    if (!novel) {
      throw new Error('Novel not found');
    }
    await this.novelService.updateNovel(Number(id), novel);
    const copyObj = { ...novel };
    const i = (page || 1) * pageSize;
    const j = (page || 1) * pageSize + pageSize;
    copyObj.content = copyObj.content.slice(i, j);
    copyObj.readCount += 1;
    return {
      ...copyObj,
      pageSize: pageSize,
    };
  }

  @Post('/novel/:id')
  async updateNovel(@Param('id') id: string, @Body() novel: Novel): Promise<UpdateResult> {
    return this.novelService.updateNovel(Number(id), novel);
  }

  @Get('/scanning')
  async doScanning(): Promise<Novel[]> {
    const novels = await this.appService.doScanning();
    return novels;
  }
}
