import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import path from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [glsl()],
});
