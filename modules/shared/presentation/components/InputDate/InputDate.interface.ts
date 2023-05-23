import { FieldValues } from 'react-hook-form';
import { RegisterValidatedFormElement } from '@shared/presentation/types/form-type';

export type InputDateProps<TFormValues extends FieldValues> =
  RegisterValidatedFormElement<TFormValues> &
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'accept' | 'autoComplete' | 'id' | 'name' | 'size' | 'type'
    > & {
      label?: string;
    };
