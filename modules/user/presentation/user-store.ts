import { create } from 'zustand';
import { User } from '@user/model';

/**
 * Tutorial to use zustand with Nextjs 13 in server and client components
 * @see https://www.youtube.com/watch?v=OpMAH2hzKi8&ab_channel=JackHerrington
 */

export const useUserStore = create<Partial<Omit<User, 'password'>>>(() => ({}));
