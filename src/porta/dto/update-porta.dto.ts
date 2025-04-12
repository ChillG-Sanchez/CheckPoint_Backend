import { PartialType } from '@nestjs/mapped-types';
import { CreatePortaDto } from './create-porta.dto';

export class UpdatePortaDto extends PartialType(CreatePortaDto) {}