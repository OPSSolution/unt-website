import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, ShoppingBag, Sparkles } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { Product } from '../../types';

interface Props {
  products: Product[];
  onOpenProduct: (product: Product) => void;
  onQuote: (productName: string) => void;
}

function transparentImage(product: Product) {
  return product.showcaseImage?.trim();
}

export function InteractiveProductShowcase({ products, onOpenProduct }: Props) {
  const { language } = useLanguage();
  const isKm = language === 'km';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dragStartRef = useRef(0);
  const rotationStartRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const [cardTilt, setCardTilt] = useState<{x: number, y: number}>({x: 0, y: 0});

  const featuredProducts = products
    .filter((product) => Boolean(transparentImage(product)))
    .slice(0, 6);
  const total = featuredProducts.length;

  // ─── Auto-orbit rotation (pauses on hover or drag) ───
  useEffect(() => {
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      if (!isHovering && !isDragging) {
        setRotation(prev => (prev + delta * 0.018) % 360);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isHovering, isDragging, total]);

  // ─── Mouse parallax tracking ───
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });

    // Drag to rotate orbit
    if (isDragging) {
      const dragDelta = e.clientX - dragStartRef.current;
      setRotation(rotationStartRef.current + dragDelta * 0.5);
    }
  }, [isDragging]);

  // ─── Drag handlers ───
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.clientX;
    rotationStartRef.current = rotation;
  }, [rotation]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ─── Touch support for mobile drag ───
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartRef.current = e.touches[0].clientX;
    rotationStartRef.current = rotation;
  }, [rotation]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dragDelta = e.touches[0].clientX - dragStartRef.current;
    setRotation(rotationStartRef.current + dragDelta * 0.5);
    setMousePos({
      x: (e.touches[0].clientX - rect.left) / rect.width,
      y: (e.touches[0].clientY - rect.top) / rect.height,
    });
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // ─── 3D Card Tilt on hover ───
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: y * -25, y: x * 25 });
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    setCardTilt({ x: 0, y: 0 });
  }, []);


  // ─── Orbital position calculator ───
  const getOrbitalPosition = (index: number) => {
    const angle = (rotation + (index * 360) / total) * (Math.PI / 180);
    const radiusX = 420;
    const radiusY = 100;
    const x = Math.sin(angle) * radiusX;
    const z = Math.cos(angle) * radiusY;
    const normalizedZ = (z + radiusY) / (radiusY * 2);
    const scale = 0.5 + normalizedZ * 0.55;
    const opacity = 0.25 + normalizedZ * 0.75;
    const yFloat = Math.sin(Date.now() * 0.002 + index * 1.2) * 6; // gentle float
    const yOffset = -normalizedZ * 35 + yFloat;
    return { x, z, scale, opacity, yOffset, normalizedZ, angle };
  };

  const parallaxX = (mousePos.x - 0.5) * 25;
  const parallaxY = (mousePos.y - 0.5) * 12;

  return (
    <section className="relative z-20 overflow-hidden select-none">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { setIsHovering(false); setActiveIdx(null); setIsDragging(false); }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-transparent py-12 sm:py-16 lg:py-20 overflow-hidden"
      >
        {/* ─── Mouse-following gradient glow ─── */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-all duration-[1500ms] ease-out opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
            left: `${mousePos.x * 100}%`,
            top: `${mousePos.y * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />


        {/* ─── Floating ambient particles ─── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-500/20 dark:bg-emerald-400/15"
              style={{
                width: `${3 + (i % 3) * 2}px`,
                height: `${3 + (i % 3) * 2}px`,
                left: `${5 + (i * 6)}%`,
                top: `${15 + Math.sin(i * 0.9) * 35}%`,
                animation: `showcase-float ${4 + (i % 4)}s ease-in-out infinite alternate`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 sm:px-8 lg:px-12 space-y-6">

          {/* ─── Drag instruction hint ─── */}
          <div className="text-center">
            <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-opacity duration-500 ${
              isDragging
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 opacity-100'
                : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 opacity-70'
            }`}>
              <Sparkles className="w-3.5 h-3.5" />
              {isDragging
                ? (isKm ? '⟵ អូសដើម្បីបង្វិល ⟶' : '⟵ DRAGGING ⟶')
                : (isKm ? '☝️ អូស ឬដាក់កណ្ដុរលើផលិតផល' : '☝️ DRAG TO SPIN • HOVER TO EXPLORE')
              }
            </span>
          </div>

          {/* ─── 3D Orbital Ring Stage ─── */}
          <div
            className="relative h-[420px] sm:h-[500px] lg:h-[560px] flex items-center justify-center"
            style={{ perspective: '1200px' }}
          >
            {/* Orbital Ground Ring */}
            <div
              className="absolute w-[840px] h-[220px] rounded-[100%] border border-emerald-500/10 dark:border-emerald-500/15 pointer-events-none"
              style={{
                transform: `rotateX(68deg) translateZ(-25px)`,
                boxShadow: '0 0 80px rgba(16,185,129,0.06), inset 0 0 80px rgba(16,185,129,0.03)',
              }}
            />

            {/* Inner Orbital Ring */}
            <div
              className="absolute w-[600px] h-[160px] rounded-[100%] border border-emerald-500/5 dark:border-emerald-500/8 pointer-events-none"
              style={{
                transform: `rotateX(68deg) translateZ(-15px)`,
              }}
            />

            {/* ─── Orbiting Product Cards ─── */}
            {featuredProducts.map((product, idx) => {
              const pos = getOrbitalPosition(idx);
              const isActive = activeIdx === idx;
              const isFront = pos.normalizedZ > 0.7;
              const productImage = transparentImage(product);
              if (!productImage) return null;

              return (
                <div
                  key={product.id}
                  onMouseEnter={() => { setActiveIdx(idx); setIsHovering(true); }}
                  onMouseLeave={() => { setActiveIdx(null); setIsHovering(false); handleCardMouseLeave(); }}
                  onMouseMove={isActive ? handleCardMouseMove : undefined}
                  onClick={() => onOpenProduct(product)}
                  className="absolute transition-all ease-out cursor-pointer"
                  style={{
                    transitionDuration: isDragging ? '100ms' : '500ms',
                    transform: `translate3d(${pos.x + parallaxX * pos.normalizedZ}px, ${pos.yOffset + parallaxY * pos.normalizedZ}px, ${pos.z}px) scale(${isActive ? pos.scale * 1.18 : pos.scale})`,
                    opacity: isActive ? 1 : pos.opacity,
                    zIndex: Math.round(pos.normalizedZ * 100) + (isActive ? 50 : 0),
                    filter: pos.normalizedZ < 0.25 ? 'blur(2px) grayscale(0.3)' : 'none',
                  }}
                >
                  {/* Active Glow */}
                  {isActive && (
                    <div className="absolute -inset-5 rounded-[32px] bg-emerald-400/20 dark:bg-emerald-400/15 blur-2xl pointer-events-none animate-pulse" />
                  )}

                  {/* 3D Tilt Card */}
                  <div
                    className="relative w-48 sm:w-56 lg:w-64 h-48 sm:h-56 lg:h-64 flex flex-col items-center justify-center overflow-visible transition-all duration-300"
                    style={{
                      transform: isActive
                        ? `perspective(600px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`
                        : 'perspective(600px) rotateX(0) rotateY(0)',
                      transition: 'transform 0.15s ease-out',
                    }}
                  >
                    {/* Shine Reflection Effect on tilt */}
                    {isActive && (
                      <div
                        className="absolute inset-0 pointer-events-none rounded-3xl z-20"
                        style={{
                          background: `radial-gradient(circle at ${50 + cardTilt.y * 2}% ${50 + cardTilt.x * 2}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
                        }}
                      />
                    )}

                    {/* Product Image */}
                    <img
                      src={productImage}
                      alt={product.name}
                      className={`w-full h-full object-contain relative z-10 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal drop-shadow-[0_8px_20px_rgba(0,0,0,0.15)] ${
                        isActive ? 'scale-110' : ''
                      }`}
                    />

                    {/* Category Badge (Front Items Only) */}
                    {isFront && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white text-[9px] font-bold whitespace-nowrap z-20 shadow-md">
                        {product.category}
                      </div>
                    )}
                  </div>

                  {/* Product Label (Shows on Hover) */}
                  <div className={`mt-3 text-center transition-all duration-300 max-w-[220px] ${
                    isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'
                  }`}>
                    <p className="text-slate-900 dark:text-white font-bold text-sm truncate">
                      {product.name}
                    </p>
                    <p className="text-emerald-600 dark:text-emerald-400/80 text-xs mt-0.5">
                      {product.origin} • MOQ: {product.moq}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ─── Center CTA Button ─── */}
          <div className="flex justify-center pt-2">
            <a
              href="https://ballangkmall.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white text-sm font-bold shadow-xl shadow-emerald-600/30 hover:shadow-emerald-500/40 hover:scale-105 active:scale-95 transition-all whitespace-nowrap group relative overflow-hidden"
            >
              {/* Shimmer Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <ShoppingBag className="w-4 h-4 shrink-0 relative z-10" />
              <span className="relative z-10">{isKm ? 'ទិញទំនិញគំរូ B2B លើ Ballang KMall' : 'Buy Wholesale Samples on Ballang KMall'}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-90 group-hover:translate-x-0.5 transition-transform shrink-0 relative z-10" />
            </a>
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes showcase-float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { opacity: 0.35; }
          100% { transform: translateY(-25px) translateX(12px); opacity: 0.1; }
        }
      `}</style>
    </section>
  );
}
