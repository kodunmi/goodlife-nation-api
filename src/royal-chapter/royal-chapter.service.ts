import { Injectable } from '@nestjs/common';
import { CreateRoyalChapterDto } from './dto/create-royal-chapter.dto';
import { UpdateRoyalChapterDto } from './dto/update-royal-chapter.dto';

@Injectable()
export class RoyalChapterService {
  create(createRoyalChapterDto: CreateRoyalChapterDto) {
    return 'This action adds a new royalChapter';
  }

  findAll() {
    return `This action returns all royalChapter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} royalChapter`;
  }

  update(id: number, updateRoyalChapterDto: UpdateRoyalChapterDto) {
    return `This action updates a #${id} royalChapter`;
  }

  remove(id: number) {
    return `This action removes a #${id} royalChapter`;
  }
}
