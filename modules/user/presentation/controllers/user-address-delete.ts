import { userAddressDeleter } from '@user/application/user-address-deleter';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const userAddressDelete = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.email) {
      return httpHandler.unauthorized();
    }

    const user = await userAddressDeleter({
      email: req.context.user.email,
      placeId: body.placeId,
    });

    return httpHandler.ok(user);
  },
  { roles: ['USER', 'ADMIN'] }
);
