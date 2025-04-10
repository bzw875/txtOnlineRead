import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NovelService } from './service/novel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novel } from './entity/novel.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '123.60.75.102',
      port: 3306,
      username: 'root',
      password: 'w{@WpJ&~tU)Na9Q;GFD3CV',
      database: 'novels',
      entities: [Novel],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, NovelService],
})
export class AppModule {}
