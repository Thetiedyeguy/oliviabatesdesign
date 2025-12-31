import { useRef, useEffect } from 'react';
import styles from './StudyLamp.module.css';
import scroll from './assets/StudyLamp_scroll.jpg';
import video from './assets/pHigment Video.mp4'
import prototype from './assets/Prototype.png'

const StudyLamp = () => {
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
                    StudyLamp
                </h1>
                <h1 className={styles.subtitle}>an interactive lamp to improve study habits</h1>
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
                    &emsp;&emsp;This lamp helps students create a better study environment <br/>
                    in shared spaces. Inspired by the idea of studying until the ice <br/>
                    melts, it lets you see time pass instead of checking a clock. It <br/>
                    replaces phone timers, so you don’t get distracted by <br/>
                    notifcations. <br/>
                    <br/>
                    &emsp;&emsp;The lamp lets you adjust the light with tilt gestures, <br/>
                    detects noise, and shows a visual timer with a slow color <br/>
                    change. As time runs out, the changing light quietly encourages <br/>
                    you to stay focused. When you finish, you can shake the lamp to <br/>
                    start a rainbow disco mode and celebrate.
                    </p>
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
            <div className={styles.compostSection}>
              <img
                src={prototype}
                className={styles.prototype}
                alt='prototype'
              />
              <div className={styles.compostText}>
                <h1 className={styles.compostTitle}>
                  Design Skills
                </h1>
                <p className={styles.compostBody}>
                  <b className={styles.bold}>Process:</b> <br/>
                  &emsp;&emsp;<i>Ideaize</i> functions compatible with adafruit <br/>
                  &emsp;&emsp;<i>JavaScript</i> code functions for the lamp <br/>
                  &emsp;&emsp;<i>OnShape</i> printed light diffusing shell <br/>
                </p>
              </div>
            </div>
        </div>
    );
};

export default StudyLamp;