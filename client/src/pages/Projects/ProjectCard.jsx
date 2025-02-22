import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  return (
    <a 
      href={project.projectUrl} 
      className={styles.cardLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} project`}
    >
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className={styles.image}
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.meta}>
            {project.date && (
              <time className={styles.date}>
                {new Date(project.date).toLocaleDateString()}
              </time>
            )}
          </div>
          {project.tags && (
            <div className={styles.tags}>
              {project.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </a>
  );
};

export default ProjectCard;