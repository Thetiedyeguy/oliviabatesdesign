import styles from './BioBubbles.module.css';
import Header from '../../components/Layout/Header/Header';

const BioBubbles = () => {
    return(
        <div className={styles.page}>
            <Header/>
            <div className={styles.body}>
                <p className={styles.title}>BioBubbles</p>
                <p className={styles.subtitle}>Conductive Biodegradable String</p>
                <img
                    src= '/HeroImage_BioBubbles_16_9.png'
                    alt="BioBubbles"
                    className={styles.image}
                    loading="lazy"
                />
                <p className={styles.designDescription}>BioBubbles is a shimmering, mermaid-inspired top crafted from an alginate-based bioplastic made from seaweed and accented with a glowing, 3D-printed pearl. The bioplastic forms through a reactive process: when sodium alginate meets a calcium chloride solution, it instantly gels into flexible, noodle-like strands. These strands cure into a durable, moldable material that can be crocheted or knitted into wearable forms. What sets BioBubbles apart is its exploration of conductivity within biodegradable materials—pushing the boundaries of what sustainable fashion can do. This piece merges science, craft, and environmental consciousness into a luminous, oceanic statement</p>
                <div className={styles.mediaRow}>
                    <img
                        src='/BioBubbles_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src='/BioBubbles_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                    <img
                        src='/BioBubbles_Square.png'
                        alt="BioBubbles"
                        className={styles.showcaseImg}
                        loading="lazy"
                    />
                </div>
                <p className={styles.materialDescription}>By infusing the bioplastic with conductive materials like carbon black and titanium dioxide, BioBubbles demonstrates the potential of sustainable alternatives for single-use electronics. The black bioplastic strands aren’t just decorative—they're interactive. When touched, they trigger captivating light animations within the pearl: Spinning Rainbow, a kaleidoscopic swirl of colors; Dim to Bright, a gentle glow that slowly intensifies; and Smooth Shifting Colors, a seamless dance between vibrant hues. This integration of responsiveness and biodegradability reimagines wearable technology through an eco-conscious lens.</p>
                <div className={styles.fabricationSection}>
                    <p className={styles.fabrication}>Materials</p>
                    <p className={styles.fabricationDescription}>Curious to create your own conductive bioplastic? Follow my step-by-step guide on Instructables to craft biodegradable string that brings your designs to life: https://www.instructables.com/Biodegradable-Magic-Mermaid-Top/</p>
                </div>
                <div className={styles.fashionExhibit}>
                    <img
                        src='/HeroImage_BioBubbles_16_9.png'
                        alt="BioBubbles"
                        className={styles.showcaseImgWide}
                        loading="lazy"
                    />
                    <p className={styles.fashionText}>
                        FADS Fashion Exhibit at the UC Davis Picnic Day
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default BioBubbles;