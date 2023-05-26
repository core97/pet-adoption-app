import { userAddressUpsert } from '@user/application/user-address-upsert';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const userAddressPut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.email) {
      return httpHandler.unauthorized();
    }

    const user = await userAddressUpsert({
      email: req.context.user.email,
      address: body,
    });

    return httpHandler.ok(user);
  },
  { roles: ['USER', 'ADMIN'] }
);
