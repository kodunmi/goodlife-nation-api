import { UserModule } from 'src/user/user.module';
import { RoyalChapter } from './entities/royal-chapter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoyalChapterService } from './royal-chapter.service';
import { RoyalChapterController } from './royal-chapter.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoyalChapter, User]),
    AuthModule
  ],
  controllers: [RoyalChapterController],
  providers: [RoyalChapterService]
})
export class RoyalChapterModule {}
