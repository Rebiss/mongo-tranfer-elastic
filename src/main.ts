import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './other/constant';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix(APP.PREFIX);

    await app.listen(APP.PORT);
  } catch (error) {
    console.error('START', error);
  }
}

start();
