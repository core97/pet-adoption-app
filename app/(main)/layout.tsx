import { headers, cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { AppHeader } from '@components/AppHeader';
import { countryListFinder } from '@country/application/country-list-finder';
import { User } from '@user/model';
import { useUserStore } from '@user/presentation/user-store';
import { UserStoreInitializer } from '@user/presentation/components/UserStoreInitializer';
import { userPrivateFinderByEmail } from '@user/application/user-finder-by-email';
import { ChakraProvider } from '@shared/presentation/chakra-ui/chakra-provider';
import { getSession } from '@shared/presentation/services/auth-service';
import '../global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const AppRootLayout = async ({ children }: { children: React.ReactNode }) => {
  const [countries, session] = await Promise.all([
    countryListFinder({ isAvailableToSearch: true }),
    getSession(headers().get('cookie') ?? ''),
  ]);

  const searchCountryCookie = cookies().get('searchCountry');

  let user: Omit<User, 'password'> | null = null;
  let searchCountry = '';

  if (session?.user?.email) {
    user = await userPrivateFinderByEmail(session.user.email);
  }

  if (!searchCountry && searchCountryCookie?.value) {
    searchCountry = searchCountryCookie.value;
  }

  useUserStore.setState(user || { preferences: { searchCountry } });

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserStoreInitializer
          {...(user || { preferences: { searchCountry } })}
        />
        <ChakraProvider>
          <AppHeader countries={countries} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
};

export default AppRootLayout;
