import { RoyalChapter } from './entities/royal-chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoyalChapterService } from './royal-chapter.service';
import { RoyalChapterController } from './royal-chapter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoyalChapter])],
  controllers: [RoyalChapterController],
  providers: [RoyalChapterService]
})
export class RoyalChapterModule {}
