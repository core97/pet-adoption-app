'use client';

import { useController } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { InputTextProps } from './InputText.interface';

export const InputText = <TFormValues extends Record<string, unknown>>({
  name,
  label,
  rules,
  type,
  defaultValue,
  control,
  ...rest
}: InputTextProps<TFormValues>) => {
  const { field, formState } = useController<TFormValues>({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <FormControl
      isInvalid={!!formState.errors?.[field.name]?.message}
      isRequired={!!rules?.required}
    >
      {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Input
        id={field.name}
        ref={field.ref}
        name={field.name}
        type={type}
        autoComplete="off"
        onBlur={field.onBlur}
        onChange={field.onChange}
        value={
          field.value as React.InputHTMLAttributes<HTMLInputElement>['value']
        }
        {...rest}
      />
      {formState.errors?.[field.name]?.message && (
        <FormErrorMessage role="alert">
          {formState.errors?.[field.name]?.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
