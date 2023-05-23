/* eslint-disable react/jsx-props-no-spreading */
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { formatDateToString } from '@shared/application/string-utils';
import { InputDateProps } from './InputDate.interface';

export const InputDate = <TFormValues extends Record<string, unknown>>({
  name,
  defaultValue,
  disabled,
  errors,
  label,
  register,
  rules,
  ...rest
}: InputDateProps<TFormValues>) => {
  const defaultValueParsed =
    typeof defaultValue === 'string'
      ? formatDateToString(new Date(defaultValue), 'yyyy-mm-dd')
      : undefined;

  return (
    <FormControl isInvalid={!!errors?.[name]} isRequired={!!rules?.required}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Input
        id={name}
        name={name}
        defaultValue={defaultValueParsed}
        disabled={disabled}
        type="date"
        cursor="pointer"
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
};
