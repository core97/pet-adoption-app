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
import { Icon } from '@ui/Icon';
import {
  AppNavbarDesktop,
  AppNavbarMobile,
} from '@components/AppNavbar';
import styles from './AppHeader.module.css';

export const AppHeader = () => {
  const navigationDrawerHandler = useDisclosure();

  return (
    <>
      <Container as="header" maxW="container.xl">
        <HStack py={8} justifyContent="space-between">
          <Link href="/">My App</Link>
          <div className={styles['nav-section']}>
            <div className={styles['nav-items']}>
              <AppNavbarDesktop />
            </div>
            <div className={styles['menu-btn']}>
              <Button type="button" onClick={navigationDrawerHandler.onOpen}>
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
              <AppNavbarMobile />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
