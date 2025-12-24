import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './BubbleSection.module.css';

const MIN_RADIUS = 20;
const MAX_RADIUS = 300;
const RADIUS_STEP = 1;

const BubbleSection = ({
  bubbleData,
  editable = false,
  onPositionChange = () => {}
}) => {
  const containerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);
  const draggingRef = useRef(null);
  const isDraggingRef = useRef(false);

  // ---------- Helpers ----------
  const normalize = (x, y, rect) => ({
    x: x / rect.width,
    y: y / rect.height
  });

  const denormalize = (x, y, rect) => ({
    x: x * rect.width,
    y: y * rect.height
  });

  // ---------- Init bubbles ----------
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const mapped = bubbleData.map(b => {
      const pos = denormalize(b.x, b.y, rect);
      return {
        ...b,
        px: pos.x,
        py: pos.y
      };
    });

    setBubbles(mapped);
  }, [bubbleData]);

  // ---------- Drag logic ----------
  const onMouseDown = (e, bubble) => {
  if (!editable) return;

  e.preventDefault();
  draggingRef.current = bubble.id;
  isDraggingRef.current = true;
};

useEffect(() => {
  const container = containerRef.current;
  if (!container) return;

  const handleWheel = (e) => {
    if (!editable || !isDraggingRef.current) return;

    e.preventDefault();

    setBubbles(prev =>
      prev.map(b => {
        if (b.id !== draggingRef.current) return b;

        const delta = e.deltaY < 0 ? RADIUS_STEP : -RADIUS_STEP;
        return {
          ...b,
          radius: Math.min(
            MAX_RADIUS,
            Math.max(MIN_RADIUS, b.radius + delta)
          )
        };
      })
    );
  };

  container.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    container.removeEventListener("wheel", handleWheel);
  };
}, [editable, bubbles]);




  const onMouseMove = e => {
    if (!editable || draggingRef.current === null) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setBubbles(prev =>
      prev.map(b =>
        b.id === draggingRef.current
          ? { ...b, px: x, py: y }
          : b
      )
    );
  };

  const onMouseUp = () => {
  if (!editable || draggingRef.current === null) return;

  const bubble = bubbles.find(b => b.id === draggingRef.current);
  if (!bubble) return;

  const rect = containerRef.current.getBoundingClientRect();
  const normalized = normalize(bubble.px, bubble.py, rect);

  onPositionChange(
    normalized.x,
    normalized.y,
    bubble.radius
  );

  draggingRef.current = null;
  isDraggingRef.current = false;
};


  // ---------- Render ----------
  return (
    <section
      ref={containerRef}
      className={styles.container}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={styles.bubbleWrapper}
          style={{
            width: bubble.radius * 2,
            height: bubble.radius * 2,
            transform: `translate(${bubble.px - bubble.radius}px, ${bubble.py - bubble.radius}px)`
          }}
          onMouseDown={e => onMouseDown(e, bubble)}
        >
          <div
            className={styles.bubble}
            style={{
              background: `rgba(255,255,255,${bubble.opacity})`,
              cursor: editable ? 'grab' : 'default'
            }}
          >
            {bubble.image && (
              <img
                src={bubble.image}
                alt={bubble.title}
                className={styles.bubbleImage}
              />
            )}
            <div className={styles.bubbleText}>
              <p className={styles.title}>{bubble.title}</p>
              <p className={styles.subtitle}>{bubble.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BubbleSection;
