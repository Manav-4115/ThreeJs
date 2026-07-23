import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TextureLoader } from "three";
import gsap from "gsap";

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

//Texture 
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("https://images.unsplash.com/photo-1763333869217-42aeeeacccae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8Z");
const texture2 = textureLoader.load("https://images.unsplash.com/photo-1784352425174-83a33a67679f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0MXx8fGVufDB8fHx8fA%3D%3D");

//Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = false;

// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
      vec3 pos = position;

      // pos.z += sin(pos.x * 5.0 + uTime);

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      vUv = uv;
    }
  `,

  fragmentShader: `
uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform float uProgress;
varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main()
{
    vec2 uv = vUv;
    vec2 dir = normalize(vec2(0.0, 1.0));

    float ripple = sin(uProgress * 3.14159) * 0.1;

    float gradient = dot(uv - 0.5 ,dir) + 0.5;  

    float n = snoise(uv * 6.0)*0.25;

    float localGradient = gradient + n;
    
    float edge =0.05;

    float sweep = uProgress * (1.0 + edge * 2.0) - edge;

    float mixer =smoothstep(localGradient - edge, localGradient + edge, sweep);



    vec2 uvA = uv - dir * ripple;
    vec2 uvB = uv + dir * ripple;

    vec4 textureColorA = texture2D(uTextureA, uvA);
    vec4 textureColorB = texture2D(uTextureB, uvB);

    vec4 mixedColor = mix(textureColorA, textureColorB, mixer);

    gl_FragColor = mixedColor;
}
`,

  uniforms: {
    uTime: {
      value: 0,
    },
    uColor: {
      value: new THREE.Color(0, 1, 0), // Initial green color
    },
    uTextureA: {
      value: texture,
    },
    uTextureB: {
      value: texture2,
    },
    uProgress: {
      value: 0
    }
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
window.addEventListener("mousemove", () => {


  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;


  material.uniforms.uColor.value.set(
    Math.random(),
    Math.random(),
    Math.random()
  );
});

window.addEventListener("mouseleave", () => {

  hovered = false;

  gsap.to(material.uniforms.uProgress, {
    value: 0.0,
    duration: 1.2,
    ease: "power2.inOut",
  });

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

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObject(plane);

  if (intersects.length > 0 && !hovered) {

    hovered = true;

    gsap.to(material.uniforms.uProgress, {
      value: 1.0,
      duration: 1.2,
      ease: "power2.inOut",
    });

  }

  if (intersects.length === 0 && hovered) {

    hovered = false;

    gsap.to(material.uniforms.uProgress, {
      value: 0.0,
      duration: 1.2,
      ease: "power2.inOut",
    });

  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);

}

animate();