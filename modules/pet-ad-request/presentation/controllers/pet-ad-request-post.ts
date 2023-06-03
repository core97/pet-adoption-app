import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { petAdRequestCreator } from '@pet-ad-request/application/pet-ad-request-creator';

export const petAdRequestPost = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const petAdRequest = await petAdRequestCreator({
      ...body,
      userId: req.context.user.id,
    });

    return httpHandler.ok(petAdRequest);
  },
  { roles: ['USER', 'ADMIN'] }
);
