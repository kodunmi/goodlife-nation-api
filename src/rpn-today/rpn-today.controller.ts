import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RpnTodayService } from './rpn-today.service';
import { CreateRpnTodayDto } from './dto/create-rpn-today.dto';
import { UpdateRpnTodayDto } from './dto/update-rpn-today.dto';

@Controller('rpn-today')
export class RpnTodayController {
  constructor(private readonly rpnTodayService: RpnTodayService) {}

  @Post()
  create(@Body() createRpnTodayDto: CreateRpnTodayDto) {
    return this.rpnTodayService.create(createRpnTodayDto);
  }

  @Get()
  findAll() {
    return this.rpnTodayService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rpnTodayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRpnTodayDto: UpdateRpnTodayDto) {
    return this.rpnTodayService.update(+id, updateRpnTodayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rpnTodayService.remove(+id);
  }
}
