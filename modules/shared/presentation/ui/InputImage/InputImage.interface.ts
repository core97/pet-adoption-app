import { FieldValues } from 'react-hook-form';
import { ControlValidatedFormElement } from '@shared/presentation/types/form-type';
import { InputFileModalProps } from './InputFileModal/InputFileModal.interface';

export interface InputImageProps<TFormValues extends FieldValues>
  extends Omit<ControlValidatedFormElement<TFormValues>, 'defaultValue'> {
  maxImageSize: number; // Mb
  defaultValue?: string[];
  onChangeDefaultValue?: (defaultImages: string[]) => void;
  label?: string;
  limit?: number;
  modal?: Pick<InputFileModalProps, 'header' | 'label'>;
}
