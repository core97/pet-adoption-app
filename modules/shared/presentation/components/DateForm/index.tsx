'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import { Box, VStack, Button, useToast } from '@chakra-ui/react';
import { InputTime } from '@components';
import { getTimeFromDate } from '@shared/application/string-utils';
import { DateFormProps, DateFormFields } from './DateForm.interface';
import 'react-day-picker/dist/style.css';

export type { DateDefaultValues, DateSubmit } from './DateForm.interface';

export const DateForm = ({
  onSubmit,
  submitButtonLabel,
  defaultValue,
  status,
}: DateFormProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    defaultValue?.date
  );

  const { register, handleSubmit, formState } = useForm<DateFormFields>();

  const toast = useToast();

  const handleSubmitForm = (data: DateFormFields) => {
    if (!selectedDate) {
      toast({
        status: 'error',
        title: 'Debes seleccionar un día en el calendario.',
      });
      return;
    }

    const [hourStr, minutesStr] = data.time.split(':');

    selectedDate.setHours(parseInt(hourStr, 10));
    selectedDate.setMinutes(parseInt(minutesStr, 10));

    onSubmit({ date: selectedDate });
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit(handleSubmitForm)}>
      <VStack spacing={4}>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
        <InputTime
          label="Hora"
          register={register}
          name="time"
          errors={formState.errors}
          rules={{ required: true }}
          defaultValue={
            defaultValue?.date ? getTimeFromDate(defaultValue.date) : undefined
          }
        />
      </VStack>

      <Button
        mt={8}
        type="submit"
        width="100%"
        isLoading={status === 'loading'}
      >
        {submitButtonLabel}
      </Button>
    </Box>
  );
};
