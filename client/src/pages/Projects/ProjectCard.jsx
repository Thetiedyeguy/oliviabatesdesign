import React from 'react';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project, type = 'full' }) => {
  // Timeline Top Variant
  if (type === 'timeline-top') {
    return (
      <div className={`${styles.card} ${styles.cardTimelineTop}`}>
        {/* New wrapper to combine header and image */}
        <div className={styles.timelineWrapper}>
          <div className={styles.timelineHeader}>
            <p className={styles.timelineTitle}>{project.title}</p>
            <p className={styles.timelineDescription}>
              {new Date(project.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}
            </p>
          </div>
          <div className={styles.imageTimeline}>
            {project.imageUrl && (
              <img
                src={project.rectangularImageUrl}
                alt={project.title}
                className={styles.image}
                loading="lazy"
              />
            )}
          </div>
        </div>
      </div>
    );
  } else if (type === 'timeline-bottom') {
    return (
      <div className={`${styles.card} ${styles.cardTimeline}`}>
        <div className={styles.timelineWrapper}>
          <div className={styles.imageTimeline}>
            {project.imageUrl && (
              <img
                src={project.rectangularImageUrl}
                alt={project.title}
                className={styles.image}
                loading="lazy"
              />
            )}
          </div>
          <div className={styles.contentTimeline}>
            {/* New flex container for header items */}
            <div className={styles.timelineHeader}>
              <p className={styles.timelineTitle}>{project.title}</p>
              <p className={styles.timelineDescription}>
                {new Date(project.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className={`${styles.card} ${styles.cardFull}`}>
      <div className={styles.imageFull}>
        {project.imageUrl && (
          <img
            src={project.squareImageUrl}
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
          Read More   →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;