import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh, Color, DirectionalLight, DirectionalLightHelper } from "three";

export default function Example() {
  const boxRef = useRef<Mesh>(null);
  const lightRef = useRef<DirectionalLight>(new DirectionalLight());

  useHelper(lightRef, DirectionalLightHelper, 3);

  const { axesHelper } = useControls({
    axesHelper: true,
  });

  const { x, y, z } = useControls("Directional Light", {
    x: {
      value: -2,
      min: -10,
      max: 10,
      step: 0.25,
    },
    y: {
      value: 5,
      min: -10,
      max: 10,
      step: 0.25,
    },
    z: {
      value: 4,
      min: -10,
      max: 10,
      step: 0.25,
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
      {axesHelper && <axesHelper />}
      <ambientLight intensity={0.1} />
      <directionalLight
        ref={lightRef}
        intensity={1}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={20}
        shadow-normalBias={0.05}
        position={[x, y, z]}
      />

      <mesh ref={boxRef} position-y={3} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshNormalMaterial />
      </mesh>

      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[12, 12, 12, 12]} />
        <meshToonMaterial color={new Color("#444")} />
      </mesh>
    </>
  );
}
