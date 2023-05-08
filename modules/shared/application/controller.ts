import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { UserRole, isValidRole, isValidEmail } from '@user/model';
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
    try {
      if (options.roles?.length) {
        const session = await getServerSession(authOptions);

        if (!session) {
          return httpHandler.unauthorized('You are not logged in');
        }

        const hasRole =
          session.user &&
          'role' in session.user &&
          isValidRole(session.user.role) &&
          options.roles.includes(session.user.role);

        if (!hasRole) {
          return httpHandler.forbidden('You have no permissions');
        }

        if (
          session.user &&
          isValidEmail(session.user?.email) &&
          'id' in session.user &&
          typeof session.user.id === 'string' &&
          'role' in session.user &&
          isValidRole(session.user.role)
        ) {
          request.context.user = {
            email: session.user.email,
            id: session.user.id,
            role: session.user.role,
          };
        } else {
          return httpHandler.fail('Authentication data is invalid');
        }
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
