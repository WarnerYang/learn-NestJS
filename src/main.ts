import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService, ValidationPipe } from './@utils';
import { AllExceptionsFilter } from './@utils/exception/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter());
  // 注册全局类验证器
  app.useGlobalPipes(new ValidationPipe());
  const config = ConfigService.getInstance();
  const APPLICATION_PORT = config.get('APPLICATION_PORT');
  await app.listen(APPLICATION_PORT);
  Logger.log(`Your application is runing on http://localhost:${APPLICATION_PORT}`);
}
bootstrap();
