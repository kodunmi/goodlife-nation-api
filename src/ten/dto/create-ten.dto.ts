import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTenDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    leaderId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    viceId: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    vipId: string
}
