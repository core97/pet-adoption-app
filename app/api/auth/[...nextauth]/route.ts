import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@shared/application/prisma';

export const authOptions: NextAuthOptions = {
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
      const customSession = {
        ...session,
        user: {
          ...(!!session.user && session.user),
          ...(token && {
            ...('role' in token && { role: token.role }),
            ...('userId' in token && { id: token.userId }),
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
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
