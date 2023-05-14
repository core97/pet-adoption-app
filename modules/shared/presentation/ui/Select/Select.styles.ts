import { StylesConfig } from 'react-select';
import { SelectOption } from '@shared/presentation/types/select-option';

export const selectStyles: StylesConfig<SelectOption> = {
  control: (provided, state) => {
    const newStyles = {
      ...provided,
      borderColor: 'transparent',
      outline: 'none',
      borderRadius: '0.375rem',
      paddingInline: '1rem',
    };

    newStyles.backgroundColor = state.isFocused ? 'white' : '#edf2f7';

    return newStyles;
  },
  placeholder: provided => ({
    ...provided,
    color: '#a0aec0',
  }),
};
