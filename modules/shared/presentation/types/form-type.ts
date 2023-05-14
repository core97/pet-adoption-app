import {
  RegisterOptions,
  Control,
  Path,
  FieldValues,
  PathValue,
} from 'react-hook-form';

export type ControlValidatedFormElement<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  defaultValue?: PathValue<TFormValues, Path<TFormValues>>;
  rules?: RegisterOptions;
};
