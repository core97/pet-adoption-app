import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Provider } from 'next-auth/providers';
import { getProviders } from 'next-auth/react';
import { SignInButtons } from '@components/SignInButtons';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES } from '@shared/application/pages';

const SignInPage = async () => {
  const session = await getSession(headers().get('cookie') ?? '');

  if (session?.user?.email) {
    redirect(PAGES.HOME);
  }

  const providers = await getProviders();

  if (!providers) {
    redirect(PAGES.HOME);
  }

  return (
    <section>
      <h1>Inicia sesión</h1>
      <SignInButtons providers={providers as unknown as Provider[]} />
    </section>
  );
};

export default SignInPage;
