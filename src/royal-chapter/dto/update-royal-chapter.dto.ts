import { PartialType } from '@nestjs/mapped-types';
import { CreateRoyalChapterDto } from './create-royal-chapter.dto';

export class UpdateRoyalChapterDto extends PartialType(CreateRoyalChapterDto) {}
