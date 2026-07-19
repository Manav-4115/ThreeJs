import {
  Environment,
  Instance,
  Instances,
  useGLTF,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef } from "react";
import { TorusGeometry } from "three";
import * as THREE from "three";
// import { texture } from "three/src/nodes/accessors/TextureNode.js";

const Experience = () => {
  const cubeRef = useRef(null);
  useFrame((state, delta) => {
    // cubeRef.current.rotation.y += delta;
    // cubeRef.current.rotation.x += delta;
    // cubeRef.current.rotation.z += delta;
  });

  //Textures
  //   const videoTexture = useVideoTexture("../../public/watermarked_preview.mp4")

  // const texture =useTexture("https://plus.unsplash.com/premium_photo-1668708796303-2f5e632e1894?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3MHx8fGVufDB8fHx8fA%3D%3D");

  //3D model
  //   const {scene}=useGLTF("../../public/Soldier.glb");
  //   console.log(scene)

  const handleClick = () => {
    cubeRef.current.material.color.set("blue");
  };

  return (
    <>
      {/* <mesh position={[2, 0, 0]}> */}
      {/* <mesh ref={cubeRef} onClick={handleClick}> */}
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        {/* {<torusGeometry args={[1, 0.4, 16, 32]} />} */}
        {/* <meshStandardMaterial roughness={0.2} metalness={4} color={"red"} /> */}
      {/* </mesh> */}

     {/* hdr file  */} 
      <Environment files="../../public/cobblestone_parish_road_2k.hdr"  />

      {/* <mesh position={[2, 0, 0]}>
        <boxGeometry args={[3,3,3]}/>
        {/* <torusGeometry args={[1, 0.4, 16, 32]}  /> */}
      {/* <meshBasicMaterial color={'red'} wireframe={false}  /> */}
      {/* </mesh> */}

      {/* hdr file  */}
      {/* 
        <ambientLight intensity={3} color={"white"} />
      <primitive object={scene}   /> */}


        {/* Instanced Mesh */}
        <Instances>
            <boxGeometry  />
              <Environment files="../../public/cobblestone_parish_road_2k.hdr"  />
            <meshMatcapMaterial color={"white"} />
            {/* <Instance position={[0,0,0]}/>
            <Instance position={[2,2,2]}/> */}

            {Array.from({ length: 100 }, (_, i) => (
                <Instance key={i} 
                position={[Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25]}
                scale={Math.random() * 2 }
                 />
            ))}
          
        </Instances>



    </> 
  );
};

export default Experience;
