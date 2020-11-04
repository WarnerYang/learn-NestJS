import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

/**
 * 业务异常处理类
 *
 * @param errcode 错误码（错误码统一请从 ErrorCode 载入）
 * @param errmsg 错误信息
 *
 * @example
 * `throw new BusinessException(ErrorCode.PASSWORD_ERROR);`
 *
 */
export class BusinessException extends HttpException {
  constructor(errcode: ErrorCode, errmsg?: string) {
    errmsg = errmsg ? errmsg : ErrorCode[errcode];
    super({ errcode, errmsg }, HttpStatus.OK);
  }
}
