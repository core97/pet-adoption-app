'use client';

import { SidebarProps } from './Sidebar.interface';
import styles from './Sidebar.module.css';

export const Sidebar = ({ children, navigation, header }: SidebarProps) => (
  <aside>
    <section className={styles.navigation}>{navigation}</section>
    <section className={styles['content-wrapper']}>
      {!!header && header}
      <main className={styles.main}>
        {children}
      </main>
    </section>
  </aside>
);

export * from './Sidebar.interface';
