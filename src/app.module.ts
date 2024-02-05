/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { IdolsModule } from './idols/idols.module';

@Module({
  imports: [
    PrismaModule, 
    UsersModule, 
    AuthModule,
    GroupsModule,
    IdolsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
