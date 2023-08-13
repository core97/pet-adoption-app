'use client';

import { useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

export function useGetPosition({
  deniedPemissionCallback,
}: {
  deniedPemissionCallback?: () => void;
} = {}) {
  const toast = useToast();

  const getCurrentPosition = useCallback(
    async (
      successCallback: PositionCallback,
      errorCallback?: PositionErrorCallback | null,
      options?: PositionOptions
    ) => {
      const geoPermissions = await navigator.permissions.query({
        name: 'geolocation',
      });

      if (geoPermissions.state === 'denied') {
        toast({
          status: 'warning',
          duration: 10000,
          title: 'No podemos reconecer tu ubicación',
          description:
            'Por favor, ve a la configuración del navegador y habilita los permisos de geolocalización',
        });

        deniedPemissionCallback?.();

        return;
      }

      if (geoPermissions.state === 'prompt') {
        toast({
          status: 'info',
          title: 'Para ordenar por distancia debes permitir la geolocalización',
        });
      }

      navigator.geolocation.getCurrentPosition(
        successCallback,
        error => {
          errorCallback?.(error);
        },
        options
      );
    },
    [toast]
  );

  return getCurrentPosition;
}
