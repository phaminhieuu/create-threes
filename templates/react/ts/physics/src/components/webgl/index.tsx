import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

interface Props {
  children: React.ReactNode;
}

export default function WebGL({ children }: Props) {
  return (
    <Canvas
      shadows
      camera={{
        position: [10, 10, 10],
        fov: 45,
      }}
    >
      <OrbitControls />
      <Perf position="top-left" />
      {children}
    </Canvas>
  );
}
