import { Notfication } from '@notification/model';
import { fetcher } from '@shared/application/fetcher';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api/notifications`;

export const NOTIFICATIONS_CACHE_TAGS = {};

export const updateNotificationHasBeenSeen = async ({
  notificationId,
}: {
  notificationId: string;
}) => {
  const res = await fetcher<Notfication>(
    `${BASE_URL}/has-been-seen/${notificationId}`,
    {
      method: 'PUT',
      cache: 'no-cache',
    }
  );

  return res;
};
