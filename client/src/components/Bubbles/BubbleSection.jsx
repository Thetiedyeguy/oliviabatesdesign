import { useEffect, useRef, useState } from 'react';
import styles from './BubbleSection.module.css';

const MIN_RADIUS = 20;
const MAX_RADIUS = 300;
const RADIUS_STEP = 1;
const TITLE_SCALE = 0.30;
const SUBTITLE_SCALE = 0.3;


const BubbleSection = ({
  bubbleData,
  editable = false,
  onPositionChange = () => {},
  onSelectBubble = () => {}
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

  const denormalize = (x, y, radius, rect) => ({
    x: x * rect.width,
    y: y * rect.height,
    radius: (radius  * rect.width) / 1440
  });

  // ---------- Init bubbles ----------
  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const mapped = bubbleData.map(b => {
      const pos = denormalize(b.x, b.y, b.radius, rect);
      return {
        ...b,
        px: pos.x,
        py: pos.y,
        radius: pos.radius
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

  onSelectBubble({
    ...bubble,
    x: bubble.px / containerRef.current.getBoundingClientRect().width,
    y: bubble.py / containerRef.current.getBoundingClientRect().height
  });
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

const fitTextToCircle = ({
  text,
  radius,
  fontFamily,
  maxFontSize = 100,
  minFontSize = 10,
  padding = 0.15,
  lineHeight = 1.15
}) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxWidth = radius * 2 * (1 - padding);
  const maxHeight = radius * 2 * (1 - padding);

  let low = minFontSize;
  let high = maxFontSize;
  let best = minFontSize;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    ctx.font = `${mid}px ${fontFamily}`;

    const words = text.split(" ");
    let lines = 1;
    let lineWidth = 0;

    for (const word of words) {
      const wordWidth = ctx.measureText(word + " ").width;

      if (lineWidth + wordWidth > maxWidth) {
        lines++;
        lineWidth = wordWidth;
      } else {
        lineWidth += wordWidth;
      }
    }

    const totalHeight = lines * mid * lineHeight;

    if (totalHeight <= maxHeight) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return best;
};


const computedBubbles = bubbles.map(b => {
  if (!b.featured) return b;

  const titleSize = fitTextToCircle({
    text: b.title,
    radius: b.radius,
    fontFamily: 'Body-Bold',
    maxFontSize: b.radius * TITLE_SCALE
  });

  const subtitleSize = fitTextToCircle({
    text: b.subtitle,
    radius: b.radius,
    fontFamily: 'Body',
    maxFontSize: b.radius * SUBTITLE_SCALE
  });

  return {
    ...b,
    titleSize,
    subtitleSize
  };
});




  // ---------- Render ----------
  return (
    <section
      ref={containerRef}
      className={styles.container}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {computedBubbles.map(bubble => (
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
            className={(bubble.featured ? styles.bubble: styles.backgroundBubble)}
            style={{
              background: `rgba(255,255,255,${bubble.opacity})`,
              cursor: editable ? 'grab' : 'default'
            }}
          >
            {bubble.image && bubble.featured && (
              <a 
                href={(!editable && bubble.link)}>
                <img
                  src={bubble.image}
                  alt={bubble.title}
                  className={styles.bubbleImage}
                />
              </a>
            )}
            {bubble.featured && (
              <div className={styles.bubbleText}>
                <p className={styles.title} style={{ fontSize: bubble.titleSize }}>{bubble.title}:</p>
                <p className={styles.subtitle} style={{ fontSize: bubble.subtitleSize }}>{bubble.subtitle}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default BubbleSection;
