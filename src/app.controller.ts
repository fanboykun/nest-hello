/* eslint-disable prettier/prettier */
import { Controller, Get, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
import { AppService } from "./app.service";

import Group from "./types/Group";
import groups from "./data/groups";
import members from "./data/members";
import Members from "./types/Members";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/groups')
  hGroups(@Req() req: Request, @Res() res : Response): Response<any> {
    const q = req.query.name ?? ''
    const isWithMember = req.query.members ?? 'false'

    const g : Group[] = groups

    if(isWithMember === 'true' ) { // bad practice, should convert to bool instead
      g.forEach((v) => {
        v.members = members.filter((m) => { return m.CurrentGroup === v.name })
      })
    }

    if(q == null || q.length == 0) {
      return res.send(g)
    }

    const gf : Array<Group> | undefined = groups.filter((v) => { return q === v.name.toUpperCase() })
    if(gf.length == 0) { return res.send(404) }
    return res.json(gf)
  }

  @Get('/groups/:name')
  hGroup(@Req() req: Request, @Res() res : Response): Response<any> {
    const g : string = req.params.name
    if(!g) { return res.send(404) }

    const gf : Array<Group> | undefined = groups.filter((v) => { return g.toUpperCase() === v.name.toUpperCase() })
    return res.send(gf)
  }

  @Get('/groups/:name/members')
  hGroupMembers(@Req() req: Request, @Res() res : Response): Response<Group[]> {
    const g : string = req.params.name
    if(!g) { return res.send(404) }

    const gf = groups.filter((v) => { return g.toUpperCase() === v.name.toUpperCase() })
    const group : Group = gf[0]
    if(!group) { return res.send(404) }

    group.members = members.filter((v) => { return v.CurrentGroup === g })

    return res.send(new Array(group))
  }

  @Get('/members')
  hMembers(@Req() req: Request, @Res() res : Response): Response<any> {
    return res.send(members)
  }

  @Get('/members/:name')
  hMember(@Req() req: Request, @Res() res : Response): Response<any> {
    const m : string = req.params.name
    if(!m) { return res.send(404) }

    const mem : Array<Members> | undefined = members.filter((v) => { return m.toUpperCase() === v.name.toUpperCase() })
    return res.send(mem)
  }

  @Get('/members/:name/group')
  hMemberGroup(@Req() req: Request, @Res() res : Response): Response<any> {
    const m : string = req.params.name
    if(!m) { return res.send(404) }

    const mem = members.filter((v) => { return m.toUpperCase() === v.name.toUpperCase() })
    const member : Members = mem[0]
    if(!member) { return res.send(404) }

    member.groupInfo = groups.filter((g) => { return g.name === member.CurrentGroup })[0]

    return res.send(new Array(member))
  }

}
