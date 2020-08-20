import { Controller, Get, Post, Body, UseInterceptors } from '@nestjs/common';
import { PureController } from '../../@utils';
import { ExampleService } from './example.service';
import { ExampleDto } from './example.dto';

@Controller('example')
export class ExampleController extends PureController {
  constructor(protected readonly service: ExampleService) {
    super(service);
  }

  @Get()
  index() {
    return this.service.index();
  }

  /**
   * 抛出业务异常示例：
   * 失败响应直接抛出业务异常 `throw new BusinessException(ErrorCode.DATA_DELETE_FAILED);`
   * 有关事务的处理，请手动捕获异常 `try catch`, 再抛出 `BusinessException` 统一响应。
   * 你可以在任何你想抛出异常的地方抛出，当然一般是在 service 层
   * 1. 直接 throw new BusinessException(ErrorCode.DATA_DELETE_FAILED)
   */
  @Get('throwError')
  throwError() {
    return this.service.throwError();
  }

  /**
   * 验证前端参数示例：
   * 由全局验证器 `src\@nt\validation\validate.pipe.ts` 接管，抛出首个参数的异常。
   * 1. 编写 dto，加上类型装饰器即可
   */
  @Get('validate')
  validate(@Body() exampleDto: ExampleDto) {
    return this.service.validate(exampleDto);
  }

}
