import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Change to NavLink
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
            <NavLink 
              to="/" 
              end // Add this for exact match
              className={styles.logo}
            >
              Lassie Charms
            </NavLink>
          <div className={styles.navLinks}>
            <NavLink 
              to="/" 
              end // Add this for exact match
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              HOME
            </NavLink>
            <NavLink 
              to="/projects"
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              WORK
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
              to="/contact"
              className={({ isActive }) => 
                isActive ? styles.activeLink : styles.navLink
              }
            >
              CONTACT
            </NavLink>
          </div>
        </nav>
      </header>

      <main className={styles.main}><Outlet /></main>

      {/* <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Design Portfolio</p>
      </footer> */}

    </div>
  );
};

export default Layout;