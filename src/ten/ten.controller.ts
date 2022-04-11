import { Pagination } from 'nestjs-typeorm-paginate';
import { BaseResponse } from 'src/base-response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpException, HttpStatus, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { TenService } from './ten.service';
import { CreateTenDto } from './dto/create-ten.dto';
import { UpdateTenDto } from './dto/update-ten.dto';
import { AuthGuard } from '@nestjs/passport';
import { Ten } from './entities/ten.entity';
import { User } from 'src/user/entities/user.entity';

@Controller('ten')
export class TenController {
  constructor(private readonly tenService: TenService) { }

  @Post('create-ten')
  @UseGuards(AuthGuard())
  async create(@Body() createTenDto: CreateTenDto, @Req() req: any): Promise<BaseResponse<Ten>> {
    if (!req.user.isBishop) {
      throw new HttpException('You are not bishop', HttpStatus.UNAUTHORIZED)
    }
    try {
      return {
        data: await this.tenService.create(createTenDto, req.user.chapter.id),
        status: 'success',
        message: 'Ten created successfully',
      }
    } catch (error) {
      throw error
    }
  }

  @Get('get-all-tens-in-chapter/:id')
  @UseGuards(AuthGuard())
  async findAll(@Param('id') id: string): Promise<BaseResponse<Ten[]>> {
    return {
      data: await this.tenService.findAll(id),
      status: 'success',
    }
  }


  @Get('get-single-ten/:id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string, @Req() req: any): Promise<BaseResponse<Ten>> {

    return {
      data: await this.tenService.findOne(id, req.user.id),
      status: 'success'
    }
  }

  @Get('get-all-users-in-ten/:id')
  @UseGuards(AuthGuard())
  async getUsers(
    @Param('id') id: string,
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2
  ): Promise<BaseResponse<Pagination<any>>> {
    return {
      data: await this.tenService.getUsers(id, req.user.id, {
        page,
        limit,
        route: `get-all-users-in-ten/${id}`,
      }),
      status: 'success',
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenDto: UpdateTenDto) {
    return this.tenService.update(+id, updateTenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenService.remove(+id);
  }
}
