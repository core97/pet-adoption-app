import { fetcher } from '@shared/application/fetcher';
import { CustomSession } from '@shared/application/auth';

export async function getSession(cookie: string) {
  const session = await fetcher<CustomSession>(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/session`,
    {
      headers: {
        cookie,
      },
    }
  );

  return Object.keys(session.user || {}).length > 0 ? session : null;
}
