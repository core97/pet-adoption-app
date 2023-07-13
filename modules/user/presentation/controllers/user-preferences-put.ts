import { userPreferencesUpdaterById } from '@user/application/user-preferences-updater-by-id';
import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';

export const userPreferencePut = controller(
  async req => {
    const body = await req.json();

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    const user = await userPreferencesUpdaterById({
      searchParam: { id: req.context.user.id },
      data: { searchCountry: body.searchCountry },
    });

    return httpHandler.ok(user);
  },
  { roles: ['USER', 'ADMIN'] }
);
