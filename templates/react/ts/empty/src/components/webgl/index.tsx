import { Canvas } from "@react-three/fiber";

interface Props {
  children: React.ReactNode;
}

export default function WebGL({ children }: Props) {
  return <Canvas camera={{ fov: 45 }}>{children}</Canvas>;
}
