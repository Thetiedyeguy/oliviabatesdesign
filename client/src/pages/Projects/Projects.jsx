import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import ProjectFinder from '../../apis/ProjectFinder';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectFinder.get("/");
        console.log(response);
        setProjects(response.data.data);
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
        console.error('Projects fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  if (error) {
    return <div className={styles.errorMessage}>{error}</div>;
  }

  return (
    <div className={styles.projectsHorizontalScroll}>
      {projects.map((project) => (
        <div className={styles.projectSlide} key={project.id}>
          {/* Each "slide" in the horizontal scroll */}
          <ProjectCard project={project} type="timeline" />
        </div>
      ))}
    </div>
  );
};



export default Projects;
