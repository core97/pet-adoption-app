import { NextResponse } from 'next/server';
import { HttpStatus } from '@shared/application/http-status';

export const httpHandler = {
  jsonResponse(code: HttpStatus, message?: string) {
    if (message) {
      return new NextResponse(JSON.stringify({ message }), { status: code });
    }

    return new NextResponse(null, { status: code });
  },

  ok<T>(dto?: T) {
    if (dto) {
      return new NextResponse(JSON.stringify(dto), { status: HttpStatus.OK });
    }

    return new NextResponse(null, { status: HttpStatus.OK });
  },

  created() {
    return new NextResponse(null, { status: HttpStatus.CREATED });
  },

  clientError(message?: string) {
    return this.jsonResponse(HttpStatus.BAD_REQUEST, message);
  },

  unauthorized(message?: string) {
    return this.jsonResponse(HttpStatus.UNAUTHORIZATED, message);
  },

  forbidden(message?: string) {
    return this.jsonResponse(HttpStatus.FORBIDDEN, message);
  },

  notFound(message?: string) {
    return this.jsonResponse(HttpStatus.NOT_FOUND, message);
  },

  conflict(message?: string) {
    return this.jsonResponse(HttpStatus.CONFLICT, message);
  },

  invalidParams(message?: string) {
    return this.jsonResponse(HttpStatus.UNPROCESSABLE_ENTITY, message);
  },

  contentTooLarge(message?: string) {
    return this.jsonResponse(HttpStatus.CONTENT_TOO_LARGE, message);
  },

  fail(error?: Error | string) {
    return new NextResponse(
      error ? JSON.stringify({ message: error?.toString() }) : null,
      { status: HttpStatus.INTERNAL_ERROR }
    );
  },
};
