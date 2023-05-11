import { NextResponse } from 'next/server';
import { UserRole } from '@user/model';
import { getSession } from '@/modules/shared/presentation/services/auth-service';
import { httpHandler } from '@/modules/shared/application/http/http-handler';
import { ERROR_CODE_TO_HTTP_STATUS } from '@/modules/shared/application/http/http-errors';
import { AppError } from '@/modules/shared/application/errors/app-error';

interface ControllerOptions {
  roles?: UserRole[];
}

export const controller = (
  callback: (request: Request) => Promise<NextResponse>,
  options: ControllerOptions = {}
) => ({
  run: async (request: Request) => {
    console.log(`${request.method} ${request.url}`);

    request.context = {};
    
    try {
      if (options.roles?.length) {
        const session = await getSession(request.headers.get('cookie') ?? '');
        const hasRole = options.roles.some(role => role === session?.user?.role);

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
      return res;
    } catch (error) {
      console.error('*** ERRROR ***');
      console.error(error);

      if (error instanceof AppError) {
        return httpHandler.jsonResponse(ERROR_CODE_TO_HTTP_STATUS[error.code]);
      }

      return httpHandler.fail();
    }
  },
});
