import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NovelService } from './service/novel.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novel } from './entity/novel.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'PbAln&82vsUiabqXd',
      database: 'novels',
      entities: [Novel],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // 静态文件目录
    }),
    TypeOrmModule.forFeature([Novel]),
  ],
  controllers: [AppController],
  providers: [AppService, NovelService],
})
export class AppModule {}
