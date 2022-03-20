import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TenService } from './ten.service';
import { TenController } from './ten.controller';
import { Ten } from './entities/ten.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ten])],
  controllers: [TenController],
  providers: [TenService]
})
export class TenModule {}
