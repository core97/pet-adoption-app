'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { AsyncStatus } from '@shared/domain/async-status';
import { NextAsyncAction } from '@shared/presentation/types/async-types';

export const useAsync = <T = void, P = unknown>(
  asyncFunction: (args: P) => Promise<T>,
  options: {
    onSuccess?: NextAsyncAction;
    onLoading?: Pick<NextAsyncAction, 'toast'>;
    onError?: NextAsyncAction;
  } = {}
) => {
  const [status, setStatus] = useState<AsyncStatus>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  const execute = useCallback(
    (args: P) => {
      setStatus('loading');

      if (options.onLoading?.toast?.title) {
        toast({
          status: 'info',
          title: options.onLoading.toast.title,
        });
      }

      setValue(null);
      setError(null);

      return asyncFunction(args)
        .then(response => {
          setValue(response);
          setStatus('success');

          if (options.onSuccess?.toast?.title) {
            toast({
              status: 'success',
              title: options.onSuccess.toast.title,
            });
          }

          if (options.onSuccess?.action) {
            options.onSuccess.action();
          }

          if (options.onSuccess?.redirect) {
            router.push(options.onSuccess.redirect);
          }
        })
        .catch(err => {
          setError(err);
          setStatus('error');

          toast({
            status: 'error',
            title: options.onError?.toast?.title || 'Ha ocurrido un error',
          });

          if (options.onError?.action) {
            options.onError.action();
          }

          if (options.onError?.redirect) {
            router.push(options.onError.redirect);
          }
        });
    },
    [
      asyncFunction,
      options.onError,
      options.onLoading?.toast?.title,
      options.onSuccess,
      router,
      toast,
    ]
  );

  return { execute, status, value, error };
};
