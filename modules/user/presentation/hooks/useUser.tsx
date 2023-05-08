'use client';

import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { User } from '@user/model';

type UserDto = Omit<User, 'password'>;

const UserContext = createContext<
  | {
      setUser: Dispatch<SetStateAction<UserDto | null>>;
      user: UserDto | null;
    }
  | undefined
>(undefined);

export const UserContextProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
  initialUser: UserDto | null;
}) => {
  const [user, setUser] = useState<UserDto | null>(initialUser || null);

  const contextValue = useMemo(
    () => ({
      setUser,
      user,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      '[useUser]: hook must be used within the UserContextProvider context.'
    );
  }

  return context;
};
