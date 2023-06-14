import { adoptionStepUpdaterById } from '@adoption-request/application/adoption-step-updater-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const adoptionStepsPut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const adoptionRequest = await adoptionStepUpdaterById({
      searchParam: { id: body.petAdRequestId },
      data: {
        adoptionStep: body.adoptionStep,
        userId: req.context.user.id,
      },
    });

    return httpHandler.ok(adoptionRequest);
  },
  { roles: ['USER', 'ADMIN'] }
);
