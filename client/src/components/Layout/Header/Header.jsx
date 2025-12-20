import styles from './Header.module.css';
import { NavLink} from 'react-router-dom';

const Header = () => {
    return(
        <div>
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
                        portfolio
                    </NavLink>
                    <NavLink 
                        to="/about"
                        className={({ isActive }) => 
                        isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        about
                    </NavLink>
                    <NavLink 
                        to="/projects"
                        className={({ isActive }) => 
                        isActive ? styles.activeLink : styles.navLink
                        }
                    >
                        skills
                    </NavLink>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header;