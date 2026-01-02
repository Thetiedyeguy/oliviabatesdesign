import { useRef, useEffect } from 'react';
import styles from "./BioBubbles.module.css";
import scroll from "./assets/BioBubbles_scroll.png";
import video from './assets/video.mp4';
import model from './assets/model.png';
import poster from './assets/biocraftingSeaweedYarn.pdf';

const BioBubbles = () => {
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
                    BioBubbles
                </h1>
                <h1 className={styles.subtitle}>conductive bioplastic string + instruction guide</h1>
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
                    &emsp;&emsp;I developed a DIY conductive, biodegradable string for home <br/>
                    electronics and wearable projects. I shared the instructions on <br/>
                    Instructables, entered the Make It Wearable contest, and won <br/>
                    the Sustainability Prize. <br/>
                    <br/>
                    &emsp;&emsp;I first imagined the project as a mermaid’s top, with a glowing <br/>
                    ‘magic pearl’ that lights up in patterns when touched. To make <br/>
                    the string conductive, I used algae yarn because it can absorb <br/>
                    a lot of added material. My early tests with charcoal powder <br/>
                    showed that the yarn was too porous to carry electricity well. <br/>
                    <br/>
                    &emsp;&emsp;After more research and testing, I switched to using activated <br/>
                    carbon black powder, which worked much better. I kept <br/>
                    adjusting the recipe to find the right balance between <br/>
                    conductivity and flexibility, making the string both effective <br/>
                    and comfortable to wear. <br/>
                    <br/>
                    &emsp;&emsp;With this research, I put together a detailed Instructables <br/>
                    guide so others could try it too. What started as one material <br/>
                    experiment grew into a bigger look at bioplastic strings and <br/>
                    what they can do. I wrapped up the project with a one-page, <br/>
                    black-and-white zine that shows the whole process and offers <br/>
                    different options, so makers can adapt the string to fit their <br/>
                    own projects.
                </p>
            </div>
            <div className={styles.designSection}>
                <img
                    src={model}
                    className={styles.model}
                    alt='model'
                />
                <div className={styles.designText}>
                <h1 className={styles.designTitle}>
                    Design Skills
                </h1>
                <p className={styles.designBody}>
                    <b className={styles.bold}>Magic pearl:</b> <br/>
                    &emsp;&emsp;<i>JavaScript</i> Blufruit Circuit Playground <br/>
                    &emsp;&emsp;<i>Fusion360</i> Light Diffusing Shell & Snap Case <br/>
                    <b className={styles.bold}>Biomaterial:</b> <br/>
                    &emsp;&emsp;<i>Sketched</i> concept for freehand crochet top <br/>
                    &emsp;&emsp;<i>Researched</i> Conductive biodegradable materials <br/>
                    &emsp;&emsp;<i>Improved</i> DIY bioplastic process <br/>
                    &emsp;&emsp;<i>Layout</i> multiple guides for alginate string <br/>
                </p>
                </div>
            </div>
            <video
            src={video}
            className={styles.video}
            autoPlay
            loop
            muted
            controls
            playsInline
            />
            <object
                data={poster}
                type="application/pdf"
                className={styles.poster}
            >NatureNova Poster</object>
        </div>
    );
};

export default BioBubbles;