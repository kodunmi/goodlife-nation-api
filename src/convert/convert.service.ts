import { Convert } from './entities/convert.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateConvertDto } from './dto/create-convert.dto';
import { UpdateConvertDto } from './dto/update-convert.dto';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ConvertService {

  constructor(
    @InjectRepository(Convert)
    private convertRepository: Repository<Convert>,
    private readonly usersService: UserService,
  ) { }

  async create(createConvertDto: CreateConvertDto): Promise<Convert> {

    try {
  
      const convertObj = this.convertRepository.create({...createConvertDto, user: await this.usersService.findOne(createConvertDto.userId as unknown as number)});
      
       return await this.convertRepository.save(convertObj);

    } catch (error) {
      throw new HttpException(error,HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  findAll() {
    return `This action returns all convert`;
  }

  findOne(id: number) {
    return `This action returns a #${id} convert`;
  }

  update(id: number, updateConvertDto: UpdateConvertDto) {
    return `This action updates a #${id} convert`;
  }

  remove(id: number) {
    return `This action removes a #${id} convert`;
  }
}
