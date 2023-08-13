import { BoxProps } from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { RegisterValidatedFormElement } from '@shared/presentation/types/form-type';

export type InputRadioProps<TFormValues extends FieldValues> = BoxProps &
  RegisterValidatedFormElement<TFormValues> & {
    id: HTMLInputElement['id'];
    name: HTMLInputElement['name'];
    children: React.ReactNode | React.ReactNode[];
    value: HTMLInputElement['value'];
    defaultChecked?: HTMLInputElement['defaultChecked'];
  };
