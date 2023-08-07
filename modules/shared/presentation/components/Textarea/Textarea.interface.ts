import { FieldValues } from 'react-hook-form';
import { RegisterValidatedFormElement } from '@shared/presentation/types/form-type';

export type TextareaProps<TFormValues extends FieldValues> =
  RegisterValidatedFormElement<TFormValues> &
    Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'accept' | 'autoComplete' | 'id' | 'name' | 'size' | 'type'
    > & {
      label?: string;
    };
