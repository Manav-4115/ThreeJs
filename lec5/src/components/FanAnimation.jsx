import { useControls } from "leva";
import React, { useMemo, useRef } from "react";
import { images } from "../data/images";
import ImagePlane from "./ImagePlane";
import { useFrame } from "@react-three/fiber";

const FanAnimation = () => {
  const { numberofPlans, spreadAngle, planWidth, planHeight, positionY, rotationSpeed } =
    useControls("FanAnimation", {
      numberofPlans: {
        value: 6,
        min: 1,
        max: 10,
        step: 1,
        label: "Number of Planes",
      },
      spreadAngle: {
        value: 360,
        min: 20,
        max: 360,
        step: 1,
        label: "Spread Angle",
      },
      planWidth: {
        value: 2.5,
        min: 0.4,
        max: 6,
        step: 0.05,
        label: "Plan Width",
      },
      planHeight: {
        value: 2.5,
        min: 0.4,
        max: 8,
        step: 0.05,
        label: "Plan Height",
      },
      positionY: {
        value: -1.5,
        min: -6,
        max: 6,
        step: 0.05,
        label: "Position Y",
      },
      rotationSpeed :{
        value: 0.5,
        min: 0.1,
        max: 5,
        step: 0.1,
        label: "Rotation Speed",
      }
    });

  const planes = useMemo(() => {
    const count = numberofPlans;
    const totalArcRadians = (spreadAngle * Math.PI) / 180;
    const stepAngle = totalArcRadians / (count - 1);
    const startingAngle = -totalArcRadians / 2;
    return Array.from({ length: count }, (_, i) => {
      const angle = startingAngle + i * stepAngle;
      return {
        key: i,
        url: images[i % images.length],
        position: [0, 0, 0],
        rotation: [0, angle, 0],
      };
    });
  }, [numberofPlans, spreadAngle]);

  const AniRef = useRef(null);

  useFrame((state, delta) => {
    if (AniRef.current) {
      AniRef.current.rotation.y += delta * rotationSpeed; // Adjust the speed of rotation here
    }
  });

  return (
    <group ref={AniRef} position={[0, positionY, 0]}>
      {planes.map((plane) => (
        <ImagePlane
          key={plane.key}
          url={plane.url}
          position={plane.position}
          rotation={plane.rotation}
          planWidth={planWidth}
          planHeight={planHeight}
        />
      ))}
    </group>
  );
};

export default FanAnimation;
