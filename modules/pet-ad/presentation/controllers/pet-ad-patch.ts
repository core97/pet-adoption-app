import { petAdUpdaterById } from '@pet-ad/application/pet-ad-updater-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const petAdPatch = controller(
  async req => {
    const body = await req.json();

    const petAd = await petAdUpdaterById({
      data: body.data,
      searchParam: body.searchParam,
    });

    return httpHandler.ok(petAd);
  },
  { roles: ['USER', 'ADMIN'] }
);
