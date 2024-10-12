import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { resolve } from "pathe";

export default defineConfig({
  root: "src",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  build: {
    outDir: "dist",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [glsl()],
});
