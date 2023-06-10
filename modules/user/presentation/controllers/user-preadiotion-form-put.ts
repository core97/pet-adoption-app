import { userPreadoptionUpsert } from '@user/application/user-preadoption-upsert';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const userPreadoptionFormPut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const user = await userPreadoptionUpsert({
      preadoptionForm: {
        formId: body.formId,
        responseId: body.responseId,
      },
      userId: req.context.user.id,
    });

    return httpHandler.ok(user);
  },
  { roles: ['USER', 'ADMIN'] }
);
