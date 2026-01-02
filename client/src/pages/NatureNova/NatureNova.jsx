import { useRef, useEffect } from 'react';
import styles from "./NatureNova.module.css";
import scroll from "./assets/NatureNova_scroll.png";
import cutout from './assets/cutout.png';
import book from './assets/Process Book Project.pdf';
import poster from './assets/NatureNova_Poster.pdf';

const NatureNova = () => {
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
                    NatureNova
                </h1>
                <h1 className={styles.subtitle}>exploration in popup cards and electronics</h1>
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
                    &emsp;&emsp;For certain products, bioplastics are a better option, and <br/>
                    children’s toys are a good example. Nearly 80% of toys become <br/>
                    plastic waste in landfills within a year. <br/>
                    <br/>
                    To address this, we looked at different types of toys and <br/>
                    materials, and designed building blocks made from gelatin. <br/>
                    This biopolymer makes the blocks edible and safer for children <br/>
                    than regular plastic toys, which can be dangerous if swallowed. <br/>
                    <br/>
                    If kept in a dry, cool place, the blocks will last at least a <br/>
                    year. Their stacking shape makes them easy to make with 3D- <br/>
                    printed molds, and the material can be made at home from <br/>
                    basic kitchen ingredients. This gives parents a sustainable DIY <br/>
                    toy that is also easy to fix. Broken or worn blocks can be <br/>
                    melted down, recast, or composted at home, which helps the <br/>
                    toy last longer and keeps materials in use.
                </p>
            </div>
            <div className={styles.designSection}>
                <img
                src={cutout}
                className={styles.prototype}
                alt='cutout'
                />
                <div className={styles.designText}>
                <h1 className={styles.designTitle}>
                    Design Skills
                </h1>
                <p className={styles.designBody}>
                    <b className={styles.bold}>Programs:</b> <br/>
                    &emsp;&emsp;<i>Sketch</i> bioplastic-inspired projects and toys <br/>
                    &emsp;&emsp;<i>Rhino</i> 3D printed molds for biofoam <br/>
                    &emsp;&emsp;<i>Illustrator</i> poster and process books <br/>
                </p>
                </div>
            </div>
            <object
                data={book}
                type="application/pdf"
                className={styles.pdf}
            >process book</object>
            <object
                data={poster}
                type="application/pdf"
                className={styles.poster}
            >NatureNova Poster</object>
        </div>
    );
};

export default NatureNova;