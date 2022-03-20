import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsEmpty, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty() 
    @ApiProperty()
    fullName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    tenId: string;

    @IsNotEmpty()
    chapterId: string;

    // @IsNotEmpty()
    // address: string;

    // @IsNotEmpty()
    // city: string;

    // @IsNotEmpty()
    // state: string;

    // @IsNotEmpty()
    // country: string;

    // @IsNotEmpty()
    // username: string
}
