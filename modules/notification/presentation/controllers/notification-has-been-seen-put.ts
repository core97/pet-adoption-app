import { controller } from '@shared/application/controller';
import { httpHandler } from '@shared/application/http/http-handler';
import { notificationUpdaterHasBeenSeen } from '@notification/application/notification-updater-has-been-seen';

export const notificationHasBeenSeenPut = controller(
  async req => {
    const notificationId = req.url.split('/').at(-1);

    if (!req.context.user?.id) {
      return httpHandler.unauthorized();
    }

    if (!notificationId) {
      return httpHandler.invalidParams();
    }

    const notification = await notificationUpdaterHasBeenSeen({
      searchParam: {
        id: notificationId,
      },
      data: {
        updaterUserId: req.context.user.id,
      },
    });

    return httpHandler.ok(notification);
  },
  { roles: ['USER', 'ADMIN'] }
);
