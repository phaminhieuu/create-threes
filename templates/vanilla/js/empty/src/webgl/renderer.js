import { Scene, WebGLRenderer } from "three";

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
export const scene = new Scene();

const canvas = document.querySelector("#webgl");

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  updateRenderer();
});

updateRenderer();

export default {
  renderer,
};
