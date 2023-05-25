import { FieldValues } from 'react-hook-form';
import { BaseRegisterValidatedFormElement } from 'types/components';

export type SwitchProps<TFormValues extends FieldValues> =
  BaseRegisterValidatedFormElement<TFormValues> & {
    defaultChecked?: boolean;
    description?: string;
    label?: string;
    value?: string | number;
    'aria-invalid'?: true;
  };
