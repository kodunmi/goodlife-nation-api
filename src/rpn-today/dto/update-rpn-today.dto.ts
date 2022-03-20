import { PartialType } from '@nestjs/mapped-types';
import { CreateRpnTodayDto } from './create-rpn-today.dto';

export class UpdateRpnTodayDto extends PartialType(CreateRpnTodayDto) {}
