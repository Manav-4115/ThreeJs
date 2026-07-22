import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  100
);
camera.position.z = 2;

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float uTime;

    void main() {
      vec3 pos = position;

      pos.z += sin(pos.x * 5.0 + uTime);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,

  fragmentShader: `
    uniform vec3 uColor;

    void main() {
      gl_FragColor = vec4(uColor, 1.0);
    }
  `,

  uniforms: {
    uTime: {
      value: 0,
    },
    uColor: {
      value: new THREE.Color(0, 1, 0), // Initial green color
    },
  },

  side: THREE.DoubleSide,
});

// Mesh
const plane = new THREE.Mesh(geometry, material);
plane.rotation.y = 1.1;
scene.add(plane);

// Canvas
const canvas = document.querySelector("canvas");

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Change color on click
window.addEventListener("click", () => {
  material.uniforms.uColor.value.set(
    Math.random(),
    Math.random(),
    Math.random()
  );
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
 
});

// Animation
const clock = new THREE.Clock();

function animate() {
  controls.update();

  material.uniforms.uTime.value = clock.getElapsedTime();

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}

animate();