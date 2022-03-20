import { IsNotEmpty } from 'class-validator';
export class CreateConvertDto {
    @IsNotEmpty()
    firstName:string

    @IsNotEmpty()
    lastName:string

    @IsNotEmpty()
    gender: 'male'|'female'

    @IsNotEmpty()
    location?:string

    occupation?:string

    @IsNotEmpty()
    phone:string
    dob?:string

    @IsNotEmpty()
    userId: string
}
