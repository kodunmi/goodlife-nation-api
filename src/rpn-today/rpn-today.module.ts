import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RpnTodayService } from './rpn-today.service';
import { RpnTodayController } from './rpn-today.controller';
import { RpnToday } from './entities/rpn-today.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RpnToday])],
  controllers: [RpnTodayController],
  providers: [RpnTodayService]
})
export class RpnTodayModule {}
