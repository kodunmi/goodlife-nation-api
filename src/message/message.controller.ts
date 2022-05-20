import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { BaseResponse } from 'src/base-response.interface';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get('get-all')
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number = 2,
    @Query('search') search: string = undefined,
    @Query('tag') tag: 'ALL' | 'NCR' | '7DOA' | 'PEM' | 'TGP' = 'ALL'

  ): Promise<BaseResponse<Pagination<any>>> {
    console.log(tag);
    
    return {
      data: await this.messageService.findAll({
        search: search ,
        tag: tag,
        options:
         {
          page,
          limit
        }
      }
       
      ),
      status: 'success',
    }
    // return this.messageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
