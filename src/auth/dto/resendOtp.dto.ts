import { IsNotEmpty } from "class-validator";

export class ResendOtpDto {
    @IsNotEmpty()
    phone:string
}