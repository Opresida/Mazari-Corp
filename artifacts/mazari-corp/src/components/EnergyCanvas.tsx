import { useEffect, useRef, useCallback } from 'react';

interface Bolt {
  points: { x: number; y: number }[];
  opacity: number;
  width: number;
  birth: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
}

export default function EnergyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const boltsRef = useRef<Bolt[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const lastBoltRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const PRIMARY = { r: 210, g: 255, b: 40 };

  const generateBolt = useCallback((startX: number, startY: number, endX: number, endY: number, depth: number): { x: number; y: number }[] => {
    if (depth === 0) return [{ x: startX, y: startY }, { x: endX, y: endY }];

    const midX = (startX + endX) / 2 + (Math.random() - 0.5) * Math.abs(endY - startY) * 0.4;
    const midY = (startY + endY) / 2 + (Math.random() - 0.5) * Math.abs(endX - startX) * 0.15;

    const left = generateBolt(startX, startY, midX, midY, depth - 1);
    const right = generateBolt(midX, midY, endX, endY, depth - 1);

    return [...left, ...right.slice(1)];
  }, []);

  const createBolt = useCallback((now: number) => {
    const { w, h } = sizeRef.current;
    const centerX = w / 2;
    const orbY = h * 0.18;

    const angle = (Math.random() - 0.5) * Math.PI * 0.8;
    const length = h * (0.3 + Math.random() * 0.35);
    const endX = centerX + Math.sin(angle) * length;
    const endY = orbY + Math.cos(angle) * length * 0.7;

    const points = generateBolt(centerX, orbY, endX, endY, 5);
    boltsRef.current.push({
      points,
      opacity: 0.4 + Math.random() * 0.5,
      width: 1 + Math.random() * 1.5,
      birth: now,
    });

    // Branch bolt
    if (Math.random() > 0.5) {
      const branchStart = points[Math.floor(points.length * (0.3 + Math.random() * 0.3))];
      const bAngle = angle + (Math.random() - 0.5) * 1.2;
      const bLen = length * (0.2 + Math.random() * 0.3);
      const bEndX = branchStart.x + Math.sin(bAngle) * bLen;
      const bEndY = branchStart.y + Math.cos(bAngle) * bLen * 0.5;
      const bPoints = generateBolt(branchStart.x, branchStart.y, bEndX, bEndY, 3);
      boltsRef.current.push({
        points: bPoints,
        opacity: 0.2 + Math.random() * 0.3,
        width: 0.5 + Math.random(),
        birth: now,
      });
    }
  }, [generateBolt]);

  const createParticle = useCallback(() => {
    const { w, h } = sizeRef.current;
    particlesRef.current.push({
      x: Math.random() * w,
      y: h * 0.2 + Math.random() * h * 0.7,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      opacity: 0,
      maxOpacity: 0.1 + Math.random() * 0.3,
      life: 0,
      maxLife: 3000 + Math.random() * 4000,
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Init particles
    for (let i = 0; i < 60; i++) {
      createParticle();
      particlesRef.current[i].life = Math.random() * particlesRef.current[i].maxLife;
    }

    const draw = (timestamp: number) => {
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      // Perspective grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 0.5;
      const horizon = h * 0.15;
      const gridLines = 12;
      for (let i = 0; i < gridLines; i++) {
        const y = horizon + ((h - horizon) / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let i = 0; i < 10; i++) {
        const x = w * (i / 9);
        ctx.beginPath();
        ctx.moveTo(w / 2, horizon);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Orb
      const orbX = w / 2;
      const orbY = h * 0.18;
      const pulse = 1 + Math.sin(timestamp * 0.002) * 0.15;
      const orbR = 30 * pulse;

      const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR * 3);
      orbGrad.addColorStop(0, `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0.9)`);
      orbGrad.addColorStop(0.3, `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0.3)`);
      orbGrad.addColorStop(0.6, `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0.08)`);
      orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGrad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbR * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core orb
      const coreGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbR);
      coreGrad.addColorStop(0, `rgba(255, 255, 255, 0.95)`);
      coreGrad.addColorStop(0.4, `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0.8)`);
      coreGrad.addColorStop(1, `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, 0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbR, 0, Math.PI * 2);
      ctx.fill();

      // Generate bolts
      if (timestamp - lastBoltRef.current > 80 + Math.random() * 120) {
        createBolt(timestamp);
        lastBoltRef.current = timestamp;
      }

      // Draw bolts
      boltsRef.current = boltsRef.current.filter(b => {
        const age = timestamp - b.birth;
        if (age > 200) return false;
        const fade = 1 - age / 200;

        ctx.strokeStyle = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, ${b.opacity * fade})`;
        ctx.lineWidth = b.width * fade;
        ctx.shadowColor = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, ${0.5 * fade})`;
        ctx.shadowBlur = 8 * fade;
        ctx.beginPath();
        b.points.forEach((p, i) => {
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;
        return true;
      });

      // Draw particles
      const dt = 16;
      particlesRef.current.forEach(p => {
        p.life += dt;
        if (p.life > p.maxLife) {
          p.x = Math.random() * w;
          p.y = h * 0.2 + Math.random() * h * 0.7;
          p.life = 0;
        }

        p.x += p.vx;
        p.y += p.vy;

        const lifeRatio = p.life / p.maxLife;
        p.opacity = lifeRatio < 0.1
          ? p.maxOpacity * (lifeRatio / 0.1)
          : lifeRatio > 0.8
            ? p.maxOpacity * (1 - (lifeRatio - 0.8) / 0.2)
            : p.maxOpacity;

        ctx.fillStyle = `rgba(${PRIMARY.r}, ${PRIMARY.g}, ${PRIMARY.b}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [createBolt, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
