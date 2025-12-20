import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p className={styles.footerTitle}>
          Get in touch
        </p>
        <p className={styles.footerText}>
          661.234.0285
        </p>
        <p className={styles.footerText}>
          obates1206@gmail.com
        </p>
        <p className={styles.footerText}>
          https://www.linkedin.com/in/olivia-bates-032583327
        </p>
      </footer>
    </div>
  );
};

export default Layout;
