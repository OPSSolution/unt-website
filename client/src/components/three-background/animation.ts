import * as THREE from 'three';

export interface SequentialFlag {
  hubId: string;
  group: THREE.Group;
  mats: THREE.Material[];
}

export interface RouteAnimation {
  curve: THREE.QuadraticBezierCurve3;
  containerMesh: THREE.Mesh;
}

export interface AirplaneAnimation {
  group: THREE.Group;
  speed: number;
  radius: number;
  angle: number;
  tilt: number;
}

export interface ShipAnimation {
  group: THREE.Group;
  speed: number;
  radius: number;
  angle: number;
}

interface AnimationOptions {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.Camera;
  globeGroup: THREE.Group;
  targetRotationX: React.MutableRefObject<number>;
  targetRotationY: React.MutableRefObject<number>;
  activeOrigin: React.MutableRefObject<string>;
  isDragging: () => boolean;
  isVisible: () => boolean;
  holoRing1: THREE.Mesh;
  holoRing2: THREE.Mesh;
  khRing: THREE.Mesh;
  sequentialFlags: SequentialFlag[];
  routes: RouteAnimation[];
  airplanes: AirplaneAnimation[];
  ships: ShipAnimation[];
}

const FLAG_HOLD_TIME = 2;
const FLAG_FADE_TIME = 0.5;
const FLAG_CYCLE_TIME = FLAG_HOLD_TIME + FLAG_FADE_TIME * 2;
const FLAG_ALL_HOLD = 2.5;
const FLAG_ALL_FADE = 0.6;

const setFlagTarget = (entry: SequentialFlag, target: number, speed: number) => {
  entry.mats.forEach((material) => {
    const current = (material as THREE.MeshBasicMaterial).opacity;
    (material as THREE.MeshBasicMaterial).opacity = current + (target - current) * speed;
  });
  const opacity = (entry.mats[0] as THREE.MeshBasicMaterial).opacity;
  entry.group.scale.setScalar(0.6 + opacity * 0.4);
};

const animateFlags = (flags: SequentialFlag[], selectedId: string, elapsed: number) => {
  if (flags.length === 0) return;
  if (selectedId && selectedId !== 'all') {
    flags.forEach((entry) => setFlagTarget(entry, entry.hubId === selectedId ? 1 : 0.25, 0.15));
    return;
  }

  const sequenceDuration = FLAG_CYCLE_TIME * flags.length;
  const totalDuration = sequenceDuration + FLAG_ALL_FADE * 2 + FLAG_ALL_HOLD;
  const cycleTime = elapsed % totalDuration;

  if (cycleTime >= sequenceDuration) {
    const localTime = cycleTime - sequenceDuration;
    const target = localTime < FLAG_ALL_FADE
      ? localTime / FLAG_ALL_FADE
      : localTime < FLAG_ALL_FADE + FLAG_ALL_HOLD
        ? 1
        : 1 - (localTime - FLAG_ALL_FADE - FLAG_ALL_HOLD) / FLAG_ALL_FADE;
    flags.forEach((entry) => setFlagTarget(entry, target, 0.12));
    return;
  }

  flags.forEach((entry, index) => {
    const slotStart = index * FLAG_CYCLE_TIME;
    const localTime = cycleTime - slotStart;
    let target = 0;
    if (localTime >= 0 && localTime < FLAG_CYCLE_TIME) {
      target = localTime < FLAG_FADE_TIME
        ? localTime / FLAG_FADE_TIME
        : localTime < FLAG_FADE_TIME + FLAG_HOLD_TIME
          ? 1
          : 1 - (localTime - FLAG_FADE_TIME - FLAG_HOLD_TIME) / FLAG_FADE_TIME;
    }
    setFlagTarget(entry, target, 0.12);
  });
};

export function startGlobeAnimation(options: AnimationOptions) {
  const clock = new THREE.Clock();
  let frameId = 0;

  const animate = () => {
    frameId = requestAnimationFrame(animate);
    if (!options.isVisible()) return;
    const elapsed = clock.getElapsedTime();

    options.globeGroup.rotation.y += (options.targetRotationY.current - options.globeGroup.rotation.y) * 0.05;
    options.globeGroup.rotation.x += (options.targetRotationX.current - options.globeGroup.rotation.x) * 0.05;
    if (!options.isDragging()) options.targetRotationY.current += 0.0012;

    options.holoRing1.rotation.z = elapsed * 0.1;
    options.holoRing2.rotation.z = -elapsed * 0.08;
    const pulseScale = 1 + Math.sin(elapsed * 4) * 0.25;
    options.khRing.scale.set(pulseScale, pulseScale, 1);
    animateFlags(options.sequentialFlags, options.activeOrigin.current, elapsed);

    options.routes.forEach((route, index) => {
      const progress = ((elapsed * 0.25) + (index * 0.2)) % 1;
      const position = route.curve.getPoint(progress);
      route.containerMesh.position.copy(position);
      route.containerMesh.lookAt(position.clone().add(route.curve.getTangent(progress)));
    });

    options.airplanes.forEach((plane) => {
      plane.angle += plane.speed;
      const x = Math.cos(plane.angle) * plane.radius;
      const z = Math.sin(plane.angle) * plane.radius;
      const y = Math.sin(plane.angle * 2) * plane.tilt * 2;
      plane.group.position.set(x, y, z);
      plane.group.lookAt(
        Math.cos(plane.angle + 0.1) * plane.radius,
        Math.sin((plane.angle + 0.1) * 2) * plane.tilt * 2,
        Math.sin(plane.angle + 0.1) * plane.radius,
      );
    });

    options.ships.forEach((ship) => {
      ship.angle += ship.speed;
      const x = Math.cos(ship.angle) * ship.radius;
      const z = Math.sin(ship.angle) * ship.radius;
      ship.group.position.set(x, 0, z);
      ship.group.lookAt(Math.cos(ship.angle + 0.1) * ship.radius, 0, Math.sin(ship.angle + 0.1) * ship.radius);
    });

    options.globeGroup.position.y = Math.sin(elapsed * 1.2) * 0.35;
    options.renderer.render(options.scene, options.camera);
  };

  animate();
  return () => cancelAnimationFrame(frameId);
}
