import { BaseResponse } from 'src/base-response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { RoyalChapterService } from './royal-chapter.service';
import { CreateRoyalChapterDto } from './dto/create-royal-chapter.dto';
import { UpdateRoyalChapterDto } from './dto/update-royal-chapter.dto';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { RoyalChapter } from './entities/royal-chapter.entity';

@Controller('royal-chapter')
export class RoyalChapterController {
  constructor(private readonly royalChapterService: RoyalChapterService) { }

  @Post()
  create(@Body() createRoyalChapterDto: CreateRoyalChapterDto) {
    return this.royalChapterService.create(createRoyalChapterDto);
  }

  @Get('get-all')
  async findAll(): Promise<BaseResponse<RoyalChapter[]>> {

    return {
      data: await this.royalChapterService.findAll(),
      status: 'success',
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.royalChapterService.findOne(+id);
  }

  @Get('get-chapter-stat/:id')
  @UseGuards(AuthGuard())
  async getStat(@Param('id') id: string, @Req() req: any): Promise<BaseResponse<{ users: number, tens: number, converts: number }>> {

    return {
      data: await this.royalChapterService.getStat(id, req.user.id),
      status: 'success',
    }

  }

  @Get('get-all-users/:id')
  @UseGuards(AuthGuard())
  async getAllUsers(
    @Param('id') id: string,
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2
  ): Promise<BaseResponse<Pagination<any>>> {
    return {
      data: await this.royalChapterService.getAllUsers(
        id,
        req.user.id,
        {
          page,
          limit,
          route: `get-all-users/${id}`,
        }
      ),
      status: 'success',
    }
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
