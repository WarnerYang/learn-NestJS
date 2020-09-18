import { Controller, Get } from '@nestjs/common';
import { PureController } from 'src/@utils';
import { ChildProcessService } from './child-process.service';

@Controller('child-process')
export class ChildProcessController extends PureController {
  constructor(protected readonly service: ChildProcessService) {
    super(service);
  }

  @Get()
  index() {
    return this.service.createChildProcess();
  }
  
}
