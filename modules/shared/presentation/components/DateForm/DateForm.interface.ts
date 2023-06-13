import { FormProps } from '@shared/presentation/types/form-type';

export type DateFormFields = { time: string };

export type DateSubmit = { date: Date };

export type DateDefaultValues = { date: Date };

export type DateFormProps = FormProps<DateSubmit, DateDefaultValues>;
