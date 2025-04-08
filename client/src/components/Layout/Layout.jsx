import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <NavLink 
              to="/" 
              end
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/about"
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              ABOUT
            </NavLink>
            <NavLink 
              to="/projects"
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              TIMELINE
            </NavLink>
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
