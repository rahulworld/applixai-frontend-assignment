"use client";

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";

function DefectScannerComponent() {
    const fileUrl = "/threeDimensionsModels/scene.gltf";
    const mesh = useRef<Mesh>(null!);
    const gltf = useLoader(GLTFLoader, fileUrl);

    useFrame(() => {
        mesh.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={mesh}>
            <primitive object={gltf.scene}  scale={1.5} />
        </mesh>
    );
}

export function DefectScanner() {
    return (
        <div className="w-full h-5/6 ">
            <div className='w-full h-full bg-modelBackground rounded-lg'>
                <Canvas className='w-full h-full items-end justify-end'>
                    <OrbitControls />
                    <ambientLight />
                    <pointLight position={[10, 10, 10]} />
                    <DefectScannerComponent />
                </Canvas>
            </div>
        </div>
    );
}