/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';

import members from 'src/data/members';
import Members from 'src/types/Members';
import groups from 'src/data/groups';

@Injectable()
export class IdolsService {
  create(createIdolDto: CreateIdolDto) {
    console.log(createIdolDto)
    return 'This action adds a new idol';
  }

  findAll(q : string) {
    if(q === '' || q == undefined) {
      return members
    } 
    const mf = members.filter((m) => { return m.name.toLowerCase().includes(q.toLowerCase()) })
    return mf
  }

  findOne(name: string) {
    const mem : Array<Members> | undefined = members.filter((v) => { return name.toLocaleLowerCase() == v.name.toLowerCase() })
    return mem
  }

  findOneDetail(name: string) {
    const mem : Array<Members> | undefined = members.filter((v) => { return name.toLocaleLowerCase() == v.name.toLowerCase() })
    if(!mem) { 
      throw new NotFoundException(`No idol found for name: ${name}`);
    }
    const member = mem[0]

    groups.forEach((g) => { 
      if(typeof member.CurrentGroup == 'string') {
        if(g.name.toLowerCase() == member.CurrentGroup.toLowerCase()) {
          return member.CurrentGroup = g
        }
      }else {
        if(g == member.CurrentGroup) {
          return member.CurrentGroup = g
        }
      }
    })

    return member
  }

  update(id: number, updateIdolDto: UpdateIdolDto) {
    console.log(updateIdolDto)
    return `This action updates a #${id} idol`;
  }

  remove(id: number) {
    return `This action removes a #${id} idol`;
  }
}
