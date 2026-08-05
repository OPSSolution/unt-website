import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface TradeHub {
  id: string;
  name: string;
  flag: string;
  flagUrl: string;
  lat: number;
  lon: number;
  leadTime: string;
  categories: string;
  moq: string;
  type: 'factory' | 'warehouse' | 'port';
}

export const TRADE_HUBS: TradeHub[] = [
  { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/250px-Flag_of_Cambodia.svg.png', lat: 11.55, lon: 104.91, leadTime: '1-2 Days', categories: 'Local Distribution & GI Produce', moq: '100 Units', type: 'warehouse' },
  { id: 'korea', name: 'South Korea', flag: '🇰🇷', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/250px-Flag_of_South_Korea.svg.png', lat: 37.56, lon: 126.97, leadTime: '5-7 Days', categories: 'K-Beauty & OEM Supplements', moq: '1,000 Units', type: 'warehouse' },
  { id: 'japan', name: 'Japan', flag: '🇯🇵', flagUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/Flag_of_Japan.svg/250px-Flag_of_Japan.svg.png', lat: 35.67, lon: 139.65, leadTime: '6-9 Days', categories: 'Personal Care & Health', moq: '800 Units', type: 'port' },
  { id: 'china', name: 'China', flag: '🇨🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/250px-Flag_of_the_People%27s_Republic_of_China.svg.png', lat: 23.12, lon: 113.26, leadTime: '4-6 Days', categories: 'Packaging & Wholesale Goods', moq: '2,000 Units', type: 'factory' },
  { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/250px-Flag_of_Vietnam.svg.png', lat: 10.82, lon: 106.62, leadTime: '1-3 Days', categories: 'Food Processing & Agribusiness', moq: '300 Units', type: 'port' },
  { id: 'laos', name: 'Laos', flag: '🇱🇦', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flag_of_Laos.svg/250px-Flag_of_Laos.svg.png', lat: 17.97, lon: 102.63, leadTime: '2-4 Days', categories: 'Agricultural & Organic Goods', moq: '500 Units', type: 'warehouse' },
  { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/250px-Flag_of_Malaysia.svg.png', lat: 3.13, lon: 101.68, leadTime: '3-5 Days', categories: 'Halal Certified F&B & Cosmetics', moq: '600 Units', type: 'factory' },
];

const CAMBODIA_HUB = { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭', flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_Cambodia.svg/250px-Flag_of_Cambodia.svg.png', lat: 11.55, lon: 104.91 };

interface ThreeBackgroundProps {
  activeOrigin?: string;
  hubs?: TradeHub[];
  onSelectHub?: (hub: TradeHub) => void;
}

// Helper to convert Lat/Lon to 3D Coordinates on Sphere
const latLonToVector3 = (lat: number, lon: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

// Procedural 3D Cargo Airplane
const createAirplaneMesh = (): THREE.Group => {
  const airplane = new THREE.Group();
  const bodyGeo = new THREE.ConeGeometry(0.1, 0.45, 8);
  bodyGeo.rotateX(Math.PI / 2);
  const bodyMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 80 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  airplane.add(body);

  const wingGeo = new THREE.BoxGeometry(0.5, 0.02, 0.15);
  const wingMat = new THREE.MeshPhongMaterial({ color: 0x10b981 });
  const wing = new THREE.Mesh(wingGeo, wingMat);
  airplane.add(wing);

  return airplane;
};

// Procedural 3D Cargo Ship
const createShipMesh = (): THREE.Group => {
  const ship = new THREE.Group();
  const hullGeo = new THREE.BoxGeometry(0.35, 0.1, 0.15);
  const hullMat = new THREE.MeshPhongMaterial({ color: 0x059669, shininess: 50 });
  const hull = new THREE.Mesh(hullGeo, hullMat);
  ship.add(hull);

  const cabinGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const cabinMat = new THREE.MeshPhongMaterial({ color: 0x38bdf8 });
  const cabin = new THREE.Mesh(cabinGeo, cabinMat);
  cabin.position.set(-0.08, 0.08, 0);
  ship.add(cabin);

  return ship;
};

// Procedural Shipping Container Box
const createContainerMesh = (): THREE.Mesh => {
  const geo = new THREE.BoxGeometry(0.18, 0.12, 0.12);
  const mat = new THREE.MeshPhongMaterial({ color: 0x10b981, shininess: 90 });
  return new THREE.Mesh(geo, mat);
};

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ activeOrigin = 'all', hubs: hubsProp }) => {
  const activeHubs = hubsProp ?? TRADE_HUBS;
  const mountRef = useRef<HTMLDivElement>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const targetRotationYRef = useRef<number>(0);
  const targetRotationXRef = useRef<number>(0);
  const activeOriginRef = useRef<string>(activeOrigin);

  useEffect(() => {
    activeOriginRef.current = activeOrigin;
  }, [activeOrigin]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Lighting & Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 22);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0); // Soft Cyan Light
    dirLight1.position.set(20, 20, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 2.0); // Soft Neon Green Light
    dirLight2.position.set(-20, -20, -20);
    scene.add(dirLight2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    const R = 7.5; // Globe Radius

    // 2. Inner Transparent Glass Sphere
    const glassGeo = new THREE.SphereGeometry(R * 0.98, 48, 48);
    const glassMat = new THREE.MeshPhongMaterial({
      color: 0x059669,
      transparent: true,
      opacity: 0.12,
      shininess: 100,
      wireframe: false,
    });
    const glassSphere = new THREE.Mesh(glassGeo, glassMat);
    globeGroup.add(glassSphere);

    // 3. Glowing Network Wireframe Lattice
    const sphereGeo = new THREE.SphereGeometry(R, 36, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // 4. Dense Landmass / Connected Nodes Point Cloud
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const lat = (Math.random() - 0.5) * 160;
      const lon = (Math.random() - 0.5) * 360;
      const vec = latLonToVector3(lat, lon, R);
      positions[i * 3] = vec.x;
      positions[i * 3 + 1] = vec.y;
      positions[i * 3 + 2] = vec.z;
    }
    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const landMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
    });
    const landPoints = new THREE.Points(landGeo, landMat);
    globeGroup.add(landPoints);

    // 5. Floating Holographic Rings around Earth
    const ring1Geo = new THREE.RingGeometry(R * 1.25, R * 1.27, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const holoRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    holoRing1.rotation.x = Math.PI / 3;
    globeGroup.add(holoRing1);

    const ring2Geo = new THREE.RingGeometry(R * 1.4, R * 1.41, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const holoRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    holoRing2.rotation.y = Math.PI / 4;
    globeGroup.add(holoRing2);

    // 6. Floating Ambient Data Particles
    const dataParticleCount = 150;
    const dataPos = new Float32Array(dataParticleCount * 3);
    for (let i = 0; i < dataParticleCount; i++) {
      const radius = R * (1.1 + Math.random() * 0.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      dataPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dataPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      dataPos[i * 3 + 2] = radius * Math.cos(phi);
    }
    const dataGeo = new THREE.BufferGeometry();
    dataGeo.setAttribute('position', new THREE.BufferAttribute(dataPos, 3));
    const dataMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.18,
      transparent: true,
      opacity: 0.8,
    });
    const dataPoints = new THREE.Points(dataGeo, dataMat);
    globeGroup.add(dataPoints);

    // 7. Trade Hub Beacons (Factory, Warehouse, Port Markers)
    const khPos = latLonToVector3(CAMBODIA_HUB.lat, CAMBODIA_HUB.lon, R);

    // Helper: Create a small circular flag badge using direct Wikipedia image URL
    const createFlagSprite = (
      flagUrl: string,
      countryName: string,
      isHQ = false
    ): THREE.Group => {
      const group = new THREE.Group();

      // --- Small Circular Flag Disc ---
      const circleCanvas = document.createElement('canvas');
      const S = 128;
      circleCanvas.width = S;
      circleCanvas.height = S;
      const cCtx = circleCanvas.getContext('2d');
      if (cCtx) {
        cCtx.fillStyle = isHQ ? '#064e3b' : '#1e293b';
        cCtx.beginPath();
        cCtx.arc(S / 2, S / 2, S / 2 - 2, 0, Math.PI * 2);
        cCtx.fill();
      }
      const circleTexture = new THREE.CanvasTexture(circleCanvas);
      circleTexture.minFilter = THREE.LinearFilter;

      // Load Wikipedia flag image, clip to circle
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (!cCtx) return;
        cCtx.clearRect(0, 0, S, S);
        cCtx.save();
        cCtx.beginPath();
        cCtx.arc(S / 2, S / 2, S / 2 - 3, 0, Math.PI * 2);
        cCtx.closePath();
        cCtx.clip();
        cCtx.drawImage(img, 0, 0, S, S);
        cCtx.restore();
        // Glowing ring border
        cCtx.strokeStyle = isHQ ? '#34d399' : '#10b981';
        cCtx.lineWidth = isHQ ? 7 : 5;
        cCtx.beginPath();
        cCtx.arc(S / 2, S / 2, S / 2 - 4, 0, Math.PI * 2);
        cCtx.stroke();
        circleTexture.needsUpdate = true;
      };
      img.src = flagUrl;

      // Small circular plane mesh
      const circleGeo = new THREE.PlaneGeometry(0.9, 0.9);
      const circleMat = new THREE.MeshBasicMaterial({
        map: circleTexture,
        transparent: true,
        depthTest: true,
        side: THREE.DoubleSide,
      });
      const circleMesh = new THREE.Mesh(circleGeo, circleMat);
      group.add(circleMesh);

      // --- Compact Country Name Label Below Flag ---
      const lblCanvas = document.createElement('canvas');
      lblCanvas.width = 180;
      lblCanvas.height = 38;
      const lCtx = lblCanvas.getContext('2d');
      if (lCtx) {
        lCtx.fillStyle = isHQ ? 'rgba(6,78,59,0.92)' : 'rgba(15,23,42,0.90)';
        lCtx.strokeStyle = isHQ ? '#34d399' : '#10b981';
        lCtx.lineWidth = 2.5;
        lCtx.beginPath();
        lCtx.roundRect(3, 3, 174, 32, 16);
        lCtx.fill();
        lCtx.stroke();
        lCtx.font = 'bold 14px "Plus Jakarta Sans",sans-serif';
        lCtx.fillStyle = '#ffffff';
        lCtx.textAlign = 'center';
        lCtx.textBaseline = 'middle';
        lCtx.fillText(isHQ ? '🇰🇭 UNT HQ' : countryName, 90, 19);
      }
      const lblTex = new THREE.CanvasTexture(lblCanvas);
      lblTex.minFilter = THREE.LinearFilter;
      const lblSprite = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: lblTex, transparent: true, depthTest: true })
      );
      lblSprite.scale.set(1.4, 0.36, 1);
      lblSprite.position.set(0, -0.65, 0);
      group.add(lblSprite);

      return group;
    };

    // Cambodia HQ Pulsing Beacon & Real Flag Badge
    const khRingGeo = new THREE.RingGeometry(0.3, 0.48, 32);
    const khRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const khRing = new THREE.Mesh(khRingGeo, khRingMat);
    khRing.position.copy(khPos);
    khRing.lookAt(khPos.clone().multiplyScalar(2));
    globeGroup.add(khRing);

    // Cambodia Flag Badge (Wikipedia URL) — always visible, pulsing HQ
    const khFlagGroup = createFlagSprite(CAMBODIA_HUB.flagUrl, 'UNT HQ', true);
    const khLabelPos = latLonToVector3(CAMBODIA_HUB.lat, CAMBODIA_HUB.lon, R * 1.15);
    khFlagGroup.position.copy(khLabelPos);
    globeGroup.add(khFlagGroup);

    // Helper: collect all opacity-animatable materials from a flag group
    const getFlagMaterials = (group: THREE.Group): THREE.Material[] => {
      const mats: THREE.Material[] = [];
      group.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          mats.push((child as THREE.Mesh).material as THREE.Material);
        } else if ((child as THREE.Sprite).isSprite) {
          mats.push((child as THREE.Sprite).material);
        }
      });
      return mats;
    };

    // Build sequential flag groups array (trade hubs only, Cambodia is always on)
    const sequentialFlags: { hubId: string; group: THREE.Group; mats: THREE.Material[] }[] = [];

    // B2B Origin Hubs with Wikipedia Flag Badges — start hidden, animate one by one
    activeHubs.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, R);

      const ringGeo = new THREE.RingGeometry(0.18, 0.3, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.type === 'factory' ? 0x34d399 : hub.type === 'warehouse' ? 0x38bdf8 : 0x6ee7b7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      globeGroup.add(ring);

      // Flag badge starts fully transparent
      const flagGroup = createFlagSprite(hub.flagUrl, hub.name);
      const labelPos = latLonToVector3(hub.lat, hub.lon, R * 1.15);
      flagGroup.position.copy(labelPos);
      // Hide initially
      const mats = getFlagMaterials(flagGroup);
      mats.forEach((m) => { m.transparent = true; (m as THREE.MeshBasicMaterial).opacity = 0; });
      globeGroup.add(flagGroup);
      sequentialFlags.push({ hubId: hub.id, group: flagGroup, mats });
    });

    // Timing constants for the one-by-one flow
    const FLAG_HOLD_TIME = 2.0;   // seconds each flag stays fully visible (solo)
    const FLAG_FADE_TIME = 0.5;   // seconds to fade in / fade out
    const FLAG_CYCLE_TIME = FLAG_HOLD_TIME + FLAG_FADE_TIME * 2; // per-flag slot
    const FLAG_SEQ_TOTAL = FLAG_CYCLE_TIME * sequentialFlags.length; // sequential phase length
    const FLAG_ALL_HOLD = 2.5;  // seconds all flags are shown together
    const FLAG_ALL_FADE = 0.6;  // fade in/out for the all-visible phase
    const FLAG_TOTAL_CYCLE = FLAG_SEQ_TOTAL + FLAG_ALL_FADE * 2 + FLAG_ALL_HOLD; // full loop

    // 8. Animated Trade Routes & Moving Containers / Cargo Pulses
    const routesData: { curve: THREE.QuadraticBezierCurve3; containerMesh: THREE.Mesh }[] = [];

    activeHubs.forEach((hub) => {
      const originPos = latLonToVector3(hub.lat, hub.lon, R);
      const mid = originPos.clone().add(khPos).multiplyScalar(0.5);
      const dist = originPos.distanceTo(khPos);
      mid.normalize().multiplyScalar(R + dist * 0.38); // Curved arc height

      const curve = new THREE.QuadraticBezierCurve3(originPos, mid, khPos);
      const points = curve.getPoints(50);

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      globeGroup.add(line);

      // Moving Cargo Container Box along arc
      const containerMesh = createContainerMesh();
      globeGroup.add(containerMesh);

      routesData.push({ curve, containerMesh });
    });

    // 9. Flying Cargo Airplanes
    const airplanes: { group: THREE.Group; speed: number; radius: number; angle: number; tilt: number }[] = [];
    for (let i = 0; i < 4; i++) {
      const plane = createAirplaneMesh();
      globeGroup.add(plane);
      airplanes.push({
        group: plane,
        speed: 0.003 + i * 0.001,
        radius: R + 1.8 + i * 0.4,
        angle: Math.random() * Math.PI * 2,
        tilt: (i - 1.5) * 0.4,
      });
    }

    // 10. Cargo Ships Sailing around the Globe
    const ships: { group: THREE.Group; speed: number; radius: number; angle: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const ship = createShipMesh();
      globeGroup.add(ship);
      ships.push({
        group: ship,
        speed: 0.002 + i * 0.001,
        radius: R + 0.15,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Camera initial orientation
    const defaultVec = latLonToVector3(CAMBODIA_HUB.lat, CAMBODIA_HUB.lon, R);
    targetRotationYRef.current = -Math.atan2(defaultVec.x, defaultVec.z);
    targetRotationXRef.current = Math.asin(defaultVec.y / R) * 0.5;

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotationYRef.current += deltaX * 0.004;
      targetRotationXRef.current += deltaY * 0.004;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });

    observer.observe(container);
    window.addEventListener('resize', handleResize, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 11. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth Rotation Interpolation
      globeGroup.rotation.y += (targetRotationYRef.current - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationXRef.current - globeGroup.rotation.x) * 0.05;

      // Slow ambient rotation drift when not dragging
      if (!isDragging) {
        targetRotationYRef.current += 0.0012;
      }

      // Rotate Holographic Rings
      holoRing1.rotation.z = elapsedTime * 0.1;
      holoRing2.rotation.z = -elapsedTime * 0.08;

      // Animate Cambodia HQ Pulsing Ring
      const pulseScale = 1 + Math.sin(elapsedTime * 4) * 0.25;
      khRing.scale.set(pulseScale, pulseScale, 1);

      // ── Sequential & Focus Country Flag Flow Animation ──
      if (sequentialFlags.length > 0) {
        const selectedId = activeOriginRef.current;
        const isSingleSelected = selectedId && selectedId !== 'all';

        if (isSingleSelected) {
          // Highlight selected country hub flag continuously
          sequentialFlags.forEach((entry) => {
            const targetOpacity = entry.hubId === selectedId ? 1 : 0.25;
            entry.mats.forEach((mat) => {
              const cur = (mat as THREE.MeshBasicMaterial).opacity;
              (mat as THREE.MeshBasicMaterial).opacity = cur + (targetOpacity - cur) * 0.15;
            });
            const sc = 0.6 + (entry.mats[0] as THREE.MeshBasicMaterial).opacity * 0.4;
            entry.group.scale.set(sc, sc, sc);
          });
        } else {
          // Phase 1: one-by-one spotlight │ Phase 2: all visible together │ repeat
          const cycleT = elapsedTime % FLAG_TOTAL_CYCLE;
          const inAllPhase = cycleT >= FLAG_SEQ_TOTAL;

          if (inAllPhase) {
            // Phase 2 — ALL flags visible simultaneously
            const allLocalT = cycleT - FLAG_SEQ_TOTAL;
            let allTarget = 0;
            if (allLocalT < FLAG_ALL_FADE) {
              allTarget = allLocalT / FLAG_ALL_FADE;               // fade in together
            } else if (allLocalT < FLAG_ALL_FADE + FLAG_ALL_HOLD) {
              allTarget = 1;                                        // hold all visible
            } else {
              allTarget = 1 - (allLocalT - FLAG_ALL_FADE - FLAG_ALL_HOLD) / FLAG_ALL_FADE; // fade out
            }

            sequentialFlags.forEach((entry) => {
              entry.mats.forEach((mat) => {
                const cur = (mat as THREE.MeshBasicMaterial).opacity;
                (mat as THREE.MeshBasicMaterial).opacity = cur + (allTarget - cur) * 0.12;
              });
              const sc = 0.6 + (entry.mats[0] as THREE.MeshBasicMaterial).opacity * 0.4;
              entry.group.scale.set(sc, sc, sc);
            });
          } else {
            // Phase 1 — one by one sequential spotlight
            sequentialFlags.forEach((entry, idx) => {
              const slotStart = idx * FLAG_CYCLE_TIME;
              const slotEnd = slotStart + FLAG_CYCLE_TIME;
              const localT = cycleT - slotStart;

              let targetOpacity = 0;
              if (cycleT >= slotStart && cycleT < slotEnd) {
                if (localT < FLAG_FADE_TIME) {
                  targetOpacity = localT / FLAG_FADE_TIME;          // fade in
                } else if (localT < FLAG_FADE_TIME + FLAG_HOLD_TIME) {
                  targetOpacity = 1;                                // hold
                } else {
                  targetOpacity = 1 - (localT - FLAG_FADE_TIME - FLAG_HOLD_TIME) / FLAG_FADE_TIME; // fade out
                }
              }

              entry.mats.forEach((mat) => {
                const cur = (mat as THREE.MeshBasicMaterial).opacity;
                (mat as THREE.MeshBasicMaterial).opacity = cur + (targetOpacity - cur) * 0.12;
              });
              const sc = 0.6 + (entry.mats[0] as THREE.MeshBasicMaterial).opacity * 0.4;
              entry.group.scale.set(sc, sc, sc);
            });
          }
        }
      }

      // Animate Shipping Containers Along Trade Arcs
      routesData.forEach((route, idx) => {
        const t = ((elapsedTime * 0.25) + (idx * 0.2)) % 1;
        const pos = route.curve.getPoint(t);
        const tangent = route.curve.getTangent(t);
        route.containerMesh.position.copy(pos);
        route.containerMesh.lookAt(pos.clone().add(tangent));
      });

      // Animate Flying Cargo Airplanes
      airplanes.forEach((plane) => {
        plane.angle += plane.speed;
        const x = Math.cos(plane.angle) * plane.radius;
        const z = Math.sin(plane.angle) * plane.radius;
        const y = Math.sin(plane.angle * 2) * plane.tilt * 2;
        plane.group.position.set(x, y, z);
        plane.group.lookAt(
          Math.cos(plane.angle + 0.1) * plane.radius,
          Math.sin((plane.angle + 0.1) * 2) * plane.tilt * 2,
          Math.sin(plane.angle + 0.1) * plane.radius
        );
      });

      // Animate Cargo Ships Sailing
      ships.forEach((ship) => {
        ship.angle += ship.speed;
        const x = Math.cos(ship.angle) * ship.radius;
        const z = Math.sin(ship.angle) * ship.radius;
        ship.group.position.set(x, 0, z);
        ship.group.lookAt(Math.cos(ship.angle + 0.1) * ship.radius, 0, Math.sin(ship.angle + 0.1) * ship.radius);
      });

      // Floating Y-axis bobbing
      globeGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      glassGeo.dispose();
      glassMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      landGeo.dispose();
      landMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      dataGeo.dispose();
      dataMat.dispose();
      khRingGeo.dispose();
      khRingMat.dispose();
      renderer.dispose();
    };
  }, [activeHubs]);

  // Rotate globe smoothly when activeOrigin changes
  useEffect(() => {
    if (activeOrigin && activeOrigin !== 'all') {
      const selectedHub = activeHubs.find((h) => h.id === activeOrigin);
      if (selectedHub) {
        const R = 7.5;
        const vec = latLonToVector3(selectedHub.lat, selectedHub.lon, R);
        targetRotationYRef.current = -Math.atan2(vec.x, vec.z);
        targetRotationXRef.current = Math.asin(vec.y / R) * 0.5;
      }
    }
  }, [activeOrigin]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
};
