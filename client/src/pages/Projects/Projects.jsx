import React, { useEffect, useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import ProjectFinder from '../../apis/ProjectFinder';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [lineWidth, setLineWidth] = useState(0)
  const scrollRef = useRef(null)

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

  useEffect(() => {
    if (scrollRef.current) {
      setLineWidth(scrollRef.current.scrollWidth)
    }
  }, [projects])

  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setLineWidth(scrollRef.current.scrollWidth)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  console.log(lineWidth);

  return (
    <div ref={scrollRef} className={styles.projectsHorizontalScroll} style={{'--line-width': `${lineWidth}px`}}>
      <div className={styles.beginningInfo}>
        <p className={styles.intro}>This is work from my time at</p>
        <h1 className={styles.intro}>University of California - Davis</h1>
        <p className={styles.intro}>While persuing a B.A. in Design and a B.A. in Communications</p>
        <div className={styles.timelineSection}>
          <p className={styles.timeline}>Start Fall 2021</p>
          <p className={styles.timeline}>End Winter 2025</p>
        </div>
      </div>
      {projects.map((project, index) => (
        <div className={styles.projectSlide} key={project.id}>
          {/* Each "slide" in the horizontal scroll */}
          <ProjectCard
            project={project}
            type={index % 2 === 0 ? "timeline-top" : "timeline-bottom"}
          />
        </div>
      ))}
    </div>
  );
};



export default Projects;
