import * as THREE from 'three';
import type { AirplaneAnimation, RouteAnimation, SequentialFlag, ShipAnimation } from './animation';
import { CAMBODIA_HUB, type TradeHub } from './data';
import { createAirplaneMesh, createContainerMesh, createFlagSprite, createShipMesh, getFlagMaterials, latLonToVector3 } from './visuals';

export const GLOBE_RADIUS = 7.5;

export interface GlobeSceneObjects {
  globeGroup: THREE.Group;
  holoRing1: THREE.Mesh;
  holoRing2: THREE.Mesh;
  khRing: THREE.Mesh;
  sequentialFlags: SequentialFlag[];
  routes: RouteAnimation[];
  airplanes: AirplaneAnimation[];
  ships: ShipAnimation[];
}

export function buildGlobeScene(hubs: TradeHub[]): GlobeSceneObjects {
  const globeGroup = new THREE.Group();
  const radius = GLOBE_RADIUS;

  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(radius * 0.98, 48, 48),
    new THREE.MeshPhongMaterial({ color: 0x059669, transparent: true, opacity: 0.12, shininess: 100 }),
  ));
  globeGroup.add(new THREE.Mesh(
    new THREE.SphereGeometry(radius, 36, 24),
    new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.15 }),
  ));

  const landPositions = new Float32Array(1000 * 3);
  for (let index = 0; index < 1000; index++) {
    const point = latLonToVector3((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 360, radius);
    point.toArray(landPositions, index * 3);
  }
  const landGeometry = new THREE.BufferGeometry();
  landGeometry.setAttribute('position', new THREE.BufferAttribute(landPositions, 3));
  globeGroup.add(new THREE.Points(
    landGeometry,
    new THREE.PointsMaterial({ color: 0x34d399, size: 0.22, transparent: true, opacity: 0.65 }),
  ));

  const holoRing1 = new THREE.Mesh(
    new THREE.RingGeometry(radius * 1.25, radius * 1.27, 64),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.35 }),
  );
  holoRing1.rotation.x = Math.PI / 3;
  globeGroup.add(holoRing1);
  const holoRing2 = new THREE.Mesh(
    new THREE.RingGeometry(radius * 1.4, radius * 1.41, 64),
    new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.25 }),
  );
  holoRing2.rotation.y = Math.PI / 4;
  globeGroup.add(holoRing2);

  const particlePositions = new Float32Array(150 * 3);
  for (let index = 0; index < 150; index++) {
    const distance = radius * (1.1 + Math.random() * 0.5);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    particlePositions[index * 3] = distance * Math.sin(phi) * Math.cos(theta);
    particlePositions[index * 3 + 1] = distance * Math.sin(phi) * Math.sin(theta);
    particlePositions[index * 3 + 2] = distance * Math.cos(phi);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  globeGroup.add(new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.18, transparent: true, opacity: 0.8 }),
  ));

  const cambodiaPosition = latLonToVector3(CAMBODIA_HUB.lat, CAMBODIA_HUB.lon, radius);
  const khRing = new THREE.Mesh(
    new THREE.RingGeometry(0.3, 0.48, 32),
    new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, transparent: true, opacity: 0.95 }),
  );
  khRing.position.copy(cambodiaPosition);
  khRing.lookAt(cambodiaPosition.clone().multiplyScalar(2));
  globeGroup.add(khRing);

  const headquartersFlag = createFlagSprite(CAMBODIA_HUB.flagUrl, 'UNT HQ', true);
  headquartersFlag.position.copy(latLonToVector3(CAMBODIA_HUB.lat, CAMBODIA_HUB.lon, radius * 1.15));
  globeGroup.add(headquartersFlag);

  const sequentialFlags: SequentialFlag[] = [];
  const routes: RouteAnimation[] = [];
  hubs.forEach((hub) => {
    const position = latLonToVector3(hub.lat, hub.lon, radius);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.18, 0.3, 24),
      new THREE.MeshBasicMaterial({
        color: hub.type === 'factory' ? 0x34d399 : hub.type === 'warehouse' ? 0x38bdf8 : 0x6ee7b7,
        side: THREE.DoubleSide, transparent: true, opacity: 0.85,
      }),
    );
    ring.position.copy(position);
    ring.lookAt(position.clone().multiplyScalar(2));
    globeGroup.add(ring);

    const flag = createFlagSprite(hub.flagUrl, hub.name);
    flag.position.copy(latLonToVector3(hub.lat, hub.lon, radius * 1.15));
    const materials = getFlagMaterials(flag);
    materials.forEach((material) => {
      material.transparent = true;
      (material as THREE.MeshBasicMaterial).opacity = 0;
    });
    globeGroup.add(flag);
    sequentialFlags.push({ hubId: hub.id, group: flag, mats: materials });

    const midpoint = position.clone().add(cambodiaPosition).multiplyScalar(0.5);
    midpoint.normalize().multiplyScalar(radius + position.distanceTo(cambodiaPosition) * 0.38);
    const curve = new THREE.QuadraticBezierCurve3(position, midpoint, cambodiaPosition);
    globeGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)),
      new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending }),
    ));
    const containerMesh = createContainerMesh();
    globeGroup.add(containerMesh);
    routes.push({ curve, containerMesh });
  });

  const airplanes: AirplaneAnimation[] = Array.from({ length: 4 }, (_, index) => {
    const group = createAirplaneMesh();
    globeGroup.add(group);
    return { group, speed: 0.003 + index * 0.001, radius: radius + 1.8 + index * 0.4, angle: Math.random() * Math.PI * 2, tilt: (index - 1.5) * 0.4 };
  });
  const ships: ShipAnimation[] = Array.from({ length: 3 }, (_, index) => {
    const group = createShipMesh();
    globeGroup.add(group);
    return { group, speed: 0.002 + index * 0.001, radius: radius + 0.15, angle: Math.random() * Math.PI * 2 };
  });

  return { globeGroup, holoRing1, holoRing2, khRing, sequentialFlags, routes, airplanes, ships };
}

export function disposeGlobeScene(group: THREE.Group) {
  group.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    materials.forEach((material) => {
      const map = (material as THREE.MeshBasicMaterial).map;
      map?.dispose();
      material.dispose();
    });
  });
}
