import styles from './StudyLamp.module.css';
import Header from '../../components/Layout/Header/Header';

const StudyLamp = () => {
    return(
        <div className={styles.page}>
            <Header/>
            <div className={styles.body}>
                <p className={styles.title}>Study Lamp</p>
                <p className={styles.subtitle}>A Lamp To Improve The Study Workflow</p>
                <img
                    src= '/StudyLamp.png'
                    alt="BioBubbles"
                    className={styles.image}
                    loading="lazy"
                />
                <p className={styles.designDescription}>This compact, gesture-controlled desk lamp is designed to create the ideal study environment. Subtle movements guide its functionality: tilt left to dim, right to brighten—no buttons or distractions required. When focus is needed, simply flip the lamp upside down to activate a one-hour study timer. During this session, the lamp monitors your surroundings—if the environment gets too noisy, it flashes a warning to help maintain concentration. Once the work is done, a quick shake switches the lamp into chill mode, casting a calming glow to help you unwind. Smart, intuitive, and responsive—this lamp adapts to your rhythm of work and rest.</p>
                <div className={styles.mediaRow}>
                    <img
                        src='/StudyLamp_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src='/StudyLamp_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                </div>
                <div className={styles.mediaRow}>
                    <img
                        src='/StudyLamp_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src='/StudyLamp_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                </div>
                <div className={styles.fabricationSection}>
                    <p className={styles.fabrication}>Fabrication</p>
                    <p className={styles.fabricationDescription}>The lamp’s 3D-printed shell is composed of three modular pieces, seamlessly held together with embedded magnets. The middle section features a built-in rail to secure the LED strip, which connects directly to a Circuit Playground microcontroller housed at the core. Programmed using Adafruit’s JavaScript environment, the electronics bring the gesture-based interactions to life. To access the internal components or make adjustments, simply twist the lamp to release the magnetic closure—no tools required.</p>
                </div>
                <div className={styles.finalMedia}>
                    <img
                        src='/StudyLamp.png'
                        alt="BioBubbles"
                        className={styles.showcaseImgWide}
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default StudyLamp;