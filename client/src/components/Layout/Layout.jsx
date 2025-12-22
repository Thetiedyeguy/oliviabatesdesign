import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './Layout.module.css';
import Header from './Header/Header';

const Layout = () => {
  const location = useLocation();
  const invert = location.pathname.startsWith('/about')
  return (
    <div className={`${styles.container} ${invert ? styles.inverted : ''}`}>
      <Header/>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave}>
          <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill={invert ? "#FFFFFF" : "#51604E"}/>
        </svg>
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
