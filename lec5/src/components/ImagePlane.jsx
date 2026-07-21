import React, { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
const ImagePlane = ({ url, position, rotation, planWidth, planHeight }) => {
  const texture = useTexture(url);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(planWidth, planHeight);
    geo.translate(2.5, planHeight / 2, 0);
    return geo;
  }, [planWidth, planHeight]);

  return (
    <>
      <mesh geometry={geometry} position={position} rotation={rotation}>
        <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default ImagePlane;
