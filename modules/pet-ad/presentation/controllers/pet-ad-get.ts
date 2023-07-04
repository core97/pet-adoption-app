import { petAdFinderById } from '@pet-ad/application/pet-ad-finder-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const petAdGet = controller(async req => {
  const petAdId = req.url.split('/').at(-1);

  if (!petAdId) {
    return httpHandler.invalidParams('Missing pet ad id');
  }

  const petAd = await petAdFinderById({
    id: petAdId,
    options: { requestingUser: req.context?.user?.id },
  });

  return httpHandler.ok(petAd);
});
