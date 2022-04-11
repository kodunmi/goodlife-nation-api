import { User } from 'src/user/entities/user.entity';
import { RoyalChapter } from 'src/royal-chapter/entities/royal-chapter.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenService } from './ten.service';
import { TenController } from './ten.controller';
import { Ten } from './entities/ten.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ten, RoyalChapter, User]),
    AuthModule,
],
  controllers: [TenController],
  providers: [TenService]
})
export class TenModule {}
