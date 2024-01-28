import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { cwd } from 'process';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exceptions/filters/http-exception.filter';
import { MongoExceptionFilter } from './common/exceptions/filters/mongo-exception.filter';
import fs from 'fs-extra';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // I want to remove all the files in the public/images folder
  // when the server starts.
  fs.emptyDirSync(join(cwd(), 'public/images'));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.use(morgan('dev'));
  app.useStaticAssets(join(cwd(), 'public'));
  const configService = app.get(ConfigService);
  const port = configService.get('SERVER_PORT') || 3001;
  await app.listen(port);
}

bootstrap();
