"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";

function HoodiePlaceholder() {
    return (
        <Float
            speed={2} // Animation speed
            rotationIntensity={1} // XYZ rotation intensity
            floatIntensity={2} // Up/down float intensity
            floatingRange={[-0.5, 0.5]} // Range of y-axis values the object will float within
        >
            <mesh scale={2} rotation={[0, Math.PI / 4, 0]}>
                {/* Placeholder Geometry: TorusKnot looks complex enough to show off reflections */}
                <torusKnotGeometry args={[1, 0.3, 128, 32]} />

                {/* High-gloss white ceramic material */}
                <meshPhysicalMaterial
                    color="#ffffff"
                    roughness={0.1} // Smooth surface
                    metalness={0.0} // Ceramic is non-metallic
                    clearcoat={1.0} // High gloss
                    clearcoatRoughness={0.1}
                    reflectivity={1}
                    iridescence={0.1} // Subtle interference vs full rainbow
                    iridescenceIOR={1.5}
                />
            </mesh>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="h-[70vh] w-full relative">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                dpr={[1, 2]} // Handle high-DPI screens
            >
                <Suspense fallback={null}>
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight
                        position={[10, 10, 10]}
                        angle={0.15}
                        penumbra={1}
                        intensity={1000} // High intensity for physical lights
                        castShadow
                    />
                    <pointLight position={[-10, -10, -10]} intensity={500} color="#aaf" />

                    {/* Environment for reflections */}
                    <Environment preset="studio" />

                    {/* Floating Model */}
                    <HoodiePlaceholder />

                    {/* Interaction */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />

                    <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                </Suspense>
            </Canvas>

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-b from-foreground to-transparent opacity-30 select-none">
                    FUTURE FIT
                </h1>
            </div>
        </div>
    );
}
