'use client';

import { Box } from '@chakra-ui/react';
import NoSSR from '@components/NoSSR';
import { InputRadioProps } from './InputRadio.interface';
import styles from './InputRadio.module.css';

export const InputRadio = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  children,
  register,
  rules,
  errors,
  value,
  defaultChecked,
  ...rest
}: InputRadioProps<TFormValues>) => (
  <NoSSR>
    <Box as="label" htmlFor={id} className={styles.radio}>
      <input
        id={id}
        name={name}
        type="radio"
        {...(register && register(name, rules))}
        value={value}
        defaultChecked={defaultChecked}
      />
      <Box
        {...rest}
        className={`${styles.radio__container} ${
          errors?.[name] ? styles['radio__container--error'] : ''
        }`}
      >
        <Box className={styles.radio__point} />
        {children}
      </Box>
    </Box>
  </NoSSR>
);
