import { useRef, useEffect } from 'react';
import styles from "./DripDrop.module.css";
import scroll from "./assets/DripDrop_scroll.jpg";
import prototype from "./assets/DripDrop_model.png"

const DripDrop = () => {
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
                    Drip Drop
                </h1>
                <h1 className={styles.subtitle}>first 3D print: push top lamp</h1>
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
                    &emsp;&emsp;This lamp takes its inspiration from the instant a raindrop <br/>
                    hits water. It works as both a decorative piece and a practical <br/>
                    light for a bedside table or bookshelf, capturing the look of a <br/>
                    water splash frozen in time. <br/>
                    <br/>
                    &emsp;&emsp;You can control the light either with a remote or by <br/>
                    pressing the ripple dome, which changes the color between <br/>
                    white, red, green, and blue. The dome sits on a simple track, so <br/>
                    you can lift it off to replace the battery without changing the <br/>
                    lamp’s shape. <br/>
                    <br/>
                    &emsp;&emsp;This was my first time creating a 3D-printed model. I used <br/>
                    jewelry-making tutorials to learn the modeling skills needed <br/>
                    for smooth curves and accurate fits. The lamp features a 3D- <br/>
                    printed ripple dome and a laser-cut base, with a 3” × 3” push <br/>
                    light inside a 5” × 5” frame.
                </p>
            </div>
            <div className={styles.designSection}>
                <img
                src={prototype}
                className={styles.prototype}
                alt='prototype'
                />
                <div className={styles.designText}>
                <h1 className={styles.designTitle}>
                    Design Skills
                </h1>
                <p className={styles.designBody}>
                    <b className={styles.bold}>Programs:</b> <br/>
                    &emsp;&emsp;<i>Sketch</i> water-inspired light fixtures <br/>
                    &emsp;&emsp;<i>Rhino</i> model water splash shell and ripple diffuser <br/>
                    &emsp;&emsp;<i>Illustrator</i> laser cut template for base. <br/>
                </p>
                </div>
            </div>
        </div>
    );
};

export default DripDrop;