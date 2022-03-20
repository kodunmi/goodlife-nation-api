import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoyalChapterService } from './royal-chapter.service';
import { CreateRoyalChapterDto } from './dto/create-royal-chapter.dto';
import { UpdateRoyalChapterDto } from './dto/update-royal-chapter.dto';

@Controller('royal-chapter')
export class RoyalChapterController {
  constructor(private readonly royalChapterService: RoyalChapterService) {}

  @Post()
  create(@Body() createRoyalChapterDto: CreateRoyalChapterDto) {
    return this.royalChapterService.create(createRoyalChapterDto);
  }

  @Get()
  findAll() {
    return this.royalChapterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.royalChapterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoyalChapterDto: UpdateRoyalChapterDto) {
    return this.royalChapterService.update(+id, updateRoyalChapterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.royalChapterService.remove(+id);
  }
}
