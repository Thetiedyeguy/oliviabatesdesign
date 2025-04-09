import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
