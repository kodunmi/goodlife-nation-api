import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenService } from './ten.service';
import { CreateTenDto } from './dto/create-ten.dto';
import { UpdateTenDto } from './dto/update-ten.dto';

@Controller('ten')
export class TenController {
  constructor(private readonly tenService: TenService) {}

  @Post()
  create(@Body() createTenDto: CreateTenDto) {
    return this.tenService.create(createTenDto);
  }

  @Get()
  findAll() {
    return this.tenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenService.findOne(+id);
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
