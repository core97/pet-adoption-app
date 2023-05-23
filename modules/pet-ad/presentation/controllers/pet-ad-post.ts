import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { petAdCreator } from '@pet-ad/application/pet-ad-creator';

export const petAdPost = controller(
  async req => {
    const body = await req.json();

    const petAd = await petAdCreator(body);

    return httpHandler.ok(petAd);
  },
  { roles: ['USER', 'ADMIN'] }
);
