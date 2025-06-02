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
        </div>
    )
}

export default Header;