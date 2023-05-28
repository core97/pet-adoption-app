'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  PetAdForm,
  PetAdSubmit,
} from '@pet-ad/presentation/components/PetAdForm';
import {
  SelectAddressForm,
  SelectAddressSubmit,
} from '@shared/presentation/components/SelectAddressForm';
import { useAsync } from '@hooks/useAsync';
import { PetAdUserProps } from './PetAdUser.interface';

export const PetAdUser = ({ options, petAd }: PetAdUserProps) => {
  const handleSubmitPetAdForm = useAsync((data: PetAdSubmit) => {});

  const handleSubmitAddressForm = useAsync((data: SelectAddressSubmit) => {});

  return (
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
  );
};
