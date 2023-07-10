'use client';

import type { Provider } from 'next-auth/providers';
import { signIn } from 'next-auth/react';

export const SignInButtons = ({ providers }: { providers: Provider[] }) => (
  <ul>
    {Object.values(providers).map(provider => (
      <div key={provider.name}>
        <button type="button" onClick={() => signIn(provider.id)}>
          Sign in with {provider.name}
        </button>
      </div>
    ))}
  </ul>
);
