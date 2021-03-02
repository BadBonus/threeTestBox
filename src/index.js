import "./style/main.css";
import * as THREE from "three";
import OrbitControls from 'orbit-controls-es6';

/**
 * Sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

window.addEventListener("resize", () => {
  // Save sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Environnements
 */
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 12;
// camera.position.x = 1.5

scene.add(camera);

// Test
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    // ...
  },
  vertexShader: document.getElementById("vertex-shader").textContent,
  fragmentShader: document.getElementById("fragment-shader").textContent,
});
const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(4, 4, 4),
  shaderMaterial
);
scene.add(cube);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".webgl"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

/**
 * Loop
 */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = true;
controls.maxDistance = 1500;
controls.minDistance = 0;


const loop = () => {
  // Update
  // cube.rotation.y += 0.01

  // Render
  renderer.render(scene, camera);

  // Keep looping
  window.requestAnimationFrame(loop);
};
loop();
