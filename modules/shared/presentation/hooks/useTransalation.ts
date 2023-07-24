'use client';

import { useCallback } from 'react';
import { RecursiveObject } from '@shared/domain/utils-type';
import { useDictionaryStore } from '@shared/presentation/stores/dictionary-store';

export function useTranslation() {
  const dictionary = useDictionaryStore();

  const translateByKey = useCallback(
    (key: string, params?: { [key: string]: string | number }) => {
      let translation = key
        .split('.')
        .reduce(
          (acc: RecursiveObject<string> | string, value) =>
            typeof acc !== 'string' ? acc?.[value] : acc,
          dictionary
        ) as string;

      if (!translation || typeof translation === 'object') {
        return key;
      }

      if (params && Object.entries(params).length) {
        Object.entries(params).forEach(([paramKey, value]) => {
          translation = translation.replace(`{{ ${paramKey} }}`, String(value));
        });
      }

      return translation;
    },
    [dictionary]
  );

  return { t: translateByKey };
}
