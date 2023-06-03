'use client';

import { signOut } from 'next-auth/react';
import { Button, Text, Container } from '@chakra-ui/react';
import { User } from '@user/model';

export const UserDetail = ({ user }: { user: Omit<User, 'password'> }) => (
  <Container maxW="5xl">
    <Text>{user.name}</Text>
    <Button type="button" onClick={() => signOut}>
      Cerrar sesión
    </Button>
  </Container>
);
