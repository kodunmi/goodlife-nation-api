import { PartialType } from '@nestjs/mapped-types';
import { CreateTenDto } from './create-ten.dto';

export class UpdateTenDto extends PartialType(CreateTenDto) {}
