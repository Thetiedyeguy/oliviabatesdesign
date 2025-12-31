import { useRef, useEffect } from 'react';
import styles from "./Parklet.module.css";
import scroll from "./assets/Parklet_scroll.jpg"
import collage1 from './assets/9.png';
import collage2 from './assets/8.png';
import collage3 from './assets/7.png';
import collage4 from './assets/6.png';
import collage5 from './assets/5.png';

const Parklet = () => {
    const scrollRef = useRef(null);
      const SCROLL_SPEED = 2; // change for faster/slower scrolling
    
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
    
        const img = container.querySelector('img');
        if (!img) return;
    
        // Function to set initial scroll to midway
        const setInitialScroll = () => {
          container.scrollLeft = img.scrollWidth / 32;
        };
    
        // If image is already loaded
        if (img.complete) {
          setInitialScroll();
        } else {
          img.addEventListener('load', setInitialScroll);
        }
    
        // Mouse wheel horizontal scrolling
        const handleWheel = e => {
          e.preventDefault();
          container.scrollLeft += e.deltaY * SCROLL_SPEED;
        };
    
        container.addEventListener('wheel', handleWheel, { passive: false });
    
        return () => {
          container.removeEventListener('wheel', handleWheel);
          img.removeEventListener('load', setInitialScroll);
        };
    }, []);
    return(
        <div>
            <div className={styles.page}>
                <h1 className={styles.title}>
                    Parklet
                </h1>
                <h1 className={styles.subtitle}>imagined parklet in local shopping district</h1>
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
            <div className={styles.projectSection}>
                <h1 className={styles.projectTitle}>
                    Project
                </h1>
                <p className={styles.projectText}>
                    &emsp;&emsp;This parklet is designed for Downtown Davis, outside a <br/>
                    group of restaurants and coffee shops that have limited indoor <br/>
                    seating and not much outdoor space. Since Davis is a college <br/>
                    town with great biking infrastructure, gathering spaces are <br/>
                    more important than car parking. My project suggests making <br/>
                    the temporary parklets from the pandemic a permanent part of <br/>
                    downtown. <br/>
                    <br/>
                    &emsp;&emsp;The design uses open, woven features and a flowing shape <br/>
                    to create a structure that lets in both shade and light. The <br/>
                    parklet is fully ADA compliant and provides spots to sit or <br/>
                    stand while eating, making it comfortable for both large <br/>
                    groups and smaller gatherings. <br/>

                    To learn more about how the structure works in real life, <br/>
                    we built a full-size section of the parklet. We made the <br/>
                    prototype out of cardboard with a CNC machine, which helped <br/>
                    us study how light, shade, and enclosure feel at human scale. <br/>
                    <br/>
                    This was my first time working on a team project, and I <br/>
                    collaborated with two others. We took the best parts from each <br/>
                    of our three original designs and brought them together into <br/>
                    one unified parklet.
                </p>
            </div>
            <div className={styles.collage}>
                <div className={styles.collageColumn1}>
                    <img
                        src={collage5}
                        className={styles.collageBig}
                        alt='Parklet1'
                    />
                    <img
                        src={collage4}
                        className={styles.collageBig}
                        alt='Parklet2'
                    />
                </div>
                <div className={styles.collageColumn2}>
                    <div className={styles.collageRow}>
                        <img
                        src={collage3}
                        className={styles.collageSmall}
                        alt='Parklet3'
                        />
                        <img
                            src={collage2}
                            className={styles.collageSmall}
                            alt='Parklet4'
                        />
                    </div>
                    <img
                        src={collage1}
                        className={styles.collageBig}
                        alt='Parklet5'
                    />
                </div>
            </div>
            <div className={styles.compostSection}>
                <img
                src={collage3}
                className={styles.prototype}
                alt='prototype'
                />
                <div className={styles.compostText}>
                <h1 className={styles.compostTitle}>
                    Design Skills
                </h1>
                <p className={styles.compostBody}>
                    <b className={styles.bold}>Programs:</b> <br/>
                    &emsp;&emsp;<i>Rhino</i> sketch different shade structure layouts <br/>
                    &emsp;&emsp;<i>Photoshop</i> rendered parklet for visual aid <br/>
                    &emsp;&emsp;<i>Illustrator</i> exploded view <br/>
                </p>
                </div>
            </div>
        </div>
    );
};

export default Parklet;