import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './application/example/example.module';
import { ConfigModule } from './@utils';

@Module({
  imports: [
    ConfigModule,
    ExampleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
