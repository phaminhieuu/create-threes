import "@/styles/index.css";

import camera from "@/webgl/camera";
import { renderer, scene } from "@/webgl/renderer";
import * as THREE from "three";

const plane = new THREE.Mesh(new THREE.PlaneGeometry());

scene.add(plane);

const animate = () => {
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};

animate();
