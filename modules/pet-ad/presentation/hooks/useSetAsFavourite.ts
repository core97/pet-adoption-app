import { useState } from 'react';
import { useAsync } from '@hooks/useAsync';
import { PetAdDetailDto } from '@pet-ad/dto';
import { updatePetAdAsFavourite } from '@pet-ad/presentation/pet-ad-fetcher';
import { AppClientError } from '@shared/application/errors/app-client-error';

export function useSetAsFavourite({
  petAd,
  userId,
}: {
  petAd: Pick<PetAdDetailDto, 'id' | 'favouritesUsersId'>;
  userId?: string;
}) {
  const [isMarkedAsFavourite, setIsMarkedAsFavourite] = useState(
    petAd.favouritesUsersId.includes(userId || '')
  );

  const onSetAsFavourite = useAsync(
    async () => {
      if (!userId) {
        throw new AppClientError(
          'Para marcar como favorito primero debes iniciar sesión'
        );
      }

      await updatePetAdAsFavourite({ id: petAd.id });

      setIsMarkedAsFavourite(prev => !prev);
    },
    {
      onSuccess: {
        toast: {
          title: isMarkedAsFavourite
            ? 'Has eliminado el anuncio de tus favoritos'
            : 'Has añadido el anuncio a tus favoritos',
        },
      },
    }
  );

  return {
    execute: onSetAsFavourite.execute,
    isMarkedAsFavourite,
    status: onSetAsFavourite.status,
  };
}
