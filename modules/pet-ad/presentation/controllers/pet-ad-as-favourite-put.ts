import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { petAdUpdaterAsFavourite } from '@pet-ad/application/pet-ad-updater-as-favourite';

export const petAdAsFavouritePut = controller(
  async req => {
    const petAdId = req.url.split('/').at(-1);

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    if (!petAdId) {
      return httpHandler.invalidParams();
    }

    const petAd = await petAdUpdaterAsFavourite({
      data: { requestingUser: req.context.user.id },
      searchParam: { id: petAdId },
    });

    return httpHandler.ok(petAd);
  },
  { roles: ['USER', 'ADMIN'] }
);
