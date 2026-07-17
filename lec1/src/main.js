import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// Scene
const scene = new THREE.Scene();
//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);

camera.position.set( 0, 20, 100 );
camera.position.z = 5;

//Actor or Mesh or 3D Object
const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00,  });
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

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
const animate = () => {
    controls.update();
        cube.rotation.x+=0.01
        cube.rotation.x+=0.01
        cube.rotation.z+=0.01
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

animate();