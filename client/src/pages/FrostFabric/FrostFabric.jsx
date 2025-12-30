import { useRef, useEffect } from 'react';
import styles from './FrostFabric.module.css';
import scroll from './assets/Frost_scoll.jpg'
import collage from './assets/4Photos_Fabric.png'

const FrostFabric = () => {
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
                    Frost Fabric
                </h1>
                <h1 className={styles.subtitle}>3D printed versatile fabric</h1>
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
            <div className={styles.nailsSection}>
                    <div className={styles.nailsInfo}>
                        <h1 className={styles.nailsTitle}>
                            Project
                        </h1>
                        <p className={styles.nailsText}>
                            Inspired by falling snowflakes, <br/>
                            I set out to create a fabric that <br/>
                            appears light and crystalline <br/>
                            yet behaves with strength. <br/>
                            Designed to be 3D printed on <br/>
                            its own or directly onto mesh, <br/>
                            the material draws from the <br/>
                            snowflake's uniform branching <br/>
                            geometry to introduce stretch <br/>
                            through curved, structural <br/>
                            forms.
                            <br/>
                            Built from a single repeating <br/>
                            line, the system can expand <br/>
                            into a fabric of any size. <br/>
                            Imagined for fantasy settings, <br/>
                            the surface moves far beyond <br/>
                            its fragile reference - <br/>
                            stretching fluidly and snapping <br/>
                        </p>
                    </div>
                <img
                    src = {collage}
                    alt='phigment body cosmetics'
                    className={styles.nails}
                />
            </div>
            <p className={styles.nailsText2}>
                back into place transforming an ephemeral pattern into a <br/>
                resilient, wearable material.
            </p>
        </div>
    );
};

export default FrostFabric;