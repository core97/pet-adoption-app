import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { UserRole } from '@user/model';
import { getSession } from '@shared/presentation/services/auth-service';
import { httpHandler } from '@shared/application/http/http-handler';
import { ERROR_CODE_TO_HTTP_STATUS } from '@shared/application/http/http-errors';
import { AppError } from '@shared/application/errors/app-error';
import { createLogger } from '@shared/application/logger';

interface ControllerOptions {
  roles?: UserRole[];
}

export const controller = (
  callback: (request: Request) => Promise<NextResponse>,
  options: ControllerOptions = {}
) => ({
  run: async (request: Request) => {
    const logger = createLogger({ method: request.method, url: request.url });

    logger.info('Starting request');

    request.context = {
      log: logger,
    };

    try {
      if (options.roles?.length) {
        const session = await getSession(request.headers.get('cookie') ?? '');
        const hasRole = options.roles.some(
          role => role === session?.user?.role
        );

        if (!session?.user) {
          return httpHandler.unauthorized('You are not logged in');
        }

        if (!hasRole) {
          return httpHandler.forbidden('You have no permissions');
        }

        request.context.user = {
          email: session.user.email as string,
          id: session.user.id as string,
          role: session.user.role as UserRole,
        };
      }

      const res = await callback(request);

      const cacheTags = new URL(request.url).searchParams.getAll('cacheTag');

      if (cacheTags.length) {
        cacheTags.forEach(tag => {
          revalidateTag(tag);
        });
      }

      logger.info('Request completed');

      return res;
    } catch (error) {
      logger.error(error);

      if (error instanceof AppError) {
        return httpHandler.jsonResponse(
          ERROR_CODE_TO_HTTP_STATUS[error.httpCode],
          { businessCode: error.businessCode, httpCode: error.httpCode }
        );
      }

      return httpHandler.fail();
    }
  },
});
