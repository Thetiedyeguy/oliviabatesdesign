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
        console.log(response)
        setProjects(response.data.data)
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
    <div className={styles.projectsContainer}>
      <h1 className={styles.pageTitle}>Work</h1>
      <p className={styles.description}>I’m a recent graduate of UC Davis, where I got to explore the exciting intersection of interactive products and innovative materials. I love designing solutions that are not just functional but also sustainable, using cutting-edge materials to create engaging, thoughtful designs. Here are some of my favorite projects!</p>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;