import { Notfication } from '@notification/model';
import prisma from '@shared/application/prisma';

export interface NotificationsFinderByUser {
  (params: { userId: string }): Promise<Notfication[]>;
}

export const notificationsFinderById: NotificationsFinderByUser = async ({
  userId,
}) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userIdToNotify: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return notifications;
  } catch (error) {
    if (error instanceof Error) {
      error.message = `Notifications by "${userId}" user could not be obtained. ${error.message}`;
    }

    throw error;
  }
};
