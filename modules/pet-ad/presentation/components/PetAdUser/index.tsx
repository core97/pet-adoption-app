'use client';

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from '@chakra-ui/react';
import {
  PetAdForm,
  PetAdSubmit,
} from '@pet-ad/presentation/components/PetAdForm';
import { updatePetAdById } from '@pet-ad/presentation/pet-ad-fetcher';
import {
  SelectAddressForm,
  SelectAddressSubmit,
} from '@shared/presentation/components/SelectAddressForm';
import { useAsync } from '@hooks/useAsync';
import { PAGES } from '@shared/application/pages';
import { PetAdUserProps } from './PetAdUser.interface';

export const PetAdUser = ({ options, petAd }: PetAdUserProps) => {
  const handleSubmitPetAdForm = useAsync(
    async (data: PetAdSubmit) => {
      await updatePetAdById({
        data,
        searchParam: { id: petAd.id, userId: petAd.userId },
      });
    },
    { onSuccess: { redirect: PAGES.USER_PET_ADS_LIST } }
  );

  const handleSubmitAddressForm = useAsync(
    async (data: SelectAddressSubmit) => {
      await updatePetAdById({
        data: { address: data },
        searchParam: { id: petAd.id, userId: petAd.userId },
      });
    },
    { onSuccess: { redirect: PAGES.USER_PET_ADS_LIST } }
  );

  return (
    <Container maxW="5xl">
      <Tabs>
        <TabList>
          <Tab>Anuncio</Tab>
          <Tab>Dirección</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PetAdForm
              onSubmit={handleSubmitPetAdForm.execute}
              submitButtonLabel="Actualizar anuncio"
              status={handleSubmitPetAdForm.status}
              options={{ breeds: options.breeds }}
              petType={petAd.petType}
              defaultValue={petAd}
            />
          </TabPanel>
          <TabPanel>
            <SelectAddressForm
              onSubmit={handleSubmitAddressForm.execute}
              submitButtonLabel="Actualizar dirección"
              defaultValue={petAd.address}
              status={handleSubmitAddressForm.status}
              addresses={[
                petAd.address,
                ...options.addresses.filter(
                  ({ placeId }) => placeId !== petAd.address.placeId
                ),
              ]}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};
