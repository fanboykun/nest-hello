/* eslint-disable prettier/prettier */
import { 
  Controller,
  Get, 
  // Req,
  // Res, 
} from "@nestjs/common";
// import { Request, Response } from 'express';
import { AppService } from "./app.service";

// import Group from "./types/Group";
// import groups from "./data/groups";
// import members from "./data/members";
// import Members from "./types/Members";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  // @Get('/members/:name/group')
  // hMemberGroup(@Req() req: Request, @Res() res : Response): Response<any> {
  //   const m : string = req.params.name
  //   if(!m) { return res.send(404) }

  //   const mem = members.filter((v) => { return m.toUpperCase() === v.name.toUpperCase() })
  //   const member : Members = mem[0]
  //   if(!member) { return res.send(404) }

  //   member.groupInfo = groups.filter((g) => { return g.name === member.CurrentGroup })[0]

  //   return res.send(new Array(member))
  // }

}
