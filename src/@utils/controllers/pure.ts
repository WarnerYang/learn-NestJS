import { UseInterceptors, Res } from '@nestjs/common';
import { DataInterceptor } from '../interceptors/data';

/**
 * 纯静 Controller 基类
 */
@UseInterceptors(DataInterceptor)
export class PureController {
  constructor(protected readonly service) { }
}
