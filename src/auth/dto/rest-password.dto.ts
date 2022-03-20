import { IsNotEmpty, IsNumber } from 'class-validator';
export class ResetPasswordDto {
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    confirmPassword: string;

    @IsNotEmpty()
    @IsNumber()
    otp: number
}