import { headers } from 'next/headers';
import { Inter } from 'next/font/google';
import { Sidebar } from '@components/Sidebar';
import { DashboardNavbar } from '@components/DashboardNavbar';
import { AppHeader } from '@components/AppHeader';
import { ChakraProvider } from '@shared/presentation/chakra-ui/chakra-provider';
import { DASHBOARD_PAGES } from '@shared/application/pages';
import { getSession } from '@shared/presentation/services/auth-service';
import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession(headers().get('cookie') ?? '');
  const pathname = headers().get('x-pathname');
  const isDashboardPage = !!pathname?.startsWith(DASHBOARD_PAGES.HOME);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          {isDashboardPage ? (
            <Sidebar navigation={<DashboardNavbar />}>{children}</Sidebar>
          ) : (
            <>
              <AppHeader isAuthenticated={!!session?.user} />
              {children}
            </>
          )}
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
