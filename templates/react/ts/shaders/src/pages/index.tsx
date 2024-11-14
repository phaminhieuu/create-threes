import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import Example from "./example";
import WebGL from "@/components/webgl";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebGL>
      <Example />
    </WebGL>
  </StrictMode>,
);
