import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP } from './constant/';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(APP.PORT);
  } catch (error) {
    console.log('START', error);
  }
}
start();
