/* eslint-disable prettier/prettier */

import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class GetGroupDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Transform((val: string) => val === 'true')
  members: boolean;
}
