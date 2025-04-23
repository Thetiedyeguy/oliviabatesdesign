import styles from './Showcase.module.css';
import { NavLink, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react'

const Showcase = () => {

    const { title } = useParams()
    const [project, setProject] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState(null)

    useEffect(() => {
        const fetchProject = async () => {
          try {
            const all = await fetch('/api/projects').then(r=>r.json())
            const found = all.data.find(p => p.title===title)
            setProject(found)
    
          } catch (err) {
            console.error(err)
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }
        fetchProject()
      }, [title])

    if (loading) return <div className={styles.loading}>Loading…</div>
    if (error)   return <div className={styles.error}>Oops: {error}</div>
    if (!project) return <div className={styles.error}>No project matched “{title}”</div>

    return(
        <div className={styles.page}>
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
            <div className={styles.body}>
                <p className={styles.title}>{project.title}</p>
                <p className={styles.subtitle}>{project.subtitle}</p>
                <img
                    src={project.rectangularImageUrl}
                    alt={project.title}
                    className={styles.image}
                    loading="lazy"
                />
                <p className={styles.designDescription}>{project.designDescription || 'Design Description'}</p>
                <div className={styles.mediaRow}>
                    <img
                        src={project.showcaseImg1}
                        alt={project.title}
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src={project.showcaseImg2}
                        alt={project.title}
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src={project.showcaseImg3}
                        alt={project.title}
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                </div>
                <p className={styles.materialDescription}>{project.materialDescription || 'Material Description'}</p>
                <div className={styles.fabricationSection}>
                    <p className={styles.fabrication}>Fabrication</p>
                    <p className={styles.fabricationDescription}>{project.fabricationDescription || 'Fabrication Process'}</p>
                </div>
                <div className={styles.finalMedia}>
                    <img
                        src={project.showcaseImg4}
                        alt={project.title}
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src={project.showcaseImg5}
                        alt={project.title}
                        className={styles.showcaseImgWide}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default Showcase;