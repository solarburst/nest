import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtCookie = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.cookies?.['jwt'];
  },
);
