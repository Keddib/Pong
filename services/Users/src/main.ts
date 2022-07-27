import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { Options } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule);

  app.use(
    session({
      secret: "some secret is here but i don't see it yet",
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60 * 60000 },
    }),
  );
  // Init passport authentication
  app.use(passport.initialize());

  // persistent login sessions
  app.use(passport.session());

  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.enableCors({
    origin: [
      'http://localhost:3500',
      'http://localhost',
      'http://localhost:8000',
      'http://localhost:3001',
    ],
    credentials: true,
  });

  await app.listen(3500);
}
bootstrap();
