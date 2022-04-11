import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/auth/dto/login.dto';
import { comparePasswords } from 'src/shared/utils';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }
  async paginate(options: IPaginationOptions): Promise<Pagination<User>> {
    return paginate<User>(this.usersRepository, options);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // check if the user exists in the db

    const { phone, email } = createUserDto;
    const userPhoneInDb = await this.usersRepository.findOne({ where: { phone } });
    const userEmailInDb = await this.usersRepository.findOne({ where: { email } });
    if (userPhoneInDb) {
      throw new HttpException(`User with the phone number already exists`, HttpStatus.BAD_REQUEST);
    }

    if (userEmailInDb) {
      throw new HttpException(`User with the email already exists`, HttpStatus.BAD_REQUEST);
    }

    try {
     
      const entity = this.usersRepository.create({ ...createUserDto, otp: Math.floor(100000 + Math.random() * 900000) });

      const a = await this.usersRepository.save(entity);

      console.log(a);
      

      return a

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }



  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    try {
       return this.usersRepository.findOne(id, { relations: ['converts'] });
    } catch (error) {
      throw error
    }
   
  }

  findOneByPhoneNumber(phoneNumber: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        phone: phoneNumber,
      },
    });
  }

  async findByLogin({ phone, password }: LoginUserDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { phone } });

    if (!user) {
      throw new HttpException('No user with the phone number exist', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    if (!user.verified) {
      throw new HttpException('User not verified', HttpStatus.UNAUTHORIZED);
    }

    this.usersRepository.update(user.id, { lastLoginAt: new Date() });

    return user;
  }

  async findByEmail(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No user with the email exist', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = user.password == password;

    if (!areEqual) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // return this.usersRepository.update(id, updateUserDto);

    const entity = await this.usersRepository.findOne(id);

    return await this.usersRepository.save(Object.assign(entity, updateUserDto));

     
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }

  async getOtp(id: string): Promise<number> {
    return this.usersRepository.findOne(id).then(user => {
      return user.otp;
    });
  }

  async getPasswordResetCode(id: string): Promise<number> {
    return this.usersRepository.findOne(id).then(user => {
      return user.forgetPasswordOtp;
    });
  }
}
