import { create } from 'zustand';
import { RecursiveObject } from '@shared/domain/utils-type';

/**
 * Tutorial to use zustand with Nextjs 13 in server and client components
 * @see https://www.youtube.com/watch?v=OpMAH2hzKi8&ab_channel=JackHerrington
 */

export const useDictionaryStore = create<RecursiveObject<string>>(() => ({}));
