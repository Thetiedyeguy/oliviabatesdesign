import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Design Portfolio</h1>
      <p className={styles.subtitle}>Showcasing creative solutions</p>
    </section>
  );
};

export default Home;