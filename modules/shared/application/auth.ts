import { UserRole } from '@user/model';

export interface CustomSession {
  expires: string;
  user?: {
    id?: string;
    role?: UserRole;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
