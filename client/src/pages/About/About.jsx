import styles from './About.module.css';
import aboutMe from './Assets/aboutme.jpg'

const About = () => {
    return(
        <div className = {styles.page}>
            <img
                src={aboutMe}
                className={styles.aboutMeImage}
            />
        </div>
    );
};

export default About;