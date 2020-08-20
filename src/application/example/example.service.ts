import { Injectable } from '@nestjs/common';
import { BusinessException, ErrorCode } from '../../@utils';
import { ExampleDto } from './example.dto';

@Injectable()
export class ExampleService {

  index() {
    return 'this is example';
  }

  throwError() {
    throw new BusinessException(ErrorCode.DATA_QUERY_FAILED);
  }

  validate(data: ExampleDto) {
    return data;
  }
}
