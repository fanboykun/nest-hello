/* eslint-disable prettier/prettier */
import { GROUP_TYPE } from "@prisma/client";
import { IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateGroupDto {
    @IsString()
    name: string;
  
    @IsOptional()
    @IsString()
    type: GROUP_TYPE;

    @IsOptional()
    @IsString()
    debutYear: string;

    @IsOptional()
    @IsNumber()
    memberCOunt: number;

    @IsOptional()
    @IsNumber()
    agency_id: number;

    @IsOptional()
    @IsString()
    @IsUrl()
    profile_link: string;

}
