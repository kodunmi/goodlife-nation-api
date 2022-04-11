import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { RoyalChapter } from 'src/royal-chapter/entities/royal-chapter.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenDto } from './dto/create-ten.dto';
import { UpdateTenDto } from './dto/update-ten.dto';
import { Ten } from './entities/ten.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TenService {

  constructor(
    @InjectRepository(Ten) private tenRepository: Repository<Ten>,
    @InjectRepository(RoyalChapter) private royalChapterRepository: Repository<RoyalChapter>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) { }
  async create(createTenDto: CreateTenDto, chapterId: string): Promise<Ten> {
    try {

      const isNameTaken = await this.tenRepository.findOne({ where: { chapter: chapterId, name: createTenDto.name } });

      if (isNameTaken) {
        throw new HttpException('Ten already exist', HttpStatus.CONFLICT);
      }

      const isLeaderTaken = await this.tenRepository.findOne({ where: { leader: createTenDto.leaderId }, relations: ['leader'] });

      if (isLeaderTaken) {
        throw new HttpException(`${isLeaderTaken.leader.fullName} is already a leader at ${isLeaderTaken.name}`, HttpStatus.CONFLICT);
      }

      const isViceTaken = await this.tenRepository.findOne({ where: { vp: createTenDto.viceId }, relations: ['vp'] });

      if (isViceTaken) {
        throw new HttpException(`${isViceTaken.vp.fullName} is already a vice at ${isViceTaken.name}`, HttpStatus.CONFLICT);
      }

      const isVipTaken = await this.tenRepository.findOne({ where: { vip: createTenDto.vipId }, relations: ['vip'] });

      if (isVipTaken) {
        throw new HttpException(`${isVipTaken.vip.fullName} is already a vip at ${isVipTaken.name}`, HttpStatus.CONFLICT);
      }

      const isLeaderAlreadyInTen = await this.userRepository.findOne({ where: { id: createTenDto.leaderId, ten: !null } })

      if (isLeaderAlreadyInTen) {
        throw new HttpException(`${isLeaderAlreadyInTen.fullName} is already in another ten`, HttpStatus.CONFLICT);
      }



      const isViceAlreadyInTen = await this.userRepository.findOne({ where: { id: createTenDto.viceId, ten: !null } })

      if (isViceAlreadyInTen) {
        throw new HttpException(`${isViceAlreadyInTen} is already in another ten`, HttpStatus.CONFLICT);
      }


      const isVipAlreadyInTen = await this.userRepository.findOne({ where: { id: createTenDto.vipId, ten: !null } })

      if (isVipAlreadyInTen) {
        throw new HttpException(`${isVipAlreadyInTen} is already in another ten`, HttpStatus.CONFLICT);
      }

      let rc = await this.royalChapterRepository.findOne(chapterId);
      let leader = await this.userRepository.findOne(createTenDto.leaderId);
      let vice = await this.userRepository.findOne(createTenDto.viceId);
      let vip = await this.userRepository.findOne(createTenDto.vipId);

      let ten = new Ten()
      ten.name = createTenDto.name;
      ten.leader = leader;
      ten.vp = vice;
      ten.vip = vip;
      ten.chapter = rc;

      return await this.tenRepository.save(ten);

    } catch (error) {
      throw error
    }

  }

  async findAll(chapterId: string): Promise<Ten[]> {
    return await this.tenRepository.find({ where: { chapter: chapterId }, relations: ['leader', 'vp', 'vip', 'users'] });
  }

  async findOne(id: string, userId: string): Promise<Ten> {
    try {
      const ten = await this.tenRepository.findOne(id, {
        relations: ['chapter','chapter.bishop', 'leader', 'vp', 'vip']
      }) 
      console.log(ten);
      
      
      if (userId !== ten.leader.id && userId !== ten.vp.id && userId !== ten.vip.id && userId !== ten.chapter.bishop.id)
      throw new HttpException('Your are not authorized to view this ten', HttpStatus.UNAUTHORIZED);

      return ten;
    } catch (error) {
      throw error
    }
  }

  async getUsers(id: string, userId: string, options: IPaginationOptions): Promise<Pagination<User>>  {
    return paginate<User>(this.userRepository, options, {
      where: {
        tenId: id
      },
      relations: ['converts']
    });
  }

  update(id: number, updateTenDto: UpdateTenDto) {
    return `This action updates a #${id} ten`;
  }

  remove(id: number) {
    return `This action removes a #${id} ten`;
  }
}
