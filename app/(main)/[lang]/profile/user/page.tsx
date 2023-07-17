import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { userPrivateFinderByEmail } from '@user/application/user-finder-by-email';
import { UserDetail } from '@user/presentation/components/UserDetail';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const UserDetailPage = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (!session?.user?.email) {
    redirect(PAGES.SIGN_IN);
  }

  const user = await userPrivateFinderByEmail(session.user.email);

  return <UserDetail user={user} />;
};

export default UserDetailPage;
