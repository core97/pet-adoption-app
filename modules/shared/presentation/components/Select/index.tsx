'use client;';

import { useController } from 'react-hook-form';
import ReactSelect, { MultiValue, SingleValue } from 'react-select';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react';
import { SelectOption } from '@shared/presentation/types/select-option';
import { SelectProps, SelectMultiProps } from './Select.interface';
import { selectStyles } from './Select.styles';
import styles from './Select.module.css';

/**
 * TODO:
 * Dar estilos cuando esta deshabilitado y cuando se hace hover
 */
export const Select = <TFormValues extends Record<string, unknown>>({
  control,
  name,
  options,
  defaultValue,
  label,
  rules,
  disabled,
  isLoading,
  isMulti,
  noOptionsMessage,
  onChange,
  onInputChange,
}: SelectProps<TFormValues> | SelectMultiProps<TFormValues>) => {
  const { field, formState } = useController<TFormValues>({
    name,
    control,
    defaultValue,
    rules,
  });

  const handleOnChange = (
    option: MultiValue<SelectOption> | SingleValue<SelectOption>
  ) => {
    if (Array.isArray(option) && isMulti) {
      const selectedOptions = option.map(item => item.value);
      field.onChange(selectedOptions);
      onChange?.(selectedOptions);
    } else if (option !== null && 'value' in option && !isMulti) {
      field.onChange(option.value);
      onChange?.(option.value);
    }
  };

  return (
    <FormControl
      isInvalid={!!formState.errors[field.name]}
      isRequired={!!rules?.required}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}

      <ReactSelect
        isMulti={isMulti}
        id={field.name}
        name={field.name}
        placeholder="Selecciona"
        isDisabled={disabled}
        getOptionLabel={option => option.label}
        value={
          isMulti
            ? options.filter(option => {
                if (
                  Array.isArray(field.value) &&
                  field.value.every(item => typeof item === 'string')
                ) {
                  return field.value.includes(option.value);
                }

                return false;
              })
            : options.find(option => field.value === option.value)
        }
        options={options.filter(option =>
          isMulti
            ? (Array.isArray(defaultValue) ? defaultValue : []).every(
                (item: string) => item !== option.value
              )
            : defaultValue !== option.value
        )}
        onChange={handleOnChange}
        onBlur={field.onBlur}
        isLoading={isLoading}
        // eslint-disable-next-line react/no-unstable-nested-components
        loadingMessage={() => <Spinner />}
        noOptionsMessage={noOptionsMessage}
        onInputChange={onInputChange}
        className={`${styles.select} ${
          formState.errors?.[name] ? styles['select--error'] : ''
        }`}
        styles={selectStyles}
      />

      {formState.errors?.[name]?.message && (
        <FormErrorMessage role="alert">
          {formState.errors?.[name]?.message?.toString()}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
