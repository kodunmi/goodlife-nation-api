import { SmsService } from './../sms/sms.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SimpleUserUpdateDto } from './dto/simple-user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  // @Post('/register')
  // async create(@Body() createUserDto: CreateUserDto) {

  //   try {
  //     const user = await this.userService.create(createUserDto);
  //     // send otp
  //     let resp = await this.smsService.sendSMS(user.phone, 'Your verification code is: ' + this.userService.getOtp(user.id));
  //     console.log(resp);


  //   } catch (error) {
  //     console.log(error);
  //   }




  //   return {
  //     success: true,
  //     message: 'User created successfully',
  //   };

  // }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10
  ): Promise<Pagination<User>> {
    return this.userService.paginate({
      page,
      limit,
      route: 'http://cats.com/cats',
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  @Patch('update-profile')
  @UseGuards(AuthGuard())
  update(@Body() updateUserDto: SimpleUserUpdateDto, @Req() req: any) {    
    return this.userService.update(req.user.id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
