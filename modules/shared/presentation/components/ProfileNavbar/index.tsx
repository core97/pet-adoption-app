'use client';

import { VStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { PAGES } from '@shared/application/pages';

export const ProfileNavbar = () => (
  <VStack as="nav">
    <Link href={PAGES.USER_DETAIL}>Mi cuenta</Link>
    <Link href={PAGES.USER_PET_ADS_LIST}>Mis anuncios</Link>
    <Link href={PAGES.ADOPTION_REQUESTS_LIST}>Solicitudes de adopción</Link>
    <Link href={PAGES.NOTIFICATIONS}>Notificaciones</Link>
    <Link href={PAGES.FAVOURITES}>Favoritos</Link>
  </VStack>
);
