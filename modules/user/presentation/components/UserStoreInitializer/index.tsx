'use client';

import { useRef } from 'react';
import { User } from '@user/model';
import { useUserStore } from '@user/presentation/user-store';

export const UserStoreInitializer = (props: Partial<Omit<User, 'password'>>) => {
  const initialized = useRef<boolean>();

  if (!initialized.current) {
    useUserStore.setState(props);
    initialized.current = true;
  }

  return null;
};
