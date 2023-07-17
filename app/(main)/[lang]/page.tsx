'use client';

import { signIn } from 'next-auth/react';

const Home = () => (
  <main
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '70vh',
    }}
  >
    <button type="button" onClick={() => signIn()}>
      Sign In
    </button>
  </main>
);

export default Home;
