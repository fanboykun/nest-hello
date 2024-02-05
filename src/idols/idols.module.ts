import { Module } from '@nestjs/common';
import { IdolsService } from './idols.service';
import { IdolsController } from './idols.controller';

@Module({
  controllers: [IdolsController],
  providers: [IdolsService]
})
export class IdolsModule {}
