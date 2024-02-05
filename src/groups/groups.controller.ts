/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  // Req,
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  UseGuards,
  Query,
 } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { GetGroupDto } from './dto/get-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() { name, members } : GetGroupDto ) {
    return this.groupsService.findAll(
      name, 
      members
      );
  }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('name') name: string) {
    return this.groupsService.findOne(name);
  }

  @Get(':name/members')
  @UseGuards(JwtAuthGuard)
  findOneDetails(@Param('name') name: string) {
    return this.groupsService.findOneDetails(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
