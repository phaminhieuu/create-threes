import {
  BallCollider,
  CylinderCollider,
  Physics,
  RigidBody,
} from "@react-three/rapier";
import { folder, useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";

export default function Example() {
  const boxRef = useRef<Mesh>(null);

  const { axesHelper, debug, x, y, z } = useControls({
    axesHelper: true,
    Physics: folder({
      debug: true,
      gravity: folder({
        x: {
          value: 0,
          step: 0.1,
          max: 10,
          min: -10,
        },
        y: {
          value: -9.81,
          step: 0.1,
          max: 10,
          min: -10,
        },
        z: {
          value: 0,
          step: 0.1,
          max: 10,
          min: -10,
        },
      }),
    }),
  });

  return (
    <Physics debug={debug} gravity={[x, y, z]}>
      {axesHelper && <axesHelper />}
      <spotLight
        intensity={10}
        position={[3, 5, 5]}
        penumbra={0.5}
        angle={Math.PI / 3}
        castShadow
        shadow-blurSamples={10}
        shadow-mapSize={[1024, 1024]}
        shadow-radius={5}
      />

      <RigidBody mass={1} restitution={1.1}>
        <mesh ref={boxRef} position-y={5} castShadow>
          <boxGeometry args={[2, 2, 2]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>

      <RigidBody
        mass={1}
        restitution={1.1}
        position={[-3, 5, 0]}
        colliders={false}
      >
        <mesh castShadow>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh>

        <BallCollider args={[1]} />
      </RigidBody>

      <RigidBody
        mass={1}
        restitution={1.1}
        position={[3, 5, 0]}
        colliders={false}
      >
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 2, 16]} />
          <meshNormalMaterial />
        </mesh>
        <CylinderCollider args={[1, 1]} />
      </RigidBody>

      <RigidBody type="fixed">
        <mesh receiveShadow>
          <boxGeometry args={[100, 1, 100]} />
          <meshPhongMaterial />
        </mesh>
      </RigidBody>
    </Physics>
  );
}
