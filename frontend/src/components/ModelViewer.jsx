import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);

  return (
    <Canvas camera={{ position: [0, 0, 5] }} className="h-80 w-full border">
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <primitive object={scene} />
    </Canvas>
  );
};

export default ModelViewer;
