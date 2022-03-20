import { Injectable } from '@nestjs/common';
import { CreateTenDto } from './dto/create-ten.dto';
import { UpdateTenDto } from './dto/update-ten.dto';

@Injectable()
export class TenService {
  create(createTenDto: CreateTenDto) {
    return 'This action adds a new ten';
  }

  findAll() {
    return `This action returns all ten`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ten`;
  }

  update(id: number, updateTenDto: UpdateTenDto) {
    return `This action updates a #${id} ten`;
  }

  remove(id: number) {
    return `This action removes a #${id} ten`;
  }
}
