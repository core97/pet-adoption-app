'use client';

import { useState } from 'react';
import { Container } from '@chakra-ui/react';
import { FormStep, FormStepper } from '@components';
import { PetAdForm } from '@pet-ad/presentation/components/PetAdForm';
import { AddressForm } from '@shared/presentation/components/AddressForm';

const PetAdCreation = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <Container maxW="2xl">
        <FormStepper activeStep={activeStep} onChangeActiveStep={setActiveStep}>
          <FormStep label="Datos del animal">
            <PetAdForm
              onSubmit={console.log}
              petType="DOG"
              submitButtonLabel="Submit"
            />
          </FormStep>
          <FormStep label="Dirección">
            <AddressForm onSubmit={console.log} submitButtonLabel="Submit" />
          </FormStep>
        </FormStepper>
      </Container>
    </main>
  );
};

export default PetAdCreation;
