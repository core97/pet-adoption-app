import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { NotificationsList } from '@notification/presentation/components/NotificationsList';
import { notificationsFinderById } from '@notification/application/notifications-finder-by-user';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const Notifications = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.id) {
    redirect(PAGES.SIGN_IN);
  }

  const notifications = await notificationsFinderById({
    userId: session.user.id,
  });

  return <NotificationsList notifications={notifications} />;
};

export default Notifications;
