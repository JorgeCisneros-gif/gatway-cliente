import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {

    const request = ctx.switchToHttp().getRequest();

    if (!request.token) {
     throw new InternalServerErrorException('token not found in request (AuthGuard call?)');
    }

    return request.token;
  },
);
