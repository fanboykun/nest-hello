/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}
  
  create(createGroupDto: CreateGroupDto) {
    console.log(createGroupDto)
    return 'This action adds a new group';
  }

  async findAll(name : string, isWithMember : boolean) {
    const query = {
      take: 30,
      where: {},
      include: {}
    }
    
    if( isWithMember === true ) {
      query.include = {
        idols: true
      }
    }

    if( name != undefined ) {
      query.where = {
        OR: [
          {
            name: { startsWith: `_${name}` },
          },
          {
            name: { endsWith: `${name}` },
          }
        ]
      }
    }
    const data = await this.prisma.group.findMany(query)
    return data;
  }

  async findOne(numId: number, id:string, isWithMember: boolean = false) {
    if(!id && isNaN(numId)) {
      throw new NotFoundException(`No group found: ${id}`);
    }
    const query = {
      where: {},
      include: {}
    }
    if( isWithMember === true ) {
      query.include = {
        idols: true
      }
    }else {
      delete query.include;  // delete query.include;
    }
    try {
      if(!isNaN(numId)) {
        query.where = { id: numId }
        const dataFromId = await this.prisma.group.findFirst(query)
        return dataFromId
      }else if(isNaN(numId) && id != '') {
        query.where = {
          OR: [
            {
              name: { startsWith: `_${id}` },
            },
            {
              name: { endsWith: `${id}` },
            }
          ]
        }
        const dataFromName = await this.prisma.group.findFirst(query)
        return dataFromName
      }
    } catch(err) {
      console.log(err)
    }
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    console.log(updateGroupDto)
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
