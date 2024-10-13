import { PerspectiveCamera } from "three";
import { scene, sizes } from "./renderer";

export const camera = new PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  1000,
);

camera.position.set(0, 0, 5);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

scene.add(camera);

export default camera;
