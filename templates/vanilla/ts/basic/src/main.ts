import "./style.css";

import * as THREE from "three";
import camera from "@/core/camera";
import { fpsGraph, gui } from "@/core/gui";
import { renderer, scene } from "@/core/renderer";
import { controls } from "@/core/orbit-control";

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, 2.25);

scene.add(directionalLight);

const box = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 1.5, 1.5),
  new THREE.MeshNormalMaterial(),
);

box.position.set(0, 2, 0);
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
      min: -100,
      max: 100,
      step: 1,
    },
  );
});

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshToonMaterial({ color: "#444" }),
);

plane.rotation.set(-Math.PI / 2, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  fpsGraph.begin();

  const r = elapsedTime * 0.1;
  box.rotation.set(r, r, r);

  controls.update();
  renderer.render(scene, camera);

  fpsGraph.end();
  requestAnimationFrame(animate);
};

animate();
