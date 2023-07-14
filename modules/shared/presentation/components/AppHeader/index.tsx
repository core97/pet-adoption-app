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
import { UserPreferenceDrawer } from '@user/presentation/components/UserPreferenceDrawer';
import { AppNavbarDesktop, AppNavbarMobile } from '@components/AppNavbar';
import styles from './AppHeader.module.css';
import { AppHeaderProps } from './AppHeader.interface';

export const AppHeader = ({ countries }: AppHeaderProps) => {
  const navigationDrawerHandler = useDisclosure();

  const searchPreferenceModalHandler = useDisclosure();

  return (
    <>
      <Container as="header" maxW="container.xl">
        <HStack py={8} justifyContent="space-between">
          <Link href="/">My App</Link>
          <div className={styles['nav-section']}>
            <div className={styles['nav-items']}>
              <AppNavbarDesktop />
            </div>
            <div>
              <Button
                type="button"
                onClick={searchPreferenceModalHandler.onOpen}
                variant="ghost"
              >
                Preferencias
              </Button>
              <Button
                type="button"
                onClick={navigationDrawerHandler.onOpen}
                className={styles['menu-btn']}
              >
                <Icon iconName="menu" />
              </Button>
            </div>
          </div>
        </HStack>
      </Container>
      <UserPreferenceDrawer
        countries={countries}
        isOpen={searchPreferenceModalHandler.isOpen}
        onClose={searchPreferenceModalHandler.onClose}
      />
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
              <AppNavbarMobile />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
