import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.logo}>
            Portfolio
          </Link>
          <div className={styles.navLinks}>
            <Link to="/projects" className={styles.navLink}>
              Projects
            </Link>
            <Link to="/contact" className={styles.navLink}>
              Contact
            </Link>
          </div>
        </nav>
      </header>

      <main className={styles.main}><Outlet /></main>

      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Design Portfolio</p>
      </footer>
    </div>
  );
};

export default Layout;