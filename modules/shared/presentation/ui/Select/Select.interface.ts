import { SelectHTMLAttributes } from 'react';
import { PathValue, Path, FieldValues } from 'react-hook-form';
import { InputActionMeta } from 'react-select';
import { SelectOption } from '@shared/presentation/types/select-option';
import { ControlValidatedFormElement } from '@shared/presentation/types/form-type';

type SelectBaseProps<TFormValues extends FieldValues> =
  ControlValidatedFormElement<TFormValues> &
    Pick<SelectHTMLAttributes<SelectOption>, 'disabled' | 'placeholder'> & {
      options: SelectOption[];
      defaultValue?: PathValue<TFormValues, Path<TFormValues>>;
      isLoading?: boolean;
      label?: string;
      noOptionsMessage?: (obj: { inputValue: string }) => string | null;
      onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
    };

export type SelectProps<TFormValues extends FieldValues> =
  SelectBaseProps<TFormValues> & {
    isMulti?: false;
    onChange?: (value: string) => void;
  };

export type SelectMultiProps<TFormValues extends FieldValues> =
  SelectBaseProps<TFormValues> & {
    isMulti: true;
    onChange?: (value: string[]) => void;
  };
