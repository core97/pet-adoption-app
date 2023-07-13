import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@shared/presentation/services/auth-service';
import { PAGES, DASHBOARD_PAGES } from '@shared/application/pages';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const redirect = (url: string) =>
    NextResponse.redirect(new URL(url, request.url));

  if (request.nextUrl.pathname?.startsWith(DASHBOARD_PAGES.HOME)) {
    try {
      const session = await getSession(request.headers.get('cookie') ?? '');

      if (!session?.user?.role) {
        return redirect(PAGES.SIGN_IN);
      }

      if (session.user.role !== 'ADMIN') {
        return redirect(PAGES.HOME);
      }
    } catch (error) {
      if (error instanceof Error) {
        error.message = `An error occurred when handling ${request.nextUrl.pathname} protected route in the middleware. ${error.message}`;
      }
      console.error(error);
      return redirect(PAGES.SIGN_IN);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
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
