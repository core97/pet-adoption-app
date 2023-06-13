import { FieldValues } from 'react-hook-form';
import { RegisterValidatedFormElement } from '@shared/presentation/types/form-type';

export type InputTextProps<TFormValues extends FieldValues> =
  RegisterValidatedFormElement<TFormValues> &
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'accept'
      | 'autoComplete'
      | 'id'
      | 'name'
      | 'size'
      | 'type'
      | 'defaultChecked'
    > & {
      label?: string;
      type?: 'email' | 'number' | 'password' | 'tel' | 'text';
    };
