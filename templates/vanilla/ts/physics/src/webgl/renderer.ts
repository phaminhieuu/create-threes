import {
  ACESFilmicToneMapping,
  AxesHelper,
  PCFShadowMap,
  Scene,
  WebGLRenderer,
} from "three";
import { gui, stats } from "./gui";

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
export const scene = new Scene();

document.body.appendChild(stats.dom);

const canvas: HTMLElement = document.querySelector("#webgl") as HTMLElement;

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

// More realistic shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;

renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

// Axes Helper
const axesHelper = new AxesHelper();
scene.add(axesHelper);

gui.addBinding(axesHelper, "visible", {
  label: "AxesHelper",
});

// Stats
stats.init(renderer);

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
  gui,
  stats,
};
