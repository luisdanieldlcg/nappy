import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IHttpExceptionResponse } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage: string = exception.getResponse().toString();
    if (exception.getResponse() instanceof Object) {
      errorMessage =
        exception.getResponse()['message'] || 'Invalid field was sent';
    }
    const message = Array.isArray(errorMessage)
      ? errorMessage[0]
      : errorMessage || 'Internal server error';

    const jsonBody: IHttpExceptionResponse = {
      statusCode: status,
      message: message,
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
      stackTrace: exception.stack,
    };

    this.logger.error(message, { ...jsonBody });
    response.status(status).json(jsonBody);
  }
}
