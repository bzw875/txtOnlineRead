import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Novel } from './entity/novel.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/scanning')
  async doScanning(): Promise<Novel[]> {
    return await this.appService.doScanning();
  }
}
