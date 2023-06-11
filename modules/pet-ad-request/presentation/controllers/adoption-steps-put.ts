import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { adoptionStepUpdaterById } from '@pet-ad-request/application/adoption-step-updater-by-id';

export const adoptionStepsPut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const petAdRequest = await adoptionStepUpdaterById({
      searchParam: { id: body.petAdRequestId },
      data: {
        adoptionStep: body.adoptionStep,
        userId: req.context.user.id,
      },
    });

    return httpHandler.ok(petAdRequest);
  },
  { roles: ['USER', 'ADMIN'] }
);
