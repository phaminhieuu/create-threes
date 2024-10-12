import "@/styles/index.css";

import * as THREE from "three";
import camera from "@/webgl/camera";
import { gui, stats } from "@/webgl/gui";
import { renderer, scene } from "@/webgl/renderer";
import { controls } from "@/webgl/orbit-control";

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(-2, 5, 4);

// Light Helper
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  3,
);

scene.add(directionalLight);
scene.add(directionalLightHelper);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshNormalMaterial(),
);

box.position.set(0, 3, 0);
box.castShadow = true;
scene.add(box);

const DirectionalLightFolder = gui.addFolder({
  title: "Directional Light",
});

Object.keys(directionalLight.position).forEach((key) => {
  DirectionalLightFolder.addBinding(
    directionalLight.position,
    key as keyof THREE.Vector3,
    {
      min: -10,
      max: 10,
      step: 0.25,
    },
  );
});

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 12, 12, 12),
  new THREE.MeshToonMaterial({ color: "#444" }),
);

plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Rotate the box
  const r = elapsedTime * 0.1;
  box.rotation.set(r, r, r);

  controls.update();
  stats.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

animate();
