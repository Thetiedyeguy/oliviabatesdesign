import { useEffect, useRef, useState } from 'react';
import styles from './BubbleSection.module.css';
import {
  spawnBubbles,
  applyOriginAttraction,
  applyParallax,
  applyDamping,
  resolveCollisions,
  clampVelocity
} from './bubblePhysics';

const BASE_WIDTH = 1920;   // original design width
const BASE_HEIGHT = 1080;  // optional for vertical scaling

const BubbleSection = ({ bubbleData }) => {
  console.log(bubbleData);
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState([]);

  // Compute scale factor based on current screen size
  const getScaleFactor = () => {
    const scaleX = window.innerWidth / BASE_WIDTH;
    const scaleY = window.innerHeight / BASE_HEIGHT;
    return Math.min(scaleX, scaleY);
  };

  // Scale radius and positions
  const scaleBubbles = () => {
  const scaleFactor = getScaleFactor();
  bubblesRef.current.forEach(bubble => {
    // Scale radius
    bubble.radius = bubble.origRadius * scaleFactor;

    // Scale the original position for attraction
    bubble.scaledOrigX = bubble.origX * scaleFactor;
    bubble.scaledOrigY = bubble.origY * scaleFactor;

    // Scale current position to match
    bubble.x = bubble.scaledOrigX;
    bubble.y = bubble.scaledOrigY;

    const el = document.getElementById(`bubble-${bubble.id}`);
    if (el) {
      el.style.width = `${bubble.radius * 2}px`;
      el.style.height = `${bubble.radius * 2}px`;
      el.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
    }
  });
};


  // Spawn bubbles initially
  const generateBubbles = () => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    bubblesRef.current = spawnBubbles(bubbleData.length, rect.width, rect.height, bubbleData).map(b => ({
      ...b,
      origRadius: b.radius,
      origX: b.x,
      origY: b.y
    }));

    scaleBubbles();
    setBubbles([...bubblesRef.current]); // trigger React render
  };

  // Animation loop
  useEffect(() => {
    generateBubbles(); // initial spawn

    let rafId;
    const animate = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();

      bubblesRef.current.forEach(bubble => {
        applyOriginAttraction(bubble); // toward original spawn position
        applyParallax(bubble, mouseRef.current.x, mouseRef.current.y, rect.width, rect.height);
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;
      });

      resolveCollisions(bubblesRef.current, 6);

      bubblesRef.current.forEach(bubble => {
        applyDamping(bubble);
        clampVelocity(bubble, 2.0);
      });

      // Render
      bubblesRef.current.forEach(bubble => {
        const el = document.getElementById(`bubble-${bubble.id}`);
        if (el) el.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0)`;
      });

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Mouse parallax
  const handleMouseMove = e => {
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  // Responsive: scale on window resize
  useEffect(() => {
    const handleResize = () => scaleBubbles();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
    >
      {bubbles.map(bubble => (
        <div
          id={`bubble-${bubble.id}`}
          key={bubble.id}
          className={styles.bubbleWrapper}
          style={{ width: bubble.radius * 2, height: bubble.radius * 2 }}
        >
          {bubble.data && bubble.data.type === 'project' ? (
            <a
              href={bubble.data.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bubble}
              style={{ background: `rgba(255,255,255,${bubble.data.opacity})` }}
            >
              {bubble.data.image && (
                <img
                  src={bubble.data.image}
                  alt={bubble.data.title}
                  className={styles.bubbleImage}
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              )}
              <div className={styles.bubbleText}>
                <p className={styles.title}>
                  {bubble.data.title}
                </p>
                <p className={styles.subtitle}>
                  {bubble.data.subtitle}
                </p>
              </div>
            </a>
          ) : (
            <div
              className={styles.bubble}
              style={{ background: `rgba(255,255,255,${bubble.data?.opacity})` }}
            ></div>
          )}
        </div>
      ))}
    </section>
  );
};

export default BubbleSection;
