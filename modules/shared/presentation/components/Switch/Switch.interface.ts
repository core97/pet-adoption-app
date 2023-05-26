import { FieldValues } from 'react-hook-form';
import { RegisterValidatedFormElement } from '@shared/presentation/types/form-type';

export type SwitchProps<TFormValues extends FieldValues> =
  RegisterValidatedFormElement<TFormValues> & {
    defaultChecked?: boolean;
    description?: string;
    label?: string;
  };
