import { Module } from '@nestjs/common';
import { ConfigModule } from './@utils';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './application/example/example.module';
import { ChildProcessModule } from './application/child-process/child-process.module';

@Module({
  imports: [
    ConfigModule,
    ExampleModule,
    ChildProcessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
