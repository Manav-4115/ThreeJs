import React from "react";
import { useControls } from "leva";
import FanAnimation from "./FanAnimation";
import { OrbitControls } from "@react-three/drei";
const Experienced = () => {
    const {x,y,z}=useControls("BoxPosition",{
        x:{value:0,min:-3,max:3,step:0.01, label:"X Position"},
        y:{value:0,min:-3,max:3,step:0.01, label:"Y Position"},
        z:{value:0,min:-3,max:3,step:0.01, label:"Z Position"},

    })
  return (
    <>
      <FanAnimation/>
      <ambientLight intensity={1.5} color={'white'} />
      <OrbitControls/>
    </>
  );
};

export default Experienced;
