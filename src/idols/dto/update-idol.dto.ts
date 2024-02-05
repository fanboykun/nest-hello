import { PartialType } from '@nestjs/mapped-types';
import { CreateIdolDto } from './create-idol.dto';

export class UpdateIdolDto extends PartialType(CreateIdolDto) {}
