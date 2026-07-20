import React from "react";
import { useControls } from "leva";
const Experienced = () => {
    const {x,y,z}=useControls("BoxPosition",{
        x:{value:0,min:-3,max:3,step:0.01, label:"X Position"},
        y:{value:0,min:-3,max:3,step:0.01, label:"Y Position"},
        z:{value:0,min:-3,max:3,step:0.01, label:"Z Position"},

    })
  return (
    <>
      <mesh position={[x, y, z]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
};

export default Experienced;
