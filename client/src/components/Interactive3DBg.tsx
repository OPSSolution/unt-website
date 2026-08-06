import React, { useEffect, useRef } from 'react';

export type Bg3DVariant = 'cubes' | 'hex-grid' | 'globe' | 'pyramids';

interface Interactive3DBgProps {
  variant?: Bg3DVariant;
}

// ─── 1. 3D Shipping Container / Cargo Crate Vertices ───
// Rectangular 3D Cargo Box (Width 1.8, Height 1.0, Depth 1.0)
const CONTAINER_VERTICES = [
  { x: -1.4, y: -0.8, z: -0.8 }, { x: 1.4, y: -0.8, z: -0.8 },
  { x: 1.4, y: 0.8, z: -0.8 }, { x: -1.4, y: 0.8, z: -0.8 },
  { x: -1.4, y: -0.8, z: 0.8 }, { x: 1.4, y: -0.8, z: 0.8 },
  { x: 1.4, y: 0.8, z: 0.8 }, { x: -1.4, y: 0.8, z: 0.8 },
];
const CONTAINER_FACES = [
  [0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1],
  [1, 5, 6, 2], [2, 6, 7, 3], [3, 7, 4, 0],
];

// Container Corrugated Ribbing Lines (Front & Side)
const CONTAINER_RIBS = [
  // Front face ribs
  { x1: -0.9, y1: -0.7, z1: 0.8, x2: -0.9, y2: 0.7, z2: 0.8 },
  { x1: -0.4, y1: -0.7, z1: 0.8, x2: -0.4, y2: 0.7, z2: 0.8 },
  { x1: 0.1, y1: -0.7, z1: 0.8, x2: 0.1, y2: 0.7, z2: 0.8 },
  { x1: 0.6, y1: -0.7, z1: 0.8, x2: 0.6, y2: 0.7, z2: 0.8 },
  { x1: 1.1, y1: -0.7, z1: 0.8, x2: 1.1, y2: 0.7, z2: 0.8 },
];

// ─── 2. 3D Air Cargo Jet Wireframe Vertices ───
const JET_VERTICES = [
  { x: 0, y: -1.8, z: 0 },   // Nose
  { x: -0.3, y: 0, z: -0.2 },// Fuselage L
  { x: 0.3, y: 0, z: -0.2 },// Fuselage R
  { x: 0, y: 1.8, z: 0 },   // Tail tip
  { x: -2.2, y: 0.4, z: 0 },   // Left Wingtip
  { x: 2.2, y: 0.4, z: 0 },   // Right Wingtip
  { x: 0, y: 1.2, z: 0.8 }, // Vertical Stabilizer
];
const JET_EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], // Main Body
  [1, 4], [3, 4], // Left Wing
  [2, 5], [3, 5], // Right Wing
  [3, 6], [1, 6], [2, 6], // Tail Fin
];

export const Interactive3DBg: React.FC<Interactive3DBgProps> = ({ variant = 'cubes' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);

    // Mouse 3D Parallax tracking
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      rotX: 0,
      rotY: 0,
      targetRotX: 0,
      targetRotY: 0,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.targetRotY = ((e.clientX - rect.left) / width - 0.5) * 0.5;
      mouse.targetRotX = -((e.clientY - rect.top) / height - 0.5) * 0.5;
    };

    const updateDimensions = () => {
      if (!parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateDimensions, { passive: true });

    const resizeObserver = new ResizeObserver(() => updateDimensions());
    resizeObserver.observe(parent);

    // ─── 1. Generate Floating 3D Inventory Shipping Containers ───
    const containerCount = Math.min(Math.max(Math.floor(height / 280), 5), 14);
    const containers3D = Array.from({ length: containerCount }, (_, idx) => ({
      x: (Math.random() - 0.5) * (width * 0.85),
      y: ((idx + 0.5) / containerCount) * height - height / 2,
      z: Math.random() * 400 - 200,
      size: Math.random() * 24 + 22,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: (Math.random() - 0.5) * 0.01,
      vRotY: (Math.random() - 0.5) * 0.01,
      vRotZ: (Math.random() - 0.5) * 0.006,
      speedY: Math.random() * 0.3 + 0.1,
      label: idx % 3 === 0 ? 'QC-PASS' : (idx % 3 === 1 ? 'CAMBODIA-HUB' : 'SEA-FREIGHT'),
    }));

    // ─── 2. Generate Floating 3D Air & Sea Cargo Transit Jets ───
    const jets3D = Array.from({ length: 3 }, (_, idx) => ({
      x: (Math.random() - 0.5) * width,
      y: (idx - 1) * (height * 0.35),
      z: Math.random() * 200 - 100,
      size: 20,
      rotX: 0.3,
      rotY: Math.PI * 0.25,
      rotZ: -0.1,
      speedX: 0.6 + idx * 0.2,
      speedY: -0.2,
    }));

    // ─── 3. 3D Inventory Trade Route Pulses ───
    const tradeRoutes = Array.from({ length: 6 }, () => ({
      startX: (Math.random() - 0.5) * width,
      startY: (Math.random() - 0.5) * height,
      endX: (Math.random() - 0.5) * width,
      endY: (Math.random() - 0.5) * height,
      progress: Math.random(),
      speed: Math.random() * 0.006 + 0.003,
    }));

    // 3D Particles / Cargo Dust
    const particleCount = Math.min(Math.floor((width * height) / 10000), 65);
    const particles3D = Array.from({ length: Math.max(particleCount, 30) }, () => ({
      x: (Math.random() - 0.5) * width * 1.3,
      y: Math.random() * height - height / 2,
      z: Math.random() * 600 - 300,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
    }));

    // 3D Projection Engine
    const focalLength = 450;
    const project3D = (x: number, y: number, z: number, rX: number, rY: number) => {
      const cosX = Math.cos(rX), sinX = Math.sin(rX);
      const cosY = Math.cos(rY), sinY = Math.sin(rY);

      let x1 = x * cosY + z * sinY;
      let y1 = y;
      let z1 = -x * sinY + z * cosY;

      let x2 = x1;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      const pZ = z2 + 600;
      const scale = focalLength / Math.max(pZ, 50);

      return {
        px: width / 2 + x2 * scale,
        py: height / 2 + y2 * scale,
        scale,
        depth: pZ,
        x3d: x2,
        y3d: y2,
        z3d: z2,
      };
    };

    const render = () => {
      // Mouse inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;
      mouse.rotX += (mouse.targetRotX - mouse.rotX) * 0.06;
      mouse.rotY += (mouse.targetRotY - mouse.rotY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      const strokeRGB = isDarkMode ? '16, 185, 129' : '5, 150, 105';
      const cyanRGB = isDarkMode ? '6, 182, 212' : '14, 165, 233';

      // ─── 1. Cursor Spotlight Glow Aura ───
      if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const spotGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300);
        if (isDarkMode) {
          spotGrad.addColorStop(0, 'rgba(16, 185, 129, 0.16)');
          spotGrad.addColorStop(0.4, 'rgba(6, 182, 212, 0.06)');
          spotGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotGrad.addColorStop(0, 'rgba(16, 185, 129, 0.09)');
          spotGrad.addColorStop(0.5, 'rgba(5, 150, 105, 0.03)');
          spotGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // ─── 2. Render Glowing 3D Inventory Trade Arc Routes ───
      tradeRoutes.forEach((route) => {
        route.progress += route.speed;
        if (route.progress > 1) route.progress = 0;

        const p1 = project3D(route.startX, route.startY, -100, mouse.rotX, mouse.rotY);
        const p2 = project3D(route.endX, route.endY, 100, mouse.rotX, mouse.rotY);

        // Control point for curved 3D trade arc
        const midX = (route.startX + route.endX) / 2;
        const midY = (route.startY + route.endY) / 2 - 150;
        const pMid = project3D(midX, midY, 0, mouse.rotX, mouse.rotY);

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.quadraticCurveTo(pMid.px, pMid.py, p2.px, p2.py);
        ctx.strokeStyle = `rgba(${strokeRGB}, ${isDarkMode ? 0.12 : 0.06})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling Cargo Signal Pulse Dot
        const t = route.progress;
        const pulseX = (1 - t) * (1 - t) * p1.px + 2 * (1 - t) * t * pMid.px + t * t * p2.px;
        const pulseY = (1 - t) * (1 - t) * p1.py + 2 * (1 - t) * t * pMid.py + t * t * p2.py;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cyanRGB}, ${isDarkMode ? 0.8 : 0.6})`;
        if (isDarkMode) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${cyanRGB}, 1)`;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // ─── 3. Render 3D Floating Shipping Containers ───
      containers3D.forEach((c) => {
        c.rotX += c.vRotX;
        c.rotY += c.vRotY;
        c.rotZ += c.vRotZ;
        c.y += c.speedY;

        // Wrap around height
        if (c.y > height / 2 + 100) c.y = -height / 2 - 100;

        const cosX = Math.cos(c.rotX), sinX = Math.sin(c.rotX);
        const cosY = Math.cos(c.rotY), sinY = Math.sin(c.rotY);
        const cosZ = Math.cos(c.rotZ), sinZ = Math.sin(c.rotZ);

        // Transform 3D local vertices
        const projVerts = CONTAINER_VERTICES.map((v) => {
          let lx = v.x * c.size;
          let ly = v.y * c.size;
          let lz = v.z * c.size;

          let x1 = lx * cosY + lz * sinY;
          let y1 = ly;
          let z1 = -lx * sinY + lz * cosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          return project3D(c.x + x3, c.y + y3, c.z + z3, mouse.rotX, mouse.rotY);
        });

        // Sort faces by Z-depth
        const sortedFaces = CONTAINER_FACES.map((face) => {
          const pts = face.map((idx) => projVerts[idx]);
          const avgZ = pts.reduce((sum, p) => sum + p.z3d, 0) / pts.length;
          return { pts, avgZ };
        }).sort((a, b) => b.avgZ - a.avgZ);

        sortedFaces.forEach(({ pts, avgZ }) => {
          const depthAlpha = Math.min(Math.max((600 - avgZ) / 600, 0.1), 0.85);

          ctx.beginPath();
          pts.forEach((p, idx) => {
            if (idx === 0) ctx.moveTo(p.px, p.py);
            else ctx.lineTo(p.px, p.py);
          });
          ctx.closePath();

          // Container solid/glass fill
          ctx.fillStyle = `rgba(${cyanRGB}, ${isDarkMode ? 0.06 * depthAlpha : 0.03 * depthAlpha})`;
          ctx.fill();

          // Wireframe border
          ctx.lineWidth = isDarkMode ? 1.2 : 1;
          ctx.strokeStyle = `rgba(${strokeRGB}, ${isDarkMode ? 0.38 * depthAlpha : 0.22 * depthAlpha})`;
          if (isDarkMode) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${strokeRGB}, 0.5)`;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        });

        // Draw Container Corrugated Ribs
        CONTAINER_RIBS.forEach((rib) => {
          let rx1 = rib.x1 * c.size, ry1 = rib.y1 * c.size, rz1 = rib.z1 * c.size;
          let rx2 = rib.x2 * c.size, ry2 = rib.y2 * c.size, rz2 = rib.z2 * c.size;

          // Rotate
          let x1 = rx1 * cosY + rz1 * sinY, y1 = ry1, z1 = -rx1 * sinY + rz1 * cosY;
          let x2 = rx2 * cosY + rz2 * sinY, y2 = ry2, z2 = -rx2 * sinY + rz2 * cosY;

          let tx1 = x1, ty1 = y1 * cosX - z1 * sinX, tz1 = y1 * sinX + z1 * cosX;
          let tx2 = x2, ty2 = y2 * cosX - z2 * sinX, tz2 = y2 * sinX + z2 * cosX;

          let fx1 = tx1 * cosZ - ty1 * sinZ, fy1 = tx1 * sinZ + ty1 * cosZ;
          let fx2 = tx2 * cosZ - ty2 * sinZ, fy2 = tx2 * sinZ + ty2 * cosZ;

          const pRib1 = project3D(c.x + fx1, c.y + fy1, c.z + tz1, mouse.rotX, mouse.rotY);
          const pRib2 = project3D(c.x + fx2, c.y + fy2, c.z + tz2, mouse.rotX, mouse.rotY);

          ctx.beginPath();
          ctx.moveTo(pRib1.px, pRib1.py);
          ctx.lineTo(pRib2.px, pRib2.py);
          ctx.strokeStyle = `rgba(${strokeRGB}, ${isDarkMode ? 0.25 : 0.12})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });

        // Container QC Status Indicator Light Dot
        const centerPt = projVerts[6]; // Front-top corner
        if (centerPt) {
          ctx.beginPath();
          ctx.arc(centerPt.px, centerPt.py, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${strokeRGB}, ${isDarkMode ? 0.9 : 0.7})`;
          if (isDarkMode) {
            ctx.shadowBlur = 6;
            ctx.shadowColor = `rgba(${strokeRGB}, 1)`;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // ─── 4. Render 3D Air Cargo Transit Jets ───
      jets3D.forEach((j) => {
        j.x += j.speedX;
        j.y += j.speedY;

        if (j.x > width / 2 + 200) j.x = -width / 2 - 200;
        if (j.y < -height / 2 - 100) j.y = height / 2 + 100;

        const cosX = Math.cos(j.rotX), sinX = Math.sin(j.rotX);
        const cosY = Math.cos(j.rotY), sinY = Math.sin(j.rotY);

        const projJet = JET_VERTICES.map((v) => {
          let lx = v.x * j.size, ly = v.y * j.size, lz = v.z * j.size;
          let x1 = lx * cosY + lz * sinY, y1 = ly, z1 = -lx * sinY + lz * cosY;
          let x2 = x1, y2 = y1 * cosX - z1 * sinX, z2 = y1 * sinX + z1 * cosX;
          return project3D(j.x + x2, j.y + y2, j.z + z2, mouse.rotX, mouse.rotY);
        });

        ctx.strokeStyle = `rgba(${cyanRGB}, ${isDarkMode ? 0.45 : 0.25})`;
        ctx.lineWidth = 1.2;
        if (isDarkMode) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${cyanRGB}, 0.6)`;
        }

        JET_EDGES.forEach(([i1, i2]) => {
          const p1 = projJet[i1];
          const p2 = projJet[i2];
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        });

        ctx.shadowBlur = 0;
      });

      // ─── 5. Render Floating 3D Inventory Particles ───
      particles3D.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        if (Math.abs(p.x) > width) p.vx *= -1;
        if (Math.abs(p.y) > height / 2) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;

        const proj = project3D(p.x, p.y, p.z, mouse.rotX, mouse.rotY);
        const alpha = Math.min(Math.max((600 - proj.depth) / 600, 0.15), 0.8);

        ctx.beginPath();
        ctx.arc(proj.px, proj.py, Math.max(proj.scale * 2.2, 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${strokeRGB}, ${alpha * (isDarkMode ? 0.6 : 0.4)})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500 max-h-full max-w-full overflow-hidden"
    />
  );
};
