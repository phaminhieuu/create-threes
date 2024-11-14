import { useFrame } from "@react-three/fiber";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { useRef } from "react";
import { ShaderMaterial, Vector2 } from "three";

export default function Example() {
  const shaderRef = useRef<ShaderMaterial>(null);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  return (
    <>
      <mesh castShadow>
        <sphereGeometry />
        <shaderMaterial
          ref={shaderRef}
          uniforms={{
            uTime: { value: 0 },
            uFrequency: { value: new Vector2(32, 15) },
          }}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
      </mesh>
    </>
  );
}
