import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import path from "path";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      treeshake: false,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [glsl(), wasm(), topLevelAwait()],
});
