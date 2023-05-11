import { UserRole } from '@user/model';

export const PAGES = {
  HOME: '/',
  PROFILE: '/profile',
  SIGN_IN: '/sign-in',
};

export const PROTECTED_PAGES: { route: string; roles: UserRole[] }[] = [
  { route: PAGES.PROFILE, roles: ['USER', 'ADMIN'] },
];

export function findCurrentPage(currentRoute: string) {
  const currentPage = Object.values(PAGES).find(page => {
    let result = false;

    if (page === currentRoute) {
      result = true;
    } else if (page.includes(currentRoute)) {
      result = true;
    }

    return result;
  });

  return currentPage;
}
