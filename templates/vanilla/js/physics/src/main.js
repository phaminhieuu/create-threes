import "@/styles/index.css";

import * as THREE from "three";
import camera from "@/webgl/camera";
import { gui, stats } from "@/webgl/gui";
import { renderer, scene } from "@/webgl/renderer";
import { controls } from "@/webgl/orbit-control";
import { debugRapier, getRapier } from "./webgl/physic";

// Light
const light = new THREE.SpotLight();
light.intensity = 10;
light.position.set(3, 5, 5);
light.angle = Math.PI / 3;
light.penumbra = 0.5;
light.castShadow = true;
light.shadow.blurSamples = 10;
light.shadow.radius = 5;
scene.add(light);

// Physics
const { r, world, dynamicBodies } = await getRapier();

const rapierDebug = debugRapier(scene, world);
// const rapierDebug = new RapierDebugRenderer(world, scene);

// Box
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshNormalMaterial(),
);
box.castShadow = true;
scene.add(box);

const boxBody = world.createRigidBody(
  r.RigidBodyDesc.dynamic().setTranslation(0, 5, 0).setCanSleep(false),
);
const boxShape = r.ColliderDesc.cuboid(1, 1, 1).setMass(1).setRestitution(1.1);
world.createCollider(boxShape, boxBody);
dynamicBodies.push([box, boxBody]);

// Sphere
const sphereMesh = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshNormalMaterial(),
);
sphereMesh.castShadow = true;
scene.add(sphereMesh);

const sphereBody = world.createRigidBody(
  r.RigidBodyDesc.dynamic().setTranslation(-3, 5, 0).setCanSleep(false),
);
const sphereShape = r.ColliderDesc.ball(1).setMass(1).setRestitution(1.1);
world.createCollider(sphereShape, sphereBody);
dynamicBodies.push([sphereMesh, sphereBody]);

// Cylinder
const cylinderMesh = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 16),
  new THREE.MeshNormalMaterial(),
);
cylinderMesh.castShadow = true;
scene.add(cylinderMesh);

const cylinderBody = world.createRigidBody(
  r.RigidBodyDesc.dynamic().setTranslation(3, 5, 0).setCanSleep(false),
);
const cylinderShape = r.ColliderDesc.cylinder(1, 1)
  .setMass(1)
  .setRestitution(1.1);
world.createCollider(cylinderShape, cylinderBody);
dynamicBodies.push([cylinderMesh, cylinderBody]);

// Floor
const floorMesh = new THREE.Mesh(
  new THREE.BoxGeometry(100, 1, 100),
  new THREE.MeshPhongMaterial(),
);
floorMesh.receiveShadow = true;
floorMesh.position.y = -0.5;
scene.add(floorMesh);

const floorBody = world.createRigidBody(
  r.RigidBodyDesc.fixed().setTranslation(0, -0.5, 0),
);
const floorShape = r.ColliderDesc.cuboid(50, 0.5, 50);
world.createCollider(floorShape, floorBody);

// Debug physics
const physicDebugFolder = gui.addFolder({
  title: "Physics",
  expanded: true,
});

physicDebugFolder.addBinding(rapierDebug.state, "enabled", {
  label: "debug",
});

const gravityFolder = physicDebugFolder.addFolder({
  title: "Gravity",
});

Object.keys(world.gravity).forEach((key) => {
  gravityFolder.addBinding(world.gravity, key, {
    min: -10,
    max: 10,
    step: 0.1,
  });
});

const clock = new THREE.Clock();

const animate = () => {
  requestAnimationFrame(animate);

  world.timestep = Math.min(clock.getDelta(), 0.1);

  world.step();

  // Copy the physics simulation to the Three.js objects
  for (let i = 0, n = dynamicBodies.length; i < n; i++) {
    dynamicBodies[i][0].position.copy(dynamicBodies[i][1].translation());
    dynamicBodies[i][0].quaternion.copy(dynamicBodies[i][1].rotation());
  }

  controls.update();

  rapierDebug.update();

  stats.update();

  renderer.render(scene, camera);
};

animate();
