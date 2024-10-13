import { Canvas } from "@react-three/fiber";

export default function WebGL({ children }) {
  return <Canvas camera={{ fov: 45 }}>{children}</Canvas>;
}
