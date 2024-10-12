import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh, Color } from "three";

export default function Scene() {
  const boxRef = useRef<Mesh>(null);

  const { x, y, z } = useControls("Directional Light", {
    x: {
      value: 0.25,
      min: -100,
      max: 100,
      step: 1,
    },
    y: {
      value: 2,
      min: -100,
      max: 100,
      step: 1,
    },
    z: {
      value: 2.25,
      min: -100,
      max: 100,
      step: 1,
    },
  });

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    // Rotate the box
    const r = elapsedTime * 0.1;
    boxRef.current?.rotation.set(r, r, r);
  });

  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={15}
        shadow-normalBias={0.05}
        position={[x, y, z]}
      />

      <mesh ref={boxRef} position={[0, 2, 0]} castShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshNormalMaterial />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshToonMaterial color={new Color("#444")} />
      </mesh>
    </>
  );
}
