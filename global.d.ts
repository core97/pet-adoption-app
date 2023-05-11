import { UserRole } from '@user/model';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
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

export {};
