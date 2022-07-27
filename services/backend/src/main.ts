import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { Options } from '@nestjs/common';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);
  
  
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.enableCors({
    origin: ['http://localhost:3500', 'http://localhost'],
    credentials: true,
  });
  await app.listen(3500);
}
bootstrap();
