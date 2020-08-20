import {
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, catchError } from 'rxjs/operators';

/**
 * 请求拦截器
 * 1.可转换数据, 2.可记录调用日志
 */
@Injectable()
export class DataInterceptor extends Logger implements NestInterceptor {
  intercept(
    context,
    next,
  ) {
    const ignoreLog = [];
    const time = new Date();
    const logName = context.getClass().name + '.' + context.handler.name;
    const isIgnore = !ignoreLog.includes(logName);
    if (isIgnore) {
      this.log(
        'start calling at: ' + time.toLocaleTimeString() + '.' + time.getMilliseconds(),
        logName,
      );
    }

    return next.handle().pipe(
      map((data) => {
        if (isIgnore) {
          this.log(
            'called, consuming time: ' + (new Date().getTime() - time.getTime()) + 'ms',
            logName,
          );
        }
        // 成功时返回的数据，保持和异常过滤器 AllExceptionsFilter 返回的一致。
        return { data: data || {}, code: 200, message: 'SUCCESS' };
      }),
      catchError((err) => {
        throw err;
      }),
    );
  }
}
