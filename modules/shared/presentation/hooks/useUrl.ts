'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const addParam = useCallback(
    (
      key: string,
      value: string | number | boolean,
      options: { shouldBeReplaced?: boolean } = { shouldBeReplaced: true }
    ) => {
      let url = `${pathname}?`;

      if (!url) {
        throw new Error('No exist pathname to add param in URL');
      }

      [...(searchParams?.entries() || [])].forEach(([otherKey, otherValue]) => {
        if (otherKey === key && options.shouldBeReplaced) {
          url += `&${key}=${value}`;
        } else {
          url += `&${otherKey}=${otherValue}`;
        }
      });

      const alreadyAdded = url?.includes(`${key}=`);
      if (!alreadyAdded) {
        url += `&${key}=${value}`;
      }

      return url;
    },
    [pathname, searchParams]
  );

  return { addParam };
}
