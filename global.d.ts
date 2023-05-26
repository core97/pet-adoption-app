import { PrismaClient } from '@prisma/client';
import { UserRole } from '@user/model';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient;
  
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY_GOOGLE_CLOUD_PLATFORM: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      NEXT_PUBLIC_URL: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }

  export interface Request {
    context: {
      user?: {
        email: string;
        id: string;
        role: UserRole;
      };
    };
  }
}

declare module 'next' {
  export interface NextApiRequest {
    context: {
      user?: {
        email: string;
        id: string;
        role: UserRole;
      };
    };
  }
}

export {};
