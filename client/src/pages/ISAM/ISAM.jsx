import styles from './ISAM.module.css';
import scroll from './Assets/Scroll_ISAM.pdf';
import award from './Assets/ISAM.jpg';
import poster from './Assets/Poster.png';
import model from './Assets/ISAM_Model.png';

const ISAM = () => {
    return (
        <div>
            <div className={styles.page}>
                <h1 className={styles.title}>
                    ISAM 2024
                </h1>
                <h1 className={styles.subtitle}>
                    student samples in EcoMaterials libary
                </h1>
            </div>
            <object
                data={scroll}
                type="application/pdf"
                width="100%"
                height="800px"
            >
            </object>
            <div className={styles.awardSection}>
                <div className={styles.awardInfo}>
                    <h1 className={styles.awardTitle}>
                        Project
                    </h1>
                    <p className={styles.awardText}>
                        &emsp;&emsp;ISAM 2024 marked an epic <br/>
                        conclusion to what began as an <br/>
                        independent study. <br/>
                        <br/>
                        &emsp;&emsp;While researching improvements <br/>
                        to NatureNova biofoam children’s toys,
                    </p>
                </div>
                <img
                    src = {award}
                    alt='award'
                    className={styles.award}
                />
            </div>
            <p className={styles.projectText}>
                our team began experimenting with dual-casting materials. <br/>
                Those early material questions led us to the UC Davis <br/>
                EcoMaterials Library, which became the backbone of our <br/>
                research process. <br/>
                <br/>
                &emsp;&emsp;As we worked with the library, gaps in access and <br/>
                documentation became impossible to ignore. Wanting to give <br/>
                back to the system that supported our work, our team expanded <br/>
                the library by cataloging samples online and streamlining the <br/>
                submission system.
            </p>
            <img
                src={poster}
                alt='poster'
                className={styles.poster}
            />
            <div className={styles.modelSection}>
                <img
                    src={model}
                    alt='design model'
                    className={styles.model}
                />
                <div className={styles.modelText}>
                    <h1 className={styles.modelTitle}>
                        Design Skills
                    </h1>
                    <h2 className={styles.modelHeader}>
                        EcoMaterial Library
                    </h2>
                    <p className={styles.modelBodyText}>
                        <i className={styles.i}>Wordpress</i> use existing branding to organize layout <br/>
                        <i className={styles.i}>Photoshop</i> photograph and edit sample photos 
                    </p>
                    <h2 className={styles.modelHeader}>
                        Poster Layout:
                    </h2>
                    <p className={styles.modelBodyText}>
                        <i>Illustrator & Photoshop</i> <br/>
                        &emsp;&emsp;website inspired layout with sustainability- <br/>
                        &emsp;&emsp;focused color palette 
                    </p>
                    <h2 className={styles.modelHeader}>
                        Biomaterial:
                    </h2>
                    <p className={styles.modelBodyText}>
                        <i>Sketched</i> concept for stacking toys <br/>
                        <i>Researched</i> the market for biofoam toys, and <br/>
                        &emsp;&emsp;plastic waste produced from toys <br/>
                        <i>Improved</i> student resource for better biomaterial <br/>
                        &emsp;&emsp;research and conceptualization <br/>
                        <i>Present</i> the project to the conference for further <br/>
                        &emsp;&emsp;growth of the EcoMaterials Library <br/>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ISAM;