/* eslint-disable prettier/prettier */
import { 
  // HttpAdapterHost, 
  NestFactory, 
  Reflector 
} from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
// import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform : true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(4000);
}
bootstrap();
