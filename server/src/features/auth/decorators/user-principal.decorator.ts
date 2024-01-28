import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUserPrincipal = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const req = http.getRequest<Request>();
    return {
      ...req.user,
    };
  },
);
