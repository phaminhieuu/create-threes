import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: "src/pages",
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
  plugins: [react()],
});
