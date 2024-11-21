import { PerspectiveCamera } from "three";
import { scene, sizes } from "./renderer";

export const camera = new PerspectiveCamera(
  45,
  sizes.width / sizes.height,
);

camera.position.set(10, 10, 10);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
});

scene.add(camera);

export default camera;
