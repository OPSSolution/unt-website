import React, { useRef, useState, useCallback } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // tilt intensity multiplier (default 6)
  glare?: boolean;
  disabled?: boolean; // disable 3D on mobile or when not needed
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  intensity = 6,
  glare = true,
  disabled = false,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [transform, setTransform] = useState('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !cardRef.current) return;

    // Throttle via rAF for smooth 60fps
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse coordinates relative to card center (-0.5 to +0.5)
      const mouseX = (e.clientX - rect.left) / width - 0.5;
      const mouseY = (e.clientY - rect.top) / height - 0.5;

      // Clamp tilt to max ±intensity degrees for comfortable viewing
      const rotateX = Math.max(-intensity, Math.min(intensity, -mouseY * intensity));
      const rotateY = Math.max(-intensity, Math.min(intensity, mouseX * intensity));

      setTransform(
        `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
      );

      if (glare) {
        const glareX = ((e.clientX - rect.left) / width) * 100;
        const glareY = ((e.clientY - rect.top) / height) * 100;
        setGlarePos({ x: glareX, y: glareY, opacity: 0.18 });
      }
    });
  }, [disabled, intensity, glare]);

  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsHovered(false);
    setTransform('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? 'transform 0.15s ease-out, box-shadow 0.35s ease'
          : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
        transformStyle: 'preserve-3d',
        willChange: isHovered ? 'transform' : 'auto',
      }}
      className={`relative rounded-3xl transition-shadow duration-300 ${isHovered
        ? 'shadow-[0_20px_40px_-12px_rgba(16,185,129,0.18)] dark:shadow-[0_20px_50px_-12px_rgba(16,185,129,0.28)]'
        : 'shadow-lg dark:shadow-none'
        } ${className}`}
    >
      {children}

      {/* Dynamic Glass Glare Specular Highlight — softer, more premium */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden z-20"
          style={{
            opacity: glarePos.opacity,
            transition: 'opacity 0.35s ease',
          }}
        >
          <div
            className="absolute -inset-[50%] w-[200%] h-[200%]"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 65%)`,
            }}
          />
        </div>
      )}
    </div>
  );
};
