import { notificationHasBeenSeenPut } from '@notification/presentation/controllers/notification-has-been-seen-put';

export async function PUT(request: Request) {
  const res = await notificationHasBeenSeenPut.run(request);
  return res;
}
