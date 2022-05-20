import { IsString,IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsString()
    videoUrl: string;

    @IsNotEmpty()
    @IsString()
    date: Date;

    @IsNotEmpty()
    @IsString()
    tag: 'NCR'|'7DOA'|'TGP'|'PEM';
}
