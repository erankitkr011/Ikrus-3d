import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const ModelViewer = ({ modelUrl }) => {
  const { scene } = useGLTF(modelUrl);

  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <OrbitControls enableZoom enableRotate enablePan />
      <primitive object={scene} scale={2} />
    </Canvas>
  );
};

export default ModelViewer;
