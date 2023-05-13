'use client';

import { Container } from '@chakra-ui/react';
import { SidebarProps } from './Sidebar.interface';
import styles from './Sidebar.module.css';

export const Sidebar = ({ children, navigation, header }: SidebarProps) => (
  <aside>
    <section className={styles.navigation}>{navigation}</section>
    <section className={styles['content-wrapper']}>
      {!!header && header}
      <main className={styles.main}>
        <Container maxW="xl">{children}</Container>
      </main>
    </section>
  </aside>
);

export * from './Sidebar.interface';
