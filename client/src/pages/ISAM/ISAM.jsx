import { useRef, useEffect } from 'react';
import styles from './ISAM.module.css';
import scroll from './Assets/ISAM_scroll.png';
import award from './Assets/ISAM.jpg';
import poster from './Assets/Poster.png';
import model from './Assets/ISAM_Model.png';

const ISAM = () => {

    const scrollRef = useRef(null);
    const SCROLL_SPEED = 2; // change for faster/slower scrolling
        
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const img = container.querySelector('img');
        if (!img) return;

        const setInitialScroll = () => {
            container.scrollLeft = img.scrollWidth / 32;
        };

        if (img.complete) {
            setInitialScroll();
        } else {
            img.addEventListener('load', setInitialScroll);
        }

        const handleWheel = (e) => {
            const { deltaY } = e;

            const atLeftEdge = container.scrollLeft <= 0;
            const atRightEdge =
            container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

            const scrollingRight = deltaY > 0;
            const scrollingLeft = deltaY < 0;

            // If we're NOT at an edge, force horizontal scrolling
            if (
            (!atLeftEdge && scrollingLeft) ||
            (!atRightEdge && scrollingRight)
            ) {
            e.preventDefault();
            container.scrollLeft += deltaY * SCROLL_SPEED;
            }
            // Otherwise: allow normal vertical scroll
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
            img.removeEventListener('load', setInitialScroll);
        };
    }, []);
    return (
        <div>
            <div className={styles.page}>
                <h1 className={styles.title}>
                    ISAM 2024
                </h1>
                <h1 className={styles.subtitle}>student samples in EcoMaterials library</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave}>
                    <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill="#FFFFFF"/>
                    </svg>
                <div className={styles.scrollContainer} ref={scrollRef}>
                    <img 
                    src={scroll}
                    className={styles.scrollImage}
                    alt='project showcase'
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave2}>
                    <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill="#FFFFFF"/>
                </svg>
            </div>
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