import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Novel } from './entity/novel.entity';
import { NovelService } from './service/novel.service';

import { readFile, readdir, stat } from 'node:fs/promises';
import { DeleteResult, UpdateResult } from 'typeorm';

const pageSize = 5000;

interface novelInfo extends Novel {
  pageSize: number;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly novelService: NovelService,
  ) {}

  @Get('/novels')
  async getNovels(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1000,
  ): Promise<Novel[]> {
    return await this.novelService.getNovelsLimit(page, limit);
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
  async getNovel(
    @Param('id') id: string,
    @Query('page') page?: number,
  ): Promise<novelInfo> {
    const novel = await this.novelService.getNovel(Number(id));
    if (!novel) {
      throw new Error('Novel not found');
    }
    await this.novelService.updateNovel(Number(id), novel);
    const copyObj = { ...novel };
    const pageNum = (page || 1) - 1;
    const i = pageNum * pageSize;
    const j = pageNum * pageSize + pageSize;
    copyObj.content = copyObj.content.slice(i, j);
    novel.readCount += 1;
    this.novelService.updateNovel(novel.id, novel);
    return {
      ...copyObj,
      pageSize: pageSize,
    };
  }

  @Post('/novel/:id')
  async updateStartRating(
    @Param('id') id: string,
    @Body() novel: Novel,
  ): Promise<UpdateResult> {
    const cur = await this.novelService.getNovel(Number(id));
    if (!cur) {
      throw new Error('Novel not found');
    }
    cur.starRating = novel.starRating;
    return this.novelService.updateNovel(Number(id), cur);
  }

  @Get('/scanning')
  async doScanning(): Promise<string[]> {
    const novels = await this.appService.doScanning();
    return novels;
  }

  @Delete('/novel/:id')
  async deleteNovel(@Param('id') id: string): Promise<DeleteResult> {
    return this.novelService.deleteNovel(Number(id));
  }
}
