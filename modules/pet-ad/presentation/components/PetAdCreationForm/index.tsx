'use client';

import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { FormStep, FormStepper } from '@components';
import { useAsync } from '@hooks/useAsync';
import { createPetAd } from '@/modules/pet-ad/presentation/pet-ad-fetcher';
import { PAGES } from '@shared/application/pages';
import {
  PetAdForm,
  PetAdSubmit,
} from '@pet-ad/presentation/components/PetAdForm';
import {
  SelectAddressForm,
  SelectAddressSubmit,
} from '@shared/presentation/components/SelectAddressForm';
import { PetAdCreationFormProps } from './PetAdCreationForm.interface';

export const PetAdCreationForm = ({
  options,
  petType,
}: PetAdCreationFormProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [petAdSubmit, setPetAdSubmit] = useState<PetAdSubmit>();

  const handleFinalSubmit = useAsync(
    async (data: SelectAddressSubmit) => {
      if (!petAdSubmit) {
        throw Error('Missing form data to create pet ad');
      }

      await createPetAd({
        ...petAdSubmit,
        address: data,
        petType,
      });
    },
    {
      onSuccess: {
        redirect: PAGES.HOME,
        toast: { title: 'Se ha creado correctamente el anuncio 🐶🐱' },
      },
    }
  );

  return (
    <Container maxW="2xl">
      <FormStepper activeStep={activeStep} onChangeActiveStep={setActiveStep}>
        <FormStep label="Datos del animal">
          <PetAdForm
            petType={petType}
            options={options}
            submitButtonLabel="Siguiente"
            onSubmit={data => {
              setPetAdSubmit(data);
              setActiveStep(prev => prev + 1);
            }}
          />
        </FormStep>
        <FormStep label="Dirección">
          <SelectAddressForm
            onSubmit={handleFinalSubmit.execute}
            addresses={options.addresses}
            submitButtonLabel="Crear anuncio"
            status={handleFinalSubmit.status}
          />
        </FormStep>
      </FormStepper>
    </Container>
  );
};
