import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { isValidRole } from '@user/model';
import prisma from '@shared/application/prisma';
import { CustomSession } from '@shared/application/auth';
import { PAGES } from '@shared/application/pages';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        user: {
          ...(!!session.user && session.user),
          ...(token && {
            ...('userId' in token && { id: token.userId as string }),
            ...(isValidRole(token.role) && { role: token.role }),
          }),
        },
      };

      return customSession;
    },
    jwt({ token, user }) {
      const customToken = {
        ...token,
        ...(user && {
          ...('role' in user && { role: user.role }),
          userId: user.id,
        }),
      };

      return customToken;
    },
  },
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: PAGES.SIGN_IN,
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
