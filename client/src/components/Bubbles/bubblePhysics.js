// bubblePhysics.js
const BASE_WIDTH = 1920;
const BASE_HEIGHT = 1400;



export const rand = (min, max) =>
    Math.random() * (max - min) + min;

export const spawnBubbles = (count, width, height, bubbleData) => {
  console.log(bubbleData)
    const scaleFactor = window.innerWidth / BASE_WIDTH;
  const bubbles = [];
  const maxAttempts = 500;

  for (let i = 0; i < count; i++) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < maxAttempts) {
      attempts++;

      const radius = bubbleData[i].radius;
      const x = (bubbleData[i].x * BASE_WIDTH) - radius;
      const y = (bubbleData[i].y * BASE_HEIGHT) - radius;
      console.log(bubbleData[i].x, bubbleData[i].y, x, y, radius);
      bubbles.push({
          id: i,
          data: bubbleData[i] || null,
          x,
          y,
          origX: x,
          origY: y,
          vx: 0,
          vy: 0,
          radius,
          });
      placed = true;
    }
  }
  return bubbles;
};

export function applyOriginAttraction(bubble) {
  const strength = 0.05; // attraction strength
  const targetX = bubble.scaledOrigX; // use scaled origin
  const targetY = bubble.scaledOrigY;

  bubble.vx += (targetX - bubble.x) * strength;
  bubble.vy += (targetY - bubble.y) * strength;
}




export const applyParallax = (
  bubble,
  mouseX,
  mouseY,
  width,
  height
) => {
    const dist = Math.sqrt(Math.sqrt(((mouseX - bubble.x)**2 + (mouseY - bubble.y)**2)));
    const STRENGTH = 0.0002;
    const mx = ((mouseX - bubble.x) / width - 0.5) * 2;
    const my = ((mouseY - bubble.y) / height - 0.5) * 2;

    bubble.vx += mx * STRENGTH * bubble.radius;
    bubble.vy += my * STRENGTH * bubble.radius;
};

export const applyDamping = bubble => {
  const DAMPING = 0.98;
  bubble.vx *= DAMPING;
  bubble.vy *= DAMPING;
};

export const checkCollisions = (bubbles, bubble) => {
    let newX = bubble.x + bubble.vx;
    let newY = bubble.y + bubble.vy;
    let scalarX = bubble.vx * -1;
    let scalarY = bubble.vy * -1;
    let times = 0;
    let radius = bubble.radius;
    for(let j = 0; j < 4; j++){
        for (let i = 0; i < bubbles.length; i++) {
            let curentBubble = bubbles[i];
            let dist = Math.sqrt((curentBubble.x - newX)**2 + (curentBubble.y - newY)**2);
            if(dist < radius + curentBubble.radius){
                bubble.vx = bubble.vx + scalarX;
                bubble.vy = bubble.vy +scalarY;
                newX = bubble.x + bubble.vx;
                newY = bubble.y + bubble.vy;
                times++;
                if(times === 4){
                    return [bubble.vx, bubble.vy];
                }
            }
        }
    }
    return [bubble.vx, bubble.vy];
};

export const projectMotionAgainstCollision = (a, b, dx, dy) => {
  const nx = b.x - a.x;
  const ny = b.y - a.y;
  const dist = Math.sqrt(nx * nx + ny * ny);
  if (dist === 0) return { dx, dy };

  const ux = nx / dist;
  const uy = ny / dist;

  // dot product of movement onto collision normal
  const dot = dx * ux + dy * uy;

  // if moving toward the other bubble, remove that component
  if (dot > 0) {
    return {
      dx: dx - dot * ux,
      dy: dy - dot * uy
    };
  }

  return { dx, dy };
};

export const clampVelocity = (bubble, max = 2.0) => {
  const speed = Math.hypot(bubble.vx, bubble.vy);
  if (speed > max) {
    bubble.vx = (bubble.vx / speed) * max;
    bubble.vy = (bubble.vy / speed) * max;
  }
};


export const resolveCollisions = (bubbles, iterations = 4) => {
  for (let k = 0; k < iterations; k++) {
    for (let i = 0; i < bubbles.length; i++) {
      for (let j = i + 1; j < bubbles.length; j++) {
        const a = bubbles[i];
        const b = bubbles[j];

        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = a.radius + b.radius;

        if (dist === 0 || dist >= minDist) continue;

        const overlap = (minDist - dist) * 0.5;
        const nx = dx / dist;
        const ny = dy / dist;

        // Position correction (core fix)
        a.x -= nx * overlap;
        a.y -= ny * overlap;
        b.x += nx * overlap;
        b.y += ny * overlap;
      }
    }
  }
};

