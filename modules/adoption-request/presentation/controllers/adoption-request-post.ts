import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { adoptionRequestCreator } from '@adoption-request/application/adoption-request-creator';

export const adoptionRequestPost = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const adoptionRequest = await adoptionRequestCreator({
      ...body,
      userId: req.context.user.id,
    });

    return httpHandler.ok(adoptionRequest);
  },
  { roles: ['USER', 'ADMIN'] }
);
