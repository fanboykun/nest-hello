/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import groups from 'src/data/groups';
import Group from 'src/types/Group';
import members from 'src/data/members';

@Injectable()
export class GroupsService {
  create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto)
    return 'This action adds a new group';
  }

  findAll(name : string, isWithMember : boolean) {
    const g : Group[] = groups

    if(isWithMember === true ) { // bad practice, should convert to bool instead
      g.forEach((v) => {
        v.members = members.filter((m) => { return m.CurrentGroup === v.name })
      })
    }

    if( name == undefined || name == null || name.length == 0 ) {
      return g
    }

    const gf : Array<Group> | undefined = groups.filter((v) => { return v.name.toUpperCase().includes(name.toUpperCase()) })
    return gf

  }

  findOne(name : string) {
    const g = name
    if(!g) {
      throw new NotFoundException(`No group found for name: ${name}`);
    }

    const gf : Array<Group> | undefined = groups.filter((v) => { return g.toUpperCase() === v.name.toUpperCase() })
    return gf
  }

  findOneDetails(name : string) {
    const g = name

    const gf = groups.filter((v) => { return g.toUpperCase() === v.name.toUpperCase() })
    const group : Group = gf[0]
    if(!group) { 
      throw new NotFoundException(`No group found for name: ${group}`);
    }

    group.members = members.filter((v) => { return v.CurrentGroup === g })

    return new Array(group)
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    console.log(updateGroupDto)
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
