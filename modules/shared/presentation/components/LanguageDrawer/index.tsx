'use client';

import { FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { Language } from '@shared/domain/languages';
import { LanguageDrawerProps } from './LanguageDrawer.interface';

export const LanguageDrawer = ({ isOpen, onClose }: LanguageDrawerProps) => {
  const router = useRouter();
  const params = useParams();

  const currentLanguage = Array.isArray(params?.lang)
    ? params?.lang[0]
    : params?.lang;

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentLanguage) {
      throw new Error('The current url has no language as parameter');
    }

    const selectedLanguage = (event.target as any).elements.language.value;

    const isValidLanguage = Object.keys(Language).some(
      item => item === selectedLanguage
    );

    if (!isValidLanguage) {
      throw new Error('Selected language not available');
    }

    const regex = new RegExp(`/${currentLanguage}(?=/|$)`);

    const urlToRedirect = window.location.href.replace(
      regex,
      `/${selectedLanguage.toLowerCase()}/`
    );

    router.push(urlToRedirect);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Idioma</DrawerHeader>

        <DrawerBody>
          <form id="languageForm" onSubmit={handleOnSubmit}>
            <FormLabel as="p">Selecciona un idioma</FormLabel>
            <RadioGroup
              name="language"
              defaultValue={currentLanguage?.toUpperCase()}
            >
              <Stack direction="column">
                {Object.keys(Language).map(key => (
                  <Radio key={key} value={key} name="language">
                    {key}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button type="submit" form="languageForm" colorScheme="teal">
            Guardar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
