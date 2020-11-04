import { Module } from '@nestjs/common';
import { ChildProcessController } from './child-process.controller';
import { ChildProcessService } from './child-process.service';

@Module({
  providers: [ChildProcessService],
  controllers: [ChildProcessController],
  exports: [],
})
export class ChildProcessModule { }
