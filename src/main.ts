import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Engedélyezzük a JSON törzsek feldolgozását
  app.use(bodyParser.json());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Csak a DTO-ban definiált mezőket engedélyezi
      forbidNonWhitelisted: true, // Hibát dob, ha nem definiált mező érkezik
      transform: true, // Automatikusan átalakítja a bejövő adatokat a DTO típusára
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  // Middleware a beérkező kérések logolásához
  app.use((req, res, next) => {
    console.log('Incoming Request:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
    });
    next();
  });
  
  await app.listen(3000);
}
bootstrap();