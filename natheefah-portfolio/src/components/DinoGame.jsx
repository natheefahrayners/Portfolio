import { useEffect, useRef, useCallback } from 'react';

// Canvas dimensions — matches the photo frame width (340px) exactly
const W = 340;
const H = 420;
const GROUND_Y = H - 60;   // ground line y
const GRAVITY  = 0.6;
const JUMP_V   = -13.5;
const INIT_SPEED = 5;

// ── Pixel-art sprite data (scaled 2x) ──────────────────────────────────────
// Each shape is drawn with ctx paths to mimic the real sprite sheet look

function drawDino(ctx, dino, frame) {
  const { x, y, dead } = dino;
  const c = '#535353';   // classic Chrome dino grey

  ctx.fillStyle = c;

  if (dead) {
    // Eyes become X on death
    _dinoBody(ctx, x, y, c);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + 14, y + 2, 8, 8);
    ctx.fillStyle = c;
    // X marks
    ctx.fillRect(x + 14, y + 2, 3, 3);
    ctx.fillRect(x + 19, y + 2, 3, 3);
    ctx.fillRect(x + 16, y + 5, 3, 2);
    ctx.fillRect(x + 14, y + 7, 3, 3);
    ctx.fillRect(x + 19, y + 7, 3, 3);
    _dinoLegsStill(ctx, x, y, c);
    return;
  }

  _dinoBody(ctx, x, y, c);

  // Eye (white then pupil)
  ctx.fillStyle = '#fff';
  ctx.fillRect(x + 14, y + 2, 8, 8);
  ctx.fillStyle = c;
  ctx.fillRect(x + 18, y + 4, 4, 4);

  // Legs — alternate frames when running
  if (dino.onGround) {
    const f = Math.floor(frame / 5) % 2;
    if (f === 0) {
      ctx.fillStyle = c;
      ctx.fillRect(x + 6,  y + 26, 6, 14); // front leg back
      ctx.fillRect(x + 14, y + 26, 6, 8);  // back leg forward
    } else {
      ctx.fillStyle = c;
      ctx.fillRect(x + 6,  y + 26, 6, 8);  // front leg forward
      ctx.fillRect(x + 14, y + 26, 6, 14); // back leg back
    }
  } else {
    // Mid-air — legs angled
    ctx.fillStyle = c;
    ctx.fillRect(x + 4,  y + 26, 6, 10);
    ctx.fillRect(x + 14, y + 26, 6, 10);
  }
}

function _dinoBody(ctx, x, y, c) {
  ctx.fillStyle = c;
  // Head
  ctx.fillRect(x + 4,  y,      24, 20);
  // Neck + body
  ctx.fillRect(x,      y + 10, 28, 16);
  // Torso
  ctx.fillRect(x,      y + 16, 22, 12);
  // Tail
  ctx.fillRect(x - 6,  y + 20, 10, 6);
  ctx.fillRect(x - 10, y + 24, 6,  4);
  // Tiny arm
  ctx.fillRect(x + 18, y + 14, 8,  4);
}

function _dinoLegsStill(ctx, x, y, c) {
  ctx.fillStyle = c;
  ctx.fillRect(x + 6, y + 26, 6, 12);
  ctx.fillRect(x + 14, y + 26, 6, 12);
}

// ── Cactus drawing ───────────────────────────────────────────────────────────
function drawCactus(ctx, obs) {
  ctx.fillStyle = '#535353';
  const { x, type } = obs;

  if (type === 'small') {
    // Single small cactus
    ctx.fillRect(x + 6,  obs.y,      8, 36);           // main stem
    ctx.fillRect(x,      obs.y + 10, 6, 8);            // left arm
    ctx.fillRect(x,      obs.y + 6,  6, 6);            // left arm top
    ctx.fillRect(x + 14, obs.y + 12, 6, 8);           // right arm
    ctx.fillRect(x + 14, obs.y + 8,  6, 6);           // right arm top
  } else if (type === 'large') {
    // Large cactus
    ctx.fillRect(x + 8,  obs.y,      10, 48);
    ctx.fillRect(x,      obs.y + 12, 8,  10);
    ctx.fillRect(x,      obs.y + 6,  8,  8);
    ctx.fillRect(x + 18, obs.y + 14, 8,  10);
    ctx.fillRect(x + 18, obs.y + 8,  8,  8);
  } else {
    // Double cactus
    ctx.fillRect(x + 6,  obs.y,      8, 36);
    ctx.fillRect(x,      obs.y + 10, 6, 8);
    ctx.fillRect(x,      obs.y + 6,  6, 6);
    ctx.fillRect(x + 14, obs.y + 12, 6, 8);
    ctx.fillRect(x + 14, obs.y + 8,  6, 6);
    // Second cactus offset
    const x2 = x + 26;
    ctx.fillRect(x2 + 6,  obs.y + 4,  8, 32);
    ctx.fillRect(x2,      obs.y + 14, 6, 8);
    ctx.fillRect(x2 + 14, obs.y + 16, 6, 8);
  }
}

// ── Cloud drawing ─────────────────────────────────────────────────────────────
function drawCloud(ctx, c) {
  ctx.fillStyle = '#d4c4b4';
  ctx.fillRect(c.x + 8,  c.y,      20, 6);
  ctx.fillRect(c.x + 4,  c.y + 4,  28, 6);
  ctx.fillRect(c.x,      c.y + 8,  36, 6);
  ctx.fillRect(c.x + 4,  c.y + 12, 28, 4);
}

// ── Ground dashes ─────────────────────────────────────────────────────────────
function drawGround(ctx, offset) {
  ctx.fillStyle = '#535353';
  ctx.fillRect(0, GROUND_Y, W, 2);
  // Scrolling pebble dashes
  for (let i = 0; i < 6; i++) {
    const px = ((i * 60 - offset) % (W + 20) + W + 20) % (W + 20) - 10;
    ctx.fillRect(px,      GROUND_Y + 5, 10, 2);
    ctx.fillRect(px + 20, GROUND_Y + 9, 6,  2);
    ctx.fillRect(px + 40, GROUND_Y + 4, 14, 2);
  }
}

// ── GAME CONSTANTS ────────────────────────────────────────────────────────────
const DINO_START_X = 30;
const DINO_W = 26, DINO_H = 28;

const CACTUS_TYPES = {
  small:  { w: 20, h: 36 },
  large:  { w: 26, h: 48 },
  double: { w: 46, h: 36 },
};

function initState() {
  return {
    running: false,
    dead:    false,
    score:   0,
    hiScore: (() => { try { return parseInt(localStorage.getItem('dinoHi') || '0', 10); } catch { return 0; } })(),
    speed:   INIT_SPEED,
    frame:   0,
    groundOffset: 0,
    dino: {
      x:         DINO_START_X,
      y:         GROUND_Y - DINO_H,
      vy:        0,
      onGround:  true,
      dead:      false,
    },
    obstacles: [],
    nextObs:   90,
    clouds: [
      { x: 80,  y: 40 },
      { x: 220, y: 28 },
      { x: 310, y: 50 },
    ],
    // Flash effect on death
    flashFrames: 0,
  };
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────
export default function DinoGame() {
  const canvasRef = useRef(null);
  const stateRef  = useRef(null);
  const rafRef    = useRef(null);

  const doJump = useCallback(() => {
    const s = stateRef.current;
    if (!s) return;
    if (!s.running && !s.dead) { s.running = true; return; }
    if (s.dead) { stateRef.current = initState(); stateRef.current.running = true; return; }
    if (s.dino.onGround) {
      s.dino.vy = JUMP_V;
      s.dino.onGround = false;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    stateRef.current = initState();

    // Keyboard
    const onKey = e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        doJump();
      }
    };
    window.addEventListener('keydown', onKey);

    const tick = () => {
      const s = stateRef.current;

      if (s.running && !s.dead) {
        s.frame++;
        s.score += 0.15;
        s.speed  = INIT_SPEED + s.score * 0.005;
        s.groundOffset = (s.groundOffset + s.speed) % (W + 20);

        // ── Physics ──
        const d = s.dino;
        d.vy += GRAVITY;
        d.y  += d.vy;
        const floor = GROUND_Y - DINO_H;
        if (d.y >= floor) { d.y = floor; d.vy = 0; d.onGround = true; }

        // ── Clouds scroll ──
        s.clouds.forEach(c => {
          c.x -= 1.2;
          if (c.x < -50) c.x = W + 10;
        });

        // ── Spawn obstacles ──
        s.nextObs--;
        if (s.nextObs <= 0) {
          const types  = ['small', 'large', 'double'];
          const type   = types[Math.floor(Math.random() * types.length)];
          const dims   = CACTUS_TYPES[type];
          s.obstacles.push({
            x:    W + 10,
            y:    GROUND_Y - dims.h,
            type,
            w:    dims.w,
            h:    dims.h,
          });
          s.nextObs = 60 + Math.floor(Math.random() * 70) - Math.min(30, s.score * 0.1);
        }

        // ── Move obstacles ──
        s.obstacles = s.obstacles
          .map(o => ({ ...o, x: o.x - s.speed }))
          .filter(o => o.x > -60);

        // ── Collision ──
        const margin = 4;
        const db = {
          x: d.x + margin,
          y: d.y + margin,
          r: d.x + DINO_W - margin,
          b: d.y + DINO_H - margin,
        };
        for (const obs of s.obstacles) {
          const ob = {
            x: obs.x + 3,
            y: obs.y + 3,
            r: obs.x + obs.w - 3,
            b: obs.y + obs.h,
          };
          if (db.x < ob.r && db.r > ob.x && db.y < ob.b && db.b > ob.y) {
            s.dead = true;
            d.dead = true;
            s.flashFrames = 6;
            if (Math.floor(s.score) > s.hiScore) {
              s.hiScore = Math.floor(s.score);
              try { localStorage.setItem('dinoHi', s.hiScore); } catch (_) {}
            }
          }
        }

        if (s.flashFrames > 0) s.flashFrames--;
      }

      // ── DRAW ──────────────────────────────────────────────────────────────
      // BG — vanilla cream
      ctx.fillStyle = '#efe6dd';
      ctx.fillRect(0, 0, W, H);

      // Flash white on death
      if (s.flashFrames > 0 && s.flashFrames % 2 === 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(0, 0, W, H);
      }

      // Clouds
      s.clouds.forEach(c => drawCloud(ctx, c));

      // Ground
      drawGround(ctx, s.groundOffset);

      // Obstacles
      s.obstacles.forEach(obs => drawCactus(ctx, obs));

      // Dino
      drawDino(ctx, s.dino, s.frame);

      // Score display — top right, monospace style like Chrome
      ctx.fillStyle = '#535353';
      ctx.font = 'bold 16px "Courier New", monospace';
      ctx.textAlign = 'right';
      const hi  = String(s.hiScore).padStart(5, '0');
      const cur = String(Math.floor(s.score)).padStart(5, '0');
      ctx.fillText(`HI ${hi}   ${cur}`, W - 12, 28);
      ctx.textAlign = 'left';

      // ── Overlay messages ──
      if (!s.running && !s.dead) {
        // Start screen — show dino silhouette standing still + text
        ctx.fillStyle = 'rgba(239,230,221,0.0)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = '#535353';
        ctx.font = 'bold 13px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE / TAP TO START', W / 2, H / 2 + 90);
        ctx.textAlign = 'left';
      }

      if (s.dead) {
        ctx.fillStyle = '#535353';
        ctx.font = 'bold 16px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', W / 2, H / 2 + 70);
        // Replay icon (triangle)
        ctx.font = '11px "Courier New", monospace';
        ctx.fillText('▶  RESTART', W / 2, H / 2 + 92);
        ctx.textAlign = 'left';
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('keydown', onKey);
    };
  }, [doJump]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      onClick={doJump}
      style={{ display: 'block', width: '100%', height: '100%', imageRendering: 'pixelated' }}
    />
  );
}
