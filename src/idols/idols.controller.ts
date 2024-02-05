/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IdolsService } from './idols.service';
import { CreateIdolDto } from './dto/create-idol.dto';
import { UpdateIdolDto } from './dto/update-idol.dto';
import { JwtAuthGuard } from "../auth/jwt-auth-guard";

@Controller('idols')
export class IdolsController {
  constructor(private readonly idolsService: IdolsService) {}

  @Post()
  create(@Body() createIdolDto: CreateIdolDto) {
    return this.idolsService.create(createIdolDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query('name') q : string) {
    return this.idolsService.findAll(q);
  }

  @Get(':name')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('name') name: string) {
    return this.idolsService.findOne(name);
  }

  @Get(':name/group')
  @UseGuards(JwtAuthGuard)
  findOneDetail(@Param('name') name: string) {
    return this.idolsService.findOneDetail(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIdolDto: UpdateIdolDto) {
    return this.idolsService.update(+id, updateIdolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.idolsService.remove(+id);
  }
}
