import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const size={
  width:window.innerWidth,
  height:window.innerHeight
}
// Scene
const scene = new THREE.Scene();
const clock =new THREE.Clock();
//Camera
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.01, 100);

camera.position.set( 0, 20, 100 );
camera.position.z = 5;

//Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const pointLight = new THREE.PointLight(0xffffff, 10, 10);
pointLight.position.set(0, 2, 0);
const pointLightHelper = new THREE.PointLightHelper(pointLight);
scene.add(pointLightHelper);
scene.add(pointLight);

//Texture Loader
const textureLoader =new THREE.TextureLoader();
const texture = textureLoader.load(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQly6ia3dqFyQMrJ7wlLgIGkLzRySJO-keTCIkVZMA-qUCtU8ByNIqQkY5&s=10")


//Actor or Mesh or 3D Object
const geometry = new THREE.SphereGeometry( 1, 32, 16 ); // width, height, depthGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshStandardMaterial({ 
  // map:texture, 
  color: 0xfadb0f,});
const cube = new THREE.Mesh(geometry, material);
cube.rotation.y=1.1


scene.add(cube);


//canvas or Parda:
const canvas = document.querySelector("canvas");


//Renderer or Projector
const renderer = new THREE.WebGLRenderer(
    {
        canvas: canvas,

    }
)
window.addEventListener('resize',()=>{
  size.width=window.innerWidth
  size.height=window.innerHeight
  camera.aspect=size.width/size.height
  renderer.setSize(size.width, size.height)
  camera.updateProjectionMatrix()
})
renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
const animate = () => {
  const delta = clock.getElapsedTime();
    controls.update();
        cube.rotation.x=delta
        cube.rotation.x=delta
        cube.rotation.z=delta
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();