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
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'PbAln&82vsUiabqXd',
      database: 'novels',
      entities: [Novel],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Novel]),
  ],
  controllers: [AppController],
  providers: [AppService, NovelService],
})
export class AppModule {}
