import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { startGlobeAnimation } from './three-background/animation';
import { TRADE_HUBS, type TradeHub } from './three-background/data';
import { buildGlobeScene, disposeGlobeScene, GLOBE_RADIUS } from './three-background/scene';
import { latLonToVector3 } from './three-background/visuals';

export { TRADE_HUBS } from './three-background/data';
export type { TradeHub } from './three-background/data';

interface ThreeBackgroundProps {
  activeOrigin?: string;
  hubs?: TradeHub[];
  onSelectHub?: (hub: TradeHub) => void;
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activeOrigin = 'all', hubs }) => {
  const activeHubs = hubs ?? TRADE_HUBS;
  const activeHubsKey = activeHubs.map((hub) => [
    hub.id, hub.name, hub.flagUrl, hub.lat, hub.lon, hub.type,
  ].join(':')).join('|');
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationYRef = useRef(0);
  const targetRotationXRef = useRef(0);
  const activeOriginRef = useRef(activeOrigin);

  useEffect(() => {
    activeOriginRef.current = activeOrigin;
  }, [activeOrigin]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 22);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 2);
    cyanLight.position.set(20, 20, 20);
    scene.add(cyanLight);
    const greenLight = new THREE.DirectionalLight(0x10b981, 2);
    greenLight.position.set(-20, -20, -20);
    scene.add(greenLight);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const globe = buildGlobeScene(activeHubs);
    scene.add(globe.globeGroup);
    const defaultPosition = latLonToVector3(11.55, 104.91, GLOBE_RADIUS);
    targetRotationYRef.current = -Math.atan2(defaultPosition.x, defaultPosition.z);
    targetRotationXRef.current = Math.asin(defaultPosition.y / GLOBE_RADIUS) * 0.5;

    let dragging = false;
    let visible = true;
    let previousPointer = { x: 0, y: 0 };
    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      previousPointer = { x: event.clientX, y: event.clientY };
    };
    const handlePointerMove = (event: PointerEvent) => {
      if (!dragging) return;
      targetRotationYRef.current += (event.clientX - previousPointer.x) * 0.004;
      targetRotationXRef.current += (event.clientY - previousPointer.y) * 0.004;
      previousPointer = { x: event.clientX, y: event.clientY };
    };
    const handlePointerUp = () => { dragging = false; };
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);
    window.addEventListener('resize', handleResize, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    const stopAnimation = startGlobeAnimation({
      renderer,
      scene,
      camera,
      globeGroup: globe.globeGroup,
      targetRotationX: targetRotationXRef,
      targetRotationY: targetRotationYRef,
      activeOrigin: activeOriginRef,
      isDragging: () => dragging,
      isVisible: () => visible,
      holoRing1: globe.holoRing1,
      holoRing2: globe.holoRing2,
      khRing: globe.khRing,
      sequentialFlags: globe.sequentialFlags,
      routes: globe.routes,
      airplanes: globe.airplanes,
      ships: globe.ships,
    });

    return () => {
      stopAnimation();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.remove();
      disposeGlobeScene(globe.globeGroup);
      renderer.dispose();
    };
  }, [activeHubsKey]);

  useEffect(() => {
    if (!activeOrigin || activeOrigin === 'all') return;
    const selectedHub = activeHubs.find((hub) => hub.id === activeOrigin);
    if (!selectedHub) return;
    const position = latLonToVector3(selectedHub.lat, selectedHub.lon, GLOBE_RADIUS);
    targetRotationYRef.current = -Math.atan2(position.x, position.z);
    targetRotationXRef.current = Math.asin(position.y / GLOBE_RADIUS) * 0.5;
  }, [activeOrigin, activeHubsKey]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
};
