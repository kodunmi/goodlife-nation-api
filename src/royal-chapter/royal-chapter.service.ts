import { Ten } from './../ten/entities/ten.entity';
import { RoyalChapter } from './entities/royal-chapter.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoyalChapterDto } from './dto/create-royal-chapter.dto';
import { UpdateRoyalChapterDto } from './dto/update-royal-chapter.dto';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class RoyalChapterService {

  constructor(
    @InjectRepository(RoyalChapter) private rcRepository: Repository<RoyalChapter>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }

  create(createRoyalChapterDto: CreateRoyalChapterDto) {
    return 'This action adds a new royalChapter';
  }

  async findAll(): Promise<RoyalChapter[]> {
    return await this.rcRepository.find({relations: ['tens']});
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

  async getStat(id: string, userId: string): Promise<{ users: number, tens: number, converts: number }> {
    const rc = await this.rcRepository.findOne(id, { relations: ['users', 'users.converts', 'tens', 'bishop'] });

    if (!rc) throw new HttpException('no rc with the id', HttpStatus.NOT_FOUND)

    const isBishop = await this.rcRepository.findOne({ where: { bishop: userId } })

    if (!isBishop) throw new HttpException('you are not the bishop of this royal chapter', HttpStatus.FORBIDDEN)

    return {
      users: rc.users.length,
      tens: rc.tens.length,
      converts: rc.users.reduce((acc, cur) => acc + cur.converts.length, 0)
    }
  }

  async getAllUsers(id: string, userId: string, options: IPaginationOptions): Promise<Pagination<User>> {
    const rc = await this.rcRepository.findOne(id);

    if (!rc) throw new HttpException('no rc with the id', HttpStatus.NOT_FOUND)

    const isBishop = await this.rcRepository.findOne({ where: { bishop: userId } })

    if (!isBishop) throw new HttpException('you are not the bishop of this royal chapter', HttpStatus.FORBIDDEN)


    return paginate<User>(this.userRepository, options, {
      where: {
        chapterId: rc.id
      },
      relations: ['converts']
    });
  }
}
