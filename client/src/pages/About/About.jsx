import styles from './About.module.css';
import aboutMe from './Assets/aboutme.jpg';
import sixFlags from './Assets/Six-Flags-Magic-Mountain-Valencia.jpg';
import Davis from './Assets/Davis.jpg';
import ISAM from './Assets/ISAM.jpg';
import sunset from './Assets/sunsets.jpg'

const About = () => {
    return(
        <div className = {styles.page}>
            <img
                src={aboutMe}
                className={styles.aboutMeImage}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="1920.732" height="155.059" viewBox="0 0 1920.732 155.059" className={styles.wave}>
                <path id="Path_1" data-name="Path 1" d="M-1977.313,3368.609c171.981-18.918,200.817-79.71,318.284-58.37s72.091,68.141,154.837,57.254,160.633-64.562,235.436-35.968,67.994,69.069,194.013,35.968,237.214-81.6,401.459-57.254,239.331,118.113,331.033,74.64,121.2-74.783,197.043-53.355,87.9,18.829,88.4,6.409,0-96.769,0-96.769l-1920.51,5.383Z" transform="translate(1977.313 -3241.166)" fill="#FFFFFF"/>
            </svg>
            <div className={styles.story}>
                <p className={styles.intro}>my story...</p>
            </div>
            <div className={styles.upperTextArea}>
                <p className={styles.sixFlagsText}>
                    &emsp;&emsp;I’m a product designer with a <br/>
                    special interest in biodesign. I’m <br/>
                    drawn to the challenge of considering <br/>
                    a product’s full lifecycle—from material <br/>
                    sourcing and manufacturing to use, <br/>
                    reuse, and disposal—and how design <br/>
                    decisions shape those systems. <br/>
                    &emsp;&emsp;I grew up between the Five Freeway <br/>
                    and Six Flags, where adventure was <br/>
                    always a short car ride away, whether <br/>
                    that meant the beach or the city. <br/>
                </p>
                <img
                    src={sixFlags}
                    className={styles.sixFlagsImage}
                />
            </div>
            <div className={styles.middleTextArea}>
                <img
                    src={Davis}
                    className={styles.davis}
                />
                <p className={styles.davisText}>
                    That early sense of <br/>
                    movement and curiosity <br/>
                    followed me to UC Davis, <br/>
                    where I began my design <br/>
                    degree while my parents settled <br/>
                    in Bend, Oregon. <br/>
                    At Davis, I learned the fundamentals of design <br/>
                    through prototyped projects, combining digital tools such <br/>
                    as InDesign, Rhino, Illustrator, Photoshop, and <br/>
                    AutoDesk360 with fabrication methods including 3D <br/>
                    printing, laser cutting, and CNC. In my first year, the who <br/>
                    and why questions became harder to answer, so I added <br/>
                </p>
            </div>
            <div className={styles.bottomTextArea}>
                <p className={styles.isamText}>
                    Communications as a second major. This <br/>
                    expanded my toolkit to include market <br/>
                    research, media effects, and <br/>
                    communication strategies, which <br/>
                    continue to inform my design practice. <br/>
                    <br/>
                    Although my coursework emphasized <br/>
                    product design, I became especially <br/>
                    drawn to biomaterials as both a <br/>
                    material practice and a collaborative <br/>
                    research community. I was motivated by <br/>
                    the open exchange of knowledge— <br/>
                    sharing recipes, samples, and <br/>
                    experiments—through spaces like the <br/>
                    EcoMaterials Library, which I helped <br/>
                    present at ISAM 2024 in Sheffield. <br/>
                </p>
                <img
                    src={ISAM}
                    className={styles.isamImage}
                />
            </div>
            <img
                src={sunset}
                className={styles.sunset}
            />
            <div className={styles.gap}>

            </div>
        </div>
    );
};

export default About;