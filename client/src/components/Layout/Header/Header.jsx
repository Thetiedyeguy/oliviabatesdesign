import styles from './Header.module.css';
import { NavLink, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ProjectFinder from '../../../apis/ProjectFinder';

const Header = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectFinder.get('/');
        setProjects(response.data.data); // make sure this matches your API shape
      } catch (err) {
        console.error('Projects fetch error:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.navLink
            }
          >
            about
          </NavLink>

          {/* Dropdown */}
          <div
            className={styles.dropdown}
          >
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.navLink
              }
            >
              portfolio
            </NavLink>
            <p
              className={styles.hamburger}
              onMouseDown={() => setOpen(!open)}
            >
              {open ? '✗' : '☰'}
            </p>

            {open && (
              <div className={styles.dropdownMenu}>
                {projects.map(project => (
                  <Link
                    key={project.id}
                    to={`/${project.title}`}
                    className={styles.dropdownItem}
                  >
                    {project.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
