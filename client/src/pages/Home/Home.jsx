import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import ProjectFinder from '../../apis/ProjectFinder';
import ProjectCard from '../Projects/ProjectCard';

const Home = () => {


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

  // return (
  //   <div className={styles.projectsContainer}>
  //     <h1 className={styles.pageTitle}>Design Projects</h1>
  //     <div className={styles.projectsGrid}>
  //       {projects.map((project) => (
  //         <ProjectCard key={project.id} project={project} />
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className ={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Innovating with materials for a greener tomorrow</h1>
        <p className={styles.subtitle}>Hello! I’m Olivia Bates, a product and material designer dedicated to sustainable innovation. I explore the intersection of design, functionality, and eco-conscious materials to create products that are both beautiful and responsible.</p>
        <Link to ="/projects" className={styles.link}>Peruse My Portfolio =&gt;</Link>
      </section>
      <section className={styles.featured}>
      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} type='simplistic'/>
        ))}
      </div>
      </section>
    </div>
  );
};

export default Home;