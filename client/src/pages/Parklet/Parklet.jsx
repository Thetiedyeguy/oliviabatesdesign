import { useRef, useEffect } from 'react';
import styles from "./Parklet.module.css";
import scroll from "./assets/Parklet_scroll.png";
import collage from './assets/collage.png';
import model from './assets/3D model.png';
import render from './assets/Render.png';
import plan from './assets/plan.png';


const Parklet = () => {
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
                    <br/>
                    &emsp;&emsp;To learn more about how the structure works in real life, <br/>
                    we built a full-size section of the parklet. We made the <br/>
                    prototype out of cardboard with a CNC machine, which helped <br/>
                    us study how light, shade, and enclosure feel at human scale. <br/>
                    <br/>
                    &emsp;&emsp;This was my first time working on a team project, and I <br/>
                    collaborated with two others. We took the best parts from each <br/>
                    of our three original designs and brought them together into <br/>
                    one unified parklet.
                </p>
            </div>
            <img
                src={collage}
                className={styles.collage}
                alt='collage'
            />
            <div className={styles.designSection}>
                <div className={styles.prototypeContainer}>
                    <img
                    src={model}
                    className={styles.prototype}
                    alt='prototype'
                    />
                </div>
                <div className={styles.designText}>
                    <h1 className={styles.designTitle}>
                        Design Skills
                    </h1>
                    <p className={styles.designBody}>
                        <b className={styles.bold}>Programs:</b> <br/>
                        &emsp;&emsp;<i>Rhino</i> sketch different shade structure layouts <br/>
                        &emsp;&emsp;<i>Photoshop</i> rendered parklet for visual aid <br/>
                        &emsp;&emsp;<i>Illustrator</i> exploded view <br/>
                    </p>
                    <img
                        src={render}
                        className={styles.render}
                        alt='render'
                    />
                </div>
            </div>
            <img
                src={plan}
                className={styles.plan}
                alt='plan'
            />
        </div>
    );
};

export default Parklet;