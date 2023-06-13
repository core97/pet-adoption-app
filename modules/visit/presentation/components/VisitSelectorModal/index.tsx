'use client';

import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  VStack,
} from '@chakra-ui/react';
import { DateForm } from '@shared/presentation/components/DateForm';
import { SelectAddressForm } from '@shared/presentation/components/SelectAddressForm';
import 'react-day-picker/dist/style.css';

const INITIAL_FORM_STEP = 1;

export const VisitSelectorModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [visitDate, setVisitDate] = useState<Date>();
  const [formStep, setFormStep] = useState(INITIAL_FORM_STEP);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setFormStep(INITIAL_FORM_STEP);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nueva visita</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} width="100%">
            {formStep === 1 && (
              <DateForm
                submitButtonLabel="Siguiente"
                onSubmit={({ date }) => {
                  setVisitDate(date);
                  setFormStep(prev => prev + 1);
                }}
              />
            )}
            {formStep === 2 && (
              <SelectAddressForm
                onSubmit={console.log}
                submitButtonLabel="Siguiente"
              />
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
