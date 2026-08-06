import React, { useEffect, useRef } from 'react';

// 3D Cube Vertices
const CUBE_VERTICES = [
  { x: -1, y: -1, z: -1 },
  { x:  1, y: -1, z: -1 },
  { x:  1, y:  1, z: -1 },
  { x: -1, y:  1, z: -1 },
  { x: -1, y: -1, z:  1 },
  { x:  1, y: -1, z:  1 },
  { x:  1, y:  1, z:  1 },
  { x: -1, y:  1, z:  1 },
];

// 3D Cube Edges
const CUBE_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 0], // Back face
  [4, 5], [5, 6], [6, 7], [7, 4], // Front face
  [0, 4], [1, 5], [2, 6], [3, 7], // Connecting edges
];

export const InteractiveServiceBg: React.FC = () => {
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

    // Mouse 3D tilt tracking
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
      
      // Calculate normalized 3D tilt angle (-0.4 to +0.4 rad)
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

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(parent);

    // Generate floating 3D cubes distributed vertically down the page
    const cubeCount = Math.min(Math.max(Math.floor((height) / 350), 4), 14);
    const cubes = Array.from({ length: cubeCount }, (_, idx) => ({
      x: (Math.random() - 0.5) * (width * 0.8),
      y: ((idx + 0.5) / cubeCount) * height - height / 2,
      z: Math.random() * 400 - 200,
      size: Math.random() * 35 + 30,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      vRotX: (Math.random() - 0.5) * 0.012,
      vRotY: (Math.random() - 0.5) * 0.012,
      vRotZ: (Math.random() - 0.5) * 0.008,
      speedY: (Math.random() - 0.5) * 0.2,
    }));

    // 3D Particles field
    const particleCount = Math.min(Math.floor((width * height) / 12000), 55);
    const particles3D = Array.from({ length: Math.max(particleCount, 25) }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: Math.random() * height - height / 2,
      z: Math.random() * 600 - 300,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      vz: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
    }));

    // 3D Projection math helper
    const focalLength = 400;

    const project3D = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      // Apply scene 3D rotation (mouse tilt)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      // Y-axis rotation
      let x1 = x * cosY + z * sinY;
      let y1 = y;
      let z1 = -x * sinY + z * cosY;

      // X-axis rotation
      let x2 = x1;
      let y2 = y1 * cosX - z1 * sinX;
      let z2 = y1 * sinX + z1 * cosX;

      const perspectiveZ = z2 + 600;
      const scale = focalLength / Math.max(perspectiveZ, 50);

      return {
        px: width / 2 + x2 * scale,
        py: height / 2 + y2 * scale,
        scale,
        depth: perspectiveZ,
      };
    };

    const render = () => {
      // Smooth mouse tilt interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.rotX += (mouse.targetRotX - mouse.rotX) * 0.05;
      mouse.rotY += (mouse.targetRotY - mouse.rotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const isDarkMode = document.documentElement.classList.contains('dark');
      const strokeColor = isDarkMode ? '16, 185, 129' : '5, 150, 105';
      const glowColor = isDarkMode ? '52, 211, 153' : '16, 185, 129';

      // ─── 1. Cursor Spotlight Aura ───
      if (mouse.x > 0 && mouse.x < width && mouse.y > 0 && mouse.y < height) {
        const spotlightGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        if (isDarkMode) {
          spotlightGradient.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
          spotlightGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.04)');
          spotlightGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          spotlightGradient.addColorStop(0, 'rgba(16, 185, 129, 0.09)');
          spotlightGradient.addColorStop(0.5, 'rgba(5, 150, 105, 0.03)');
          spotlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        ctx.fillStyle = spotlightGradient;
        ctx.fillRect(0, 0, width, height);
      }

      // ─── 2. Draw 3D Floating Wireframe Cubes ───
      cubes.forEach((cube) => {
        // Rotate cube on its local axes
        cube.rotX += cube.vRotX;
        cube.rotY += cube.vRotY;
        cube.rotZ += cube.vRotZ;

        // Transform local 3D vertices
        const cosX = Math.cos(cube.rotX), sinX = Math.sin(cube.rotX);
        const cosY = Math.cos(cube.rotY), sinY = Math.sin(cube.rotY);
        const cosZ = Math.cos(cube.rotZ), sinZ = Math.sin(cube.rotZ);

        const projectedVertices = CUBE_VERTICES.map((v) => {
          // Local 3D rotation
          let lx = v.x * cube.size;
          let ly = v.y * cube.size;
          let lz = v.z * cube.size;

          // Rotate local
          let x1 = lx * cosY + lz * sinY;
          let y1 = ly;
          let z1 = -lx * sinY + lz * cosY;

          let x2 = x1;
          let y2 = y1 * cosX - z1 * sinX;
          let z2 = y1 * sinX + z1 * cosX;

          let x3 = x2 * cosZ - y2 * sinZ;
          let y3 = x2 * sinZ + y2 * cosZ;
          let z3 = z2;

          // World offset
          const wx = cube.x + x3;
          const wy = cube.y + y3;
          const wz = cube.z + z3;

          // Project to 2D screen space with scene tilt
          return project3D(wx, wy, wz, mouse.rotX, mouse.rotY);
        });

        // Draw 3D cube edges
        ctx.lineWidth = isDarkMode ? 1.2 : 1;
        ctx.strokeStyle = `rgba(${strokeColor}, ${isDarkMode ? 0.35 : 0.22})`;
        if (isDarkMode) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${glowColor}, 0.5)`;
        }

        CUBE_EDGES.forEach(([i1, i2]) => {
          const v1 = projectedVertices[i1];
          const v2 = projectedVertices[i2];
          ctx.beginPath();
          ctx.moveTo(v1.px, v1.py);
          ctx.lineTo(v2.px, v2.py);
          ctx.stroke();
        });

        ctx.shadowBlur = 0;
      });

      // ─── 3. Draw 3D Floating Particles ───
      const projectedParticles = particles3D.map((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Wrap around bounds
        if (Math.abs(p.x) > width) p.vx *= -1;
        if (Math.abs(p.y) > height / 2) p.vy *= -1;
        if (Math.abs(p.z) > 300) p.vz *= -1;

        const proj = project3D(p.x, p.y, p.z, mouse.rotX, mouse.rotY);
        return { ...proj, pIndex: i };
      });

      // Render 3D nodes & connecting lines
      for (let i = 0; i < projectedParticles.length; i++) {
        const p1 = projectedParticles[i];
        const alpha = Math.min(Math.max((600 - p1.depth) / 600, 0.15), 0.75);

        ctx.beginPath();
        ctx.arc(p1.px, p1.py, Math.max(p1.scale * 2.5, 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${strokeColor}, ${alpha * (isDarkMode ? 0.6 : 0.4)})`;
        ctx.fill();

        // Connect nearby 3D nodes
        for (let j = i + 1; j < projectedParticles.length; j++) {
          const p2 = projectedParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            const lineAlpha = (1 - dist / 120) * (isDarkMode ? 0.22 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(${glowColor}, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-500 max-h-full max-w-full overflow-hidden"
    />
  );
};
