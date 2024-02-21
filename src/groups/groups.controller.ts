/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards,
  Query,
  Req,
 } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { GetGroupDto } from './dto/get-group.dto';
import { Request } from 'express';
import { UserEntity } from 'src/users/entities/user.entity';
// import { User } from '@prisma/client';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() { name, members } : GetGroupDto ) {
    return this.groupsService.findAll( name, members );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Query() { members } : GetGroupDto) {
    const numId = +id
    return this.groupsService.findOne( numId, id, members );
  }

  @Get(':id/members')
  @UseGuards(JwtAuthGuard)
  findOneDetails(@Param('id') id: string, @Req() req: Request) {
    const user = new UserEntity(req.user)
    console.log(user)
    return this.groupsService.findOne(+id, '', true);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
