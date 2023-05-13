import { DASHBOARD_PAGES } from '@shared/application/pages';

export const NAVBAR_ITEMS = [
  {
    title: 'Razas',
    links: [
      {
        label: 'Perros',
        href: `${DASHBOARD_PAGES.HOME}/dog`,
      },
      {
        label: 'Gatos',
        href: `${DASHBOARD_PAGES.HOME}/cat`,
      },
    ],
  },
];
