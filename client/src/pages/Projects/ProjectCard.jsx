import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, type = 'full' }) => {
  if (type === 'simplistic') {
    return (
      <a 
        href={project.projectUrl} 
        className={styles.cardLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} project`}
      >
        <article className={`${styles.card} ${styles.cardSimplistic}`}>
          <h3 className={styles.simplisticTitle}>{project.title}</h3>
          <div className={styles.imageSimplistic}>
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className={styles.image}
                loading="lazy"
              />
            )}
          </div>
        </article>
      </a>
    );
  }

  return (
    <div className={`${styles.card} ${styles.cardFull}`}>
      <div className={styles.imageFull}>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.title}
            className={styles.image}
            loading="lazy"
          />
        )}
      </div>
      <div className={styles.contentFull}>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.description}>{project.description}</p>
        <a
          href={project.projectUrl}
          className={styles.fullButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          See More →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;