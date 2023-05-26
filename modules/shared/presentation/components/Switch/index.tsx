/* eslint-disable react/jsx-props-no-spreading */
import {
  VStack,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Switch as SwitchChakra,
  Text,
} from '@chakra-ui/react';
import NoSSR from '@components/NoSSR';
import { SwitchProps } from './Switch.interface';

export const Switch = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  errors,
  rules,
  defaultChecked,
  description,
  label,
}: SwitchProps<TFormValues>) => (
  <NoSSR>
    <FormControl
      isInvalid={errors?.[name]}
      isRequired={!!rules?.required}
      display="flex"
      alignItems="center"
    >
      <SwitchChakra
        id={name}
        name={name}
        defaultChecked={defaultChecked}
        {...(register && register(name, rules))}
      />
      <VStack alignItems="flex-start" ml={6}>
        {label && (
          <FormLabel htmlFor={name} ml={description ? 0 : 4} m={0}>
            {label}
          </FormLabel>
        )}
        {description && <Text>{description}</Text>}
      </VStack>

      {errors?.[name]?.message && (
        <FormErrorMessage role="alert">
          {errors?.[name]?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  </NoSSR>
);
