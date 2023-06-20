import { adoptionStatusUpdaterById } from '@adoption-request/application/adoption-status-updater-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const adoptionStatusPut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const adoptionRequest = await adoptionStatusUpdaterById({
      searchParam: { id: body.petAdRequestId },
      data: {
        status: body.status,
        updaterUserId: req.context.user.id,
      },
    });

    return httpHandler.ok(adoptionRequest);
  },
  { roles: ['USER', 'ADMIN'] }
);
