import { Injectable } from '@nestjs/common';
import { BusinessException, ErrorCode, ConfigService } from '../../@utils';
import { ExampleDto } from './example.dto';

@Injectable()
export class ExampleService {
  private readonly APPLICATION_PORT: string;
  constructor(
    private readonly config: ConfigService,
  ) {
    this.APPLICATION_PORT = this.config.get('APPLICATION_PORT');
  }

  index() {
    return `this is example, application port is ${this.APPLICATION_PORT}`;
  }

  throwError() {
    throw new BusinessException(ErrorCode.DATA_QUERY_FAILED);
  }

  validate(data: ExampleDto) {
    return data;
  }
}
