'use client';

import { Box } from '@chakra-ui/react';
import NoSSR from '@components/NoSSR';
import { InputRadioCardProps } from './InputRadioCard.interface';
import styles from './InputRadioCard.module.css';

export const InputRadioCard = <TFormValues extends Record<string, unknown>>({
  id,
  name,
  children,
  register,
  rules,
  errors,
  value,
  defaultChecked,
  ...rest
}: InputRadioCardProps<TFormValues>) => (
  <NoSSR>
    <Box {...rest} as="label" htmlFor={id} className={styles['radio-card']}>
      <input
        id={id}
        name={name}
        type="radio"
        {...(register && register(name, rules))}
        value={value}
        defaultChecked={defaultChecked}
      />
      <Box
        className={`${styles['radio-card__container']} ${
          errors?.[name] ? styles['radio-card__container--error'] : ''
        }`}
      >
        {children}
      </Box>
    </Box>
  </NoSSR>
);
