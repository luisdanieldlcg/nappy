import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const TokenInput = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    return {
      ...request.user,
    };
  },
);
