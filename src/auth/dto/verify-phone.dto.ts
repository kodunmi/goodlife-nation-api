import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class VerifyPhoneDto {
    @IsString()
    @IsNotEmpty()
     phone: string;

     @IsNumber()
     @IsNotEmpty()
     otp: number;
}