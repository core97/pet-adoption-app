import { NextApiResponse } from 'next';
import { HttpStatus } from '@shared/application/http/http-status';

export const nextApiHttpHandler = {
  jsonResponse(
    res: NextApiResponse,
    code: HttpStatus,
    message?: string | Record<string, unknown>
  ) {
    if (message) {
      return res
        .status(code)
        .json(typeof message === 'string' ? { message } : message);
    }

    return res.status(code).end();
  },

  ok<T>(res: NextApiResponse, dto?: T) {
    if (dto) {
      return res.status(HttpStatus.OK).json(dto);
    }

    return res.status(HttpStatus.OK).end();
  },

  created(res: NextApiResponse) {
    return res.status(HttpStatus.CREATED).end();
  },

  clientError(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.BAD_REQUEST, message);
  },

  unauthorized(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNAUTHORIZATED, message);
  },

  forbidden(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.FORBIDDEN, message);
  },

  notFound(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.NOT_FOUND, message);
  },

  conflict(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.CONFLICT, message);
  },

  invalidParams(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.UNPROCESSABLE_ENTITY, message);
  },

  notAcceptable(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.NOT_ACCEPTABLE, message);
  },

  contentTooLarge(res: NextApiResponse, message?: string) {
    return this.jsonResponse(res, HttpStatus.CONTENT_TOO_LARGE, message);
  },

  fail(res: NextApiResponse, error?: Error | string) {
    return res.status(HttpStatus.INTERNAL_ERROR).json({
      ...(error && { message: error.toString() }),
    });
  },
};
