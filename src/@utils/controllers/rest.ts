import { Get, Post, Put, Delete, Param, Query, Body } from '@nestjs/common';
import { PureController } from './pure';

/**
 * Controller 基类
 * 基于 restful 标准的路由规则
 */
export class RestController extends PureController {

  @Get()
  findAll(@Query() query) {
    return this.service.findAll(query);
  }

  @Post()
  create(@Body() body) {
    return this.service.create(body);
  }

  @Get(':id')
  findOne(@Param() param) {
    return this.service.findOne(param.id);
  }

  @Put(':id')
  update(@Param() param, @Body() body) {
    return this.service.update(param.id, body);
  }

  @Delete(':id')
  delete(@Param() param) {
    return this.service.delete(param.id);
  }
}
