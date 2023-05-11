/* eslint-disable consistent-return */
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@shared/presentation/services/auth-service';
import {
  PAGES,
  PROTECTED_PAGES,
  findCurrentPage,
} from '@shared/application/pages';

export async function middleware(request: NextRequest) {
  const currentPage = findCurrentPage(request.nextUrl.pathname);
  const protectedPage = PROTECTED_PAGES.find(
    page => page.route === currentPage
  );

  const redirect = (url: string) =>
    NextResponse.redirect(new URL(url, request.url));

  if (protectedPage) {
    try {
      const session = await getSession(request.headers.get('cookie') ?? '');

      if (!session?.user?.role) {
        return redirect(PAGES.SIGN_IN);
      }

      const hasRole = protectedPage.roles.includes(session.user.role);

      if (!hasRole || protectedPage.route === PAGES.SIGN_IN) {
        return redirect(PAGES.HOME);
      }
    } catch (error) {
      if (error instanceof Error) {
        error.message = `An error occurred when handling protected routes in the middleware. ${error.message}`;
      }
      console.error(error);
      return redirect(PAGES.SIGN_IN);
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next
     */
    '/((?!api|_next).*)',
  ],
};
