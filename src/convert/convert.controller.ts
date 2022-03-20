import { Convert } from './entities/convert.entity';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { CreateConvertDto } from './dto/create-convert.dto';
import { UpdateConvertDto } from './dto/update-convert.dto';
import { BaseResponse } from 'src/base-response.interface';
import { UserService } from 'src/user/user.service';

@Controller('convert')
export class ConvertController {
  constructor(
    private readonly convertService: ConvertService,
    private readonly userService: UserService,
    ) { }

  @Post('add-new-convert')
  @UseGuards(AuthGuard())
  public async create(@Body() createConvertDto: CreateConvertDto): Promise<BaseResponse<Convert>> {

    try {
      const convert = await this.convertService.create(createConvertDto);

      return {
        message: "convert created successfully",
        status: 'success',
        data: convert
      }
    } catch (error) {
      throw error
    }

  }

  @Get('get-user-converts')
  @UseGuards(AuthGuard())
  public async getConverts(@Req() req:any): Promise<BaseResponse<Convert[]>> {

    try {
      const convert = await this.userService.findOne(req.user.id);      
      
      return {
        message: "convert found successfully",
        status: 'success',
        data: convert.converts
      }
    } catch (error) {
      throw error
    }

  }

  @Get()
  findAll() {
    return this.convertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.convertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConvertDto: UpdateConvertDto) {
    return this.convertService.update(+id, updateConvertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.convertService.remove(+id);
  }
}
