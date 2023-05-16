'use client';

import { BreedForm } from '@breed/presentation/components/BreedForm';

const BreedCreation = () => (
  <BreedForm onSubmit={console.log} submitButtonLabel="Crear raza" />
);

export default BreedCreation;
