import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './../auth/auth.module';
import { Convert } from './entities/convert.entity';
import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { ConvertController } from './convert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Convert,User]),
    AuthModule
  ],
  controllers: [ConvertController],
  providers: [ConvertService, UserService]

})
export class ConvertModule {}
