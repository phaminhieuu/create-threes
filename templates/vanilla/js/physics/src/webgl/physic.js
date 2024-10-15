import * as THREE from "three";

export async function getRapier() {
  const r = await import("@dimforge/rapier3d");
  const gravity = new r.Vector3(0, -9.81, 0);
  const world = new r.World(gravity);
  const dynamicBodies = [];

  return {
    r,
    world,
    dynamicBodies,
  };
}

export function debugRapier(scene, world) {
  const state = {
    enabled: true,
  };

  const mesh = new THREE.LineSegments(
    new THREE.BufferGeometry(),
    new THREE.LineBasicMaterial({ color: 0xffffff, vertexColors: true }),
  );
  mesh.frustumCulled = false;
  scene.add(mesh);

  function update() {
    if (!state.enabled) {
      mesh.visible = false;
      return;
    } else {
      mesh.visible = true;
      const { vertices, colors } = world.debugRender();
      mesh.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices, 3),
      );
      mesh.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 4));
    }
  }

  return {
    mesh,
    update,
    state,
  };
}
