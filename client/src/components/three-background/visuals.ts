import * as THREE from 'three';

export const latLonToVector3 = (lat: number, lon: number, radius: number) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
};

export const createAirplaneMesh = () => {
  const airplane = new THREE.Group();
  const bodyGeo = new THREE.ConeGeometry(0.1, 0.45, 8);
  bodyGeo.rotateX(Math.PI / 2);
  airplane.add(new THREE.Mesh(bodyGeo, new THREE.MeshPhongMaterial({ color: 0x38bdf8, shininess: 80 })));
  airplane.add(new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.02, 0.15),
    new THREE.MeshPhongMaterial({ color: 0x10b981 }),
  ));
  return airplane;
};

export const createShipMesh = () => {
  const ship = new THREE.Group();
  ship.add(new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.1, 0.15),
    new THREE.MeshPhongMaterial({ color: 0x059669, shininess: 50 }),
  ));
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.1, 0.1),
    new THREE.MeshPhongMaterial({ color: 0x38bdf8 }),
  );
  cabin.position.set(-0.08, 0.08, 0);
  ship.add(cabin);
  return ship;
};

export const createContainerMesh = () => new THREE.Mesh(
  new THREE.BoxGeometry(0.18, 0.12, 0.12),
  new THREE.MeshPhongMaterial({ color: 0x10b981, shininess: 90 }),
);

export const createFlagSprite = (flagUrl: string, countryName: string, isHQ = false) => {
  const group = new THREE.Group();
  const circleCanvas = document.createElement('canvas');
  const size = 128;
  circleCanvas.width = size;
  circleCanvas.height = size;
  const context = circleCanvas.getContext('2d');
  if (context) {
    context.fillStyle = isHQ ? '#064e3b' : '#1e293b';
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2);
    context.fill();
  }
  const circleTexture = new THREE.CanvasTexture(circleCanvas);
  circleTexture.minFilter = THREE.LinearFilter;
  const image = new window.Image();
  image.crossOrigin = 'anonymous';
  image.onload = () => {
    if (!context) return;
    context.clearRect(0, 0, size, size);
    context.save();
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2 - 3, 0, Math.PI * 2);
    context.clip();
    context.drawImage(image, 0, 0, size, size);
    context.restore();
    context.strokeStyle = isHQ ? '#34d399' : '#10b981';
    context.lineWidth = isHQ ? 7 : 5;
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2 - 4, 0, Math.PI * 2);
    context.stroke();
    circleTexture.needsUpdate = true;
  };
  image.src = flagUrl;

  group.add(new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 0.9),
    new THREE.MeshBasicMaterial({ map: circleTexture, transparent: true, depthTest: true, side: THREE.DoubleSide }),
  ));

  const labelCanvas = document.createElement('canvas');
  labelCanvas.width = 180;
  labelCanvas.height = 38;
  const labelContext = labelCanvas.getContext('2d');
  if (labelContext) {
    labelContext.fillStyle = isHQ ? 'rgba(6,78,59,0.92)' : 'rgba(15,23,42,0.90)';
    labelContext.strokeStyle = isHQ ? '#34d399' : '#10b981';
    labelContext.lineWidth = 2.5;
    labelContext.beginPath();
    labelContext.roundRect(3, 3, 174, 32, 16);
    labelContext.fill();
    labelContext.stroke();
    labelContext.font = 'bold 14px "Plus Jakarta Sans",sans-serif';
    labelContext.fillStyle = '#ffffff';
    labelContext.textAlign = 'center';
    labelContext.textBaseline = 'middle';
    labelContext.fillText(isHQ ? '🇰🇭 UNT HQ' : countryName, 90, 19);
  }
  const label = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(labelCanvas), transparent: true, depthTest: true,
  }));
  label.scale.set(1.4, 0.36, 1);
  label.position.set(0, -0.65, 0);
  group.add(label);
  return group;
};

export const getFlagMaterials = (group: THREE.Group) => {
  const materials: THREE.Material[] = [];
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) materials.push((child as THREE.Mesh).material as THREE.Material);
    else if ((child as THREE.Sprite).isSprite) materials.push((child as THREE.Sprite).material);
  });
  return materials;
};
