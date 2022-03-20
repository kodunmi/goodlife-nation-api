import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
  