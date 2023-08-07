/* eslint-disable react/jsx-props-no-spreading */
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Textarea as TextareaChakraUi,
} from '@chakra-ui/react';
import { TextareaProps } from './Textarea.interface';

export const Textarea = <TFormValues extends Record<string, unknown>>({
  name,
  errors,
  label,
  register,
  rules,
  ...rest
}: TextareaProps<TFormValues>) => (
  <FormControl isInvalid={!!errors?.[name]} isRequired={!!rules?.required}>
    {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
    <TextareaChakraUi
      id={name}
      name={name}
      autoComplete="off"
      {...(register && register(name, rules))}
      {...rest}
    />
    {errors?.[name]?.message && (
      <FormErrorMessage role="alert">
        {errors?.[name]?.message}
      </FormErrorMessage>
    )}
  </FormControl>
);
