import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IHttpExceptionResponse } from '../interfaces';
import { Error } from 'mongoose';

import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class MongoExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  catch(exception: ValidationError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const errors = exception.errors;
    const keys = Object.keys(errors);
    const messages = [];

    keys.forEach((entry) => {
      messages.push(errors[entry].message);
    });

    const jsonBody: IHttpExceptionResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: !messages ? 'Something went wrong' : messages[0],
      path: request.url,
      method: request.method,
      timeStamp: new Date(),
      stackTrace: exception.stack,
    };

    this.logger.error(jsonBody.message, { ...jsonBody });
    response.status(jsonBody.statusCode).json({ ...jsonBody });
  }
}
