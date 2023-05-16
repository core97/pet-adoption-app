import { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from '@user/model';
import { getSession } from '@shared/presentation/services/auth-service';
import { nextApiHttpHandler } from '@shared/application/http/next-api-http-handler';
import { ERROR_CODE_TO_HTTP_STATUS } from '@shared/application/http/http-errors';
import { AppError } from '@shared/application/errors/app-error';

interface ControllerOptions {
  roles?: UserRole[];
}

export const nextApiController = (
  callback: (
    request: NextApiRequest,
    response: NextApiResponse
  ) => Promise<NextApiResponse | void>,
  options: ControllerOptions = {}
) => ({
  run: async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(`${req.method} ${req.url}`);

    req.context = {};

    try {
      if (options.roles?.length) {
        const session = await getSession(req.headers.cookie ?? '');
        const hasRole = options.roles.some(
          role => role === session?.user?.role
        );

        if (!session?.user) {
          return nextApiHttpHandler.unauthorized(res, 'You are not logged in');
        }

        if (!hasRole) {
          return nextApiHttpHandler.forbidden(res, 'You have no permissions');
        }

        req.context.user = {
          email: session.user.email as string,
          id: session.user.id as string,
          role: session.user.role as UserRole,
        };
      }

      const resCallback = await callback(req, res);
      return resCallback;
    } catch (error) {
      console.error('*** ERRROR ***');
      console.error(error);

      if (error instanceof AppError) {
        return nextApiHttpHandler.jsonResponse(
          res,
          ERROR_CODE_TO_HTTP_STATUS[error.code]
        );
      }

      return nextApiHttpHandler.fail(res);
    }
  },
});
