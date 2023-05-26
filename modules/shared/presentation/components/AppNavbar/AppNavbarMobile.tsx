import { signIn, signOut } from 'next-auth/react';
import { VStack, Button } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

export const AppNavbarMobile = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => (
  <VStack as="nav">
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
  </VStack>
);
