'use client';

import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import { Icon } from '@components/Icon';
import { AppNavbar } from '@components/AppNavbar';
import { ProfileNavbar } from '@components/ProfileNavbar';
import { LanguageDrawer } from '@components/LanguageDrawer';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  const navigationDrawerHandler = useDisclosure();

  const languageDrawerHandler = useDisclosure();

  return (
    <>
      <Container as="header" maxW="container.xl">
        <HStack py={8} justifyContent="space-between">
          <Link href="/">My App</Link>
          <div className={styles['nav-section']}>
            <div className={styles['nav-items']}>
              <AppNavbar direction="row" />
            </div>
            <div>
              <Button
                type="button"
                variant="ghost"
                onClick={languageDrawerHandler.onOpen}
              >
                Idioma
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={navigationDrawerHandler.onOpen}
                className={styles['menu-btn']}
              >
                <Icon iconName="menu" />
              </Button>
            </div>
          </div>
        </HStack>
      </Container>
      <Drawer
        isOpen={navigationDrawerHandler.isOpen}
        placement="right"
        onClose={navigationDrawerHandler.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My App</DrawerHeader>
          <DrawerBody>
            <VStack mt={8}>
              <AppNavbar direction="column" />
              <ProfileNavbar />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LanguageDrawer
        isOpen={languageDrawerHandler.isOpen}
        onClose={languageDrawerHandler.onClose}
      />
    </>
  );
};
