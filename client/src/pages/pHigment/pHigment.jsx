import { useRef, useEffect } from 'react';
import scroll from './assets/pHigment_scroll.jpg';
import styles from './pHigment.module.css';
import nails from './assets/pHigment_1.jpg';
import video from './assets/pHigment Video.mp4'

const PHigment = () => {
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

  return (
    <div>
      <div className={styles.page}>
        <h1 className={styles.title}>
          p<span className={styles.special}>H</span>igment
        </h1>
        <h1 className={styles.subtitle}>IWSC 2025</h1>
        <h1 className={styles.subsubtitle}>
          Biodegradable Single-Use Cosmetics for On-body Chemical Sensing
        </h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave}>
            <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill="#FFFFFF"/>
          </svg>
        <div className={styles.scrollContainer} ref={scrollRef}>
          <img src={scroll} className={styles.scrollImage} />
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
                &emsp;&emsp;pHigment is a design research <br/>
                paper prepared for ISWC 2025 in the <br/>
                Interactive Organisms Lab at UC <br/>
                Davis. The project focuses on <br/>
                developing a biodegradable, <br/>
                wearable pH-sensing strip for <br/>
                everyday use, translating subtle <br/>
                chemical changes into accessible <br/>
                health information. <br/>
                &emsp;&emsp;I followed the project through its <br/>
                full lifecycle—from early ideation <br/>
                and material research to <br/>
                prototyping, testing, and refinement. <br/>
                After validation, pHigment was <br/>
                showcased at ISWC in partnership <br/>
                with the University of Sydney. <br/>
                <i>authors:</i> <span className={styles.authors}>Olivia Bates, Alyssa Yee, Phil Gough, <br/>
                Anusha Withana, Katia Vega</span> <br/>
            </p>
        </div>
        <img
            src = {nails}
            alt='phigment body cosmetics'
            className={styles.nails}
        />
      </div>
      <video
        className={styles.video}
        src={video}
        autoPlay
        loop
        muted
        controls
        playsInline
      />
    </div>
  );
};

export default PHigment;
