import { Injectable } from '@nestjs/common';
import { CreateRpnTodayDto } from './dto/create-rpn-today.dto';
import { UpdateRpnTodayDto } from './dto/update-rpn-today.dto';

@Injectable()
export class RpnTodayService {
  create(createRpnTodayDto: CreateRpnTodayDto) {
    return 'This action adds a new rpnToday';
  }

  findAll() {
    return `This action returns all rpnToday`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rpnToday`;
  }

  update(id: number, updateRpnTodayDto: UpdateRpnTodayDto) {
    return `This action updates a #${id} rpnToday`;
  }

  remove(id: number) {
    return `This action removes a #${id} rpnToday`;
  }
}
