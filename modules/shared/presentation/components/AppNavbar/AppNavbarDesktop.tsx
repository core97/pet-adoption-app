import { signIn, signOut } from 'next-auth/react';
import { HStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export const AppNavbarDesktop = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => (
  <HStack as="nav">
    <Link href="/dogs">Perros</Link>
    <Link href="/cats">Gatos</Link>
    {isAuthenticated && (
      <Button type="button" variant="link" onClick={() => signOut()}>
        Salir
      </Button>
    )}
    {!isAuthenticated && (
      <Button type="button" onClick={() => signIn()}>
        Iniciar sesión
      </Button>
    )}
  </HStack>
);
