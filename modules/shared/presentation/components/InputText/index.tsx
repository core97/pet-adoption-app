'use client';

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
  register,
  errors,
  ...rest
}: InputTextProps<TFormValues>) => (
  <FormControl
    isInvalid={!!errors?.[name]?.message}
    isRequired={!!rules?.required}
  >
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <Input
      id={name}
      name={name}
      type={type}
      autoComplete="off"
      defaultValue={defaultValue}
      {...(register && register(name, rules))}
      {...rest}
    />
    {errors?.[name]?.message && (
      <FormErrorMessage role="alert">
        {errors?.[name]?.message?.toString()}
      </FormErrorMessage>
    )}
  </FormControl>
);
