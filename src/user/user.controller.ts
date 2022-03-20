import { SmsService } from './../sms/sms.service';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SimpleUserUpdateDto } from './dto/simple-user-update.dto';
import { AuthGuard } from '@nestjs/passport';

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

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

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
