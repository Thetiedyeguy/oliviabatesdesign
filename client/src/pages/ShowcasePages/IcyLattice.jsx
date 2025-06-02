import styles from './StudyLamp.module.css';
import Header from '../../components/Layout/Header/Header';

const StudyLamp = () => {
    return(
        <div className={styles.page}>
            <Header/>
            <div className={styles.body}>
                <p className={styles.title}>Icy Lattice</p>
                <p className={styles.subtitle}>Nature Inspired 3D Printed Fabric</p>
                <img
                    src= '/StudyLamp.png'
                    alt="BioBubbles"
                    className={styles.image}
                    loading="lazy"
                />
                <p className={styles.designDescription}>Inspired by the intricate symmetry of snowflakes, this modular 3D-printed fabric transforms a single repeating unit into a radial, scalable textile. The design can be printed on its own to create a soft, stretchy lattice that mimics the flexibility of fabric while maintaining structure. For added durability or hybrid applications, the pattern can also be printed directly onto stretch or non-stretch textiles—resulting in a layered material that’s both structured and pliable. This fusion of nature-inspired geometry and digital fabrication explores new possibilities for wearable and sculptural design.</p>
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
                <img
                    src= '/StudyLamp.png'
                    alt="BioBubbles"
                    className={styles.image}
                    loading="lazy"
                />
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
                <img
                    src= '/StudyLamp.png'
                    alt="BioBubbles"
                    className={styles.image}
                    loading="lazy"
                />
            </div>
        </div>
    );
};

export default StudyLamp;