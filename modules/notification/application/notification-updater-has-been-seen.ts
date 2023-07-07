import { Notfication } from '@notification/model';
import prisma from '@shared/application/prisma';
import { ForbiddenError } from '@shared/application/errors/forbidden.error';

export interface NotificationUpdaterHasBeenSeen {
  (params: {
    searchParam: Pick<Notfication, 'id'>;
    data: { updaterUserId: string };
  }): Promise<Notfication>;
}

export const notificationUpdaterHasBeenSeen: NotificationUpdaterHasBeenSeen =
  async ({ data, searchParam }) => {
    try {
      const oldNotification = await prisma.notification.findUniqueOrThrow({
        where: { id: searchParam.id },
      });

      if (oldNotification.userIdToNotify !== data.updaterUserId) {
        throw new ForbiddenError();
      }

      const notification = await prisma.notification.update({
        where: { id: searchParam.id },
        data: {
          hasBeenSeen: true,
        },
      });

      return notification;
    } catch (error) {
      if (error instanceof Error) {
        error.message = `Failure to update "hasBeenSeen" in notification by "${searchParam.id}" id. ${error.message}`;
      }

      throw error;
    }
  };
