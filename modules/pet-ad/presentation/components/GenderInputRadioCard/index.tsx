'use client';

import {
  FormControl,
  FormLabel,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { InputRadioCard } from '@components/InputRadioCard';
import { Icon } from '@components/Icon';
import { IconsName } from '@components/Icon/Icon.interface';
import { InputRadioCardProps } from '@components/InputRadioCard/InputRadioCard.interface';
import { GENDER, Gender } from '@pet-ad/model';

export const GenderInputRadioCard = <
  TFormValues extends Record<string, unknown>
>({
  name,
  register,
  rules,
  errors,
  defaultValue,
  ...rest
}: Omit<
  InputRadioCardProps<TFormValues>,
  'children' | 'defaultChecked' | 'id' | 'value'
> & { defaultValue?: Gender }) => (
  <FormControl
    isInvalid={!!errors?.[name]?.message}
    isRequired={!!rules?.required}
  >
    <FormLabel>Género</FormLabel>
    <SimpleGrid columns={2} gap={4}>
      {Object.values(GENDER).map(gender => (
        <InputRadioCard
          id={gender}
          key={gender}
          register={register}
          name={name}
          value={gender}
          defaultChecked={defaultValue === gender}
          {...rest}
        >
          <VStack>
            <Icon iconName={gender.toLowerCase() as IconsName} />
            <Text>{gender}</Text>
          </VStack>
        </InputRadioCard>
      ))}
    </SimpleGrid>
  </FormControl>
);
