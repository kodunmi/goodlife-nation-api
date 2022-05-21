import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageRepository.create(createMessageDto);
  }

  findAll({options, search, tag}:{ options: IPaginationOptions, search: string, tag: 'ALL' | 'NCR' | '7DOA' | 'PEM' | 'TGP'}):Promise<Pagination<Message>>{
    if(tag === 'ALL'){
      return paginate<Message>(this.messageRepository, options);
    }else{
      return paginate<Message>(this.messageRepository, options,{
        where: { 
          tag: tag
        }
      });
    }
   
  }

  findOne(id: string): Promise<Message> {
    return this.messageRepository.findOne(id);
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return this.messageRepository.update(id, updateMessageDto);
  }

  remove(id: number) {
    return this.messageRepository.delete(id);
  }
}
