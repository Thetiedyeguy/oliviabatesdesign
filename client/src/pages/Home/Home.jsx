import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import ProjectFinder from '../../apis/ProjectFinder';
import AlternatingText from '../../components/AlternatingText';
import BubbleSection from '../../components/Bubbles/BubbleSection';

const Home = () => {


  const [bubbleData, setBubbleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await ProjectFinder.get("/");
        console.log(response)
        const bubbles = response.data.data.map(project => ({
          id: Number(project.id),
          type: 'project',
          title: project.title,
          subtitle: project.subtitle,
          link: `/${project.title}`,
          image: project.squareImageUrl,
          opacity: Number(project.bg_opacity),
          radius: Number(project.radius) || 20,
          x: Number(project.x_position) || 0.7,
          y: Number(project.y_position) || 0.7
        }));
        
        setBubbleData(bubbles);
        console.log(bubbleData);
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
        <div className={styles.greetingLine}>
          <p className={styles.greeting}>
            I am
          </p>
          <AlternatingText
            text="Olivia Bates"
            className={styles.name}
          />
        </div>
        <p className={styles.desc}>
          Failure is the first step to success
        </p>
        <svg xmlns="http://www.w3.org/2000/svg" width="1922.662" height="149.14" viewBox="0 0 1922.662 149.14" className={styles.wave}>
          <path id="Path_2" data-name="Path 2" d="M-1964.391,3364.859c171.981-18.918,137.505-72.884,254.972-51.543s181.692,99.866,250.417,60.424,115.442-70.809,190.246-42.215,220.585,69.069,346.6,35.968,169.185-67.011,303.356-54.177,153.151,70.226,220.986,75.152,136-62.525,255.809-20.975,98.422-15.654,99.326-37.367,0-89.24,0-89.24l-1921.715-1.3Z" transform="translate(-41.729 3388.727) rotate(180)" fill="#51604e"/>
        </svg>
      </section>
      <section className={styles.featured}>
        <p className={styles.featuredTitle}>
          PROJECTS
        </p>
        <p className={styles.projectSubtitle}>
          UC Davis 2021-25
        </p>
        <p className={styles.projectDescription}>
          Product Design
        </p>
        <p className={styles.projectDescription}>
          Communications
        </p>
      </section>
      <section className={styles.projectsGrid}>
        <div className={styles.projectsGrid}>
          <BubbleSection
            bubbleData={bubbleData}
          />
        </div>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave2}>
        <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill="#51604e"/>
      </svg>
    </div>
  );
};

export default Home;