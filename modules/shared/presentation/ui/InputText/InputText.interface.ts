import { FieldValues } from 'react-hook-form';
import { ControlValidatedFormElement } from '@shared/presentation/types/form-type';

export type InputTextProps<TFormValues extends FieldValues> =
  ControlValidatedFormElement<TFormValues> &
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
