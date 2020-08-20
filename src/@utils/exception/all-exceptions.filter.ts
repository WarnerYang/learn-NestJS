import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

/**
 * 全局异常过滤器。捕获所有异常，包含系统异常和业务异常
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        // const request = ctx.getRequest();

        let status: number;
        let message: string;
        let code: number;
        if (exception instanceof HttpException) {
            status = exception.getStatus() || exception['message']['statusCode'];
            message = exception['response']['errmsg'] || exception['response']['message'] || 'undefind error';
            code = exception['response']['errcode'] || exception['response']['statusCode'];
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal Server Error';
            code = HttpStatus.INTERNAL_SERVER_ERROR;
            console.log('AllExceptionsFilter catch ==============', exception);
        }

        response.status(status).json({
            data: {},
            code,
            message,
        });
    }
}
