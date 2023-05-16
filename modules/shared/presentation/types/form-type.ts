import {
  RegisterOptions,
  Control,
  Path,
  FieldValues,
  PathValue,
} from 'react-hook-form';
import { AsyncStatus } from '@shared/domain/async-status';

export type ControlValidatedFormElement<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  defaultValue?: PathValue<TFormValues, Path<TFormValues>>;
  rules?: RegisterOptions;
};

export interface FormProps<TSubmit, TDefaultValues> {
  onSubmit(formData: TSubmit): Promise<void> | void;
  submitButtonLabel: string;
  defaultValue?: TDefaultValues;
  status?: AsyncStatus;
}
