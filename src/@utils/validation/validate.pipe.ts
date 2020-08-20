import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BusinessException, ErrorCode } from '..';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      errors.map(e => {
        Object.keys(e.constraints).map(key => {
          throw new BusinessException(ErrorCode.PARAMETER_ERROR, e.constraints[key]);
        });
      });
    }
    return value;
  }

  // tslint:disable-next-line: ban-types
  private toValidate(metatype: Function): boolean {
    // tslint:disable-next-line: ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
