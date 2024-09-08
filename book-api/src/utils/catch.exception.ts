import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const code =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const status = (exception['name'] as string) || 'ISE';

    if (code === HttpStatus.INTERNAL_SERVER_ERROR) {
      console.log(exception);
    }

    type ErrPayloadType = {
      code: number;
      status: string;
      message: string;
      path: string;
      errors?: any;
    };

    const errPayload: ErrPayloadType = {
      code: code,
      status,
      message,
      path: request.url,
    };

    if (exception instanceof BadRequestException) {
      errPayload.errors = exception['response']['errors'];
    }

    response.status(errPayload.code).json(errPayload);
  }
}
