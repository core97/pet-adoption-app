'use client';

import { useRef } from 'react';
import { useDictionaryStore } from '@shared/presentation/stores/dictionary-store';

export const DictionaryStoreInitializer = ({
  dictionary,
}: {
  dictionary: Record<string, string>;
}) => {
  const initialized = useRef<boolean>();

  if (!initialized.current) {
    useDictionaryStore.setState(dictionary);
    initialized.current = true;
  }

  return null;
};
