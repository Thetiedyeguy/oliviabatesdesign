import { useRef, useEffect } from 'react';
import styles from "./MystiFrog.module.css";
import scroll from "./assets/MystiFrog_scroll.png";
import video from './assets/video.mov';

const MystiFrog = () => {
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
                    Mysti-Frog
                </h1>
                <h1 className={styles.subtitle}>interactive toy wizard frog in a jar</h1>
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
                    &emsp;&emsp;We began learning about electronics by drawing inspiration <br/>
                    from a children’s toy called a fairy in a jar. In the original toy, <br/>
                    you move the jar around the room until a small LED screen <br/>
                    shows that a fairy has been “captured,” but nothing else <br/>
                    happens. We wanted to make it feel more magical by creating <br/>
                    an object that reacts in different ways to touch and movement. <br/>
                    <br/>
                    &emsp;&emsp;We put animated lights inside the jar that respond to different <br/>
                    gestures. If you shake the jar, a red light flashes. Turning it <br/>
                    upside down creates a swirling pink animation. When you hold <br/>
                    the jar sideways in your arms, soft pink “love” lights appear. <br/>
                    Tapping the bottom makes the character release a burst of <br/>
                    magic, shown as a yellow swirl. <br/>
                    <br/>
                    &emsp;&emsp;I created the mystical frog character using polymer clay, added <br/>
                    resin wings, and painted it by hand. I also programmed the <br/>
                    light animations in JavaScript for the Circuit Playground, <br/>
                    which controls the LED strip inside the jar. <br/>
                    <br/>
                    &emsp;&emsp;This was the first of two projects our team finished. Working on <br/>
                    a toy let us experiment and learn about electronics and <br/>
                    software in a fun way, and we discovered both what they could <br/>
                    do and where they had limits. The lessons from this project <br/>
                    helped us with our next one, the Study Lamp, which was more <br/>
                    polished and aimed to be a real product. <br/>
                </p>
            </div>
            <div className={styles.designSection}>
                <video
                src={video}
                className={styles.video}
                autoPlay
                loop
                muted
                controls
                playsInline
                />
                <div className={styles.designText}>
                <h1 className={styles.designTitle}>
                    Design Skills
                </h1>
                <p className={styles.designBody}>
                    <b className={styles.bold}>Ideation:</b> <br/>
                    &emsp;&emsp;<i>research</i> existing toy and key features <br/>
                    &emsp;&emsp;<i>sketch</i> electronics design <br/>
                    <b className={styles.bold}>Program:</b> <br/>
                    &emsp;&emsp;<i>Adafruit</i> program Circuit Playground w/ JavaScript <br/>
                    &emsp;&emsp;<i>Illustrator</i> laser cut base for Mysti-Frog <br/>
                </p>
                </div>
            </div>
        </div>
    );
};

export default MystiFrog;