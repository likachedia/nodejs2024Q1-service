import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {SwaggerModule , OpenAPIObject,} from '@nestjs/swagger';
import {readFile} from 'fs/promises';
import { config } from'dotenv';
import { load } from 'js-yaml';
import { dirname, join } from 'path';

config();
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  const path = join(dirname(__dirname), "doc", "api.yaml");
  const api = load(
   await readFile(path, 'utf8'),
  ) as OpenAPIObject;

  SwaggerModule.setup('doc', app, api);
  await app.listen(port);
}
bootstrap();
