import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Environment, ContactShadows, Sparkles, Edges, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// Zero-latency Interactive Holographic Panels
function InteractivePanel({ position, rotation, label, subtitle, color, onClick }) {
  const meshRef = useRef();
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));
  const targetColor = useRef(new THREE.Color("#0A0A0A"));
  const defaultColor = new THREE.Color("#0A0A0A");
  const hoverColor = new THREE.Color(color).multiplyScalar(0.2);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    targetScale.current.set(1.15, 1.15, 1.15);
    targetColor.current.copy(hoverColor);
  };
  
  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
    targetScale.current.set(1, 1, 1);
    targetColor.current.copy(defaultColor);
  };

  useFrame((state) => {
    // MathUtils.lerp provides incredibly fast, 0-latency animations outside of React State
    if (meshRef.current) {
      meshRef.current.scale.lerp(targetScale.current, 0.2);
      meshRef.current.material.color.lerp(targetColor.current, 0.1);
      // Slight floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh 
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <planeGeometry args={[2.2, 1.2]} />
        <meshStandardMaterial color="#0A0A0A" transparent opacity={0.8} side={THREE.DoubleSide} roughness={0.1} />
        <Edges scale={1} threshold={15} color={color} />
        
        <Html distanceFactor={8} position={[0, 0, 0.05]} center transform className="pointer-events-none w-full text-center flex flex-col items-center justify-center">
          <div className="text-white font-mono font-bold text-lg tracking-widest uppercase drop-shadow-[0_0_15px_currentColor]" style={{ color }}>
            {label}
          </div>
          <div className="text-gray-400 text-[10px] tracking-widest uppercase mt-1">
            {subtitle}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

// 3D Human Avatar (Cybernetic/Holographic Robot Build)
function CyberAvatar() {
  const group = useRef();
  const coreRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Breathing/Hovering animation for the whole avatar
    group.current.position.y = Math.sin(t * 1.5) * 0.1 - 0.5;
    // Slow idol rotation of the torso
    group.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    
    // Core energy pulsing
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(t * 8) * 0.1);
    }
  });

  return (
    <group ref={group}>
      {/* Head - Low poly futuristic look */}
      <mesh position={[0, 1.9, 0]}>
        <octahedronGeometry args={[0.25, 2]} />
        <meshStandardMaterial color="#00F5FF" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
      </mesh>
      
      {/* Visor / Cybernetic Eyes */}
      <mesh position={[0, 1.95, 0.2]}>
        <boxGeometry args={[0.3, 0.08, 0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Cyber-Neck */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.4, 16]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.9} />
      </mesh>

      {/* Torso / Armor Plating */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.55, 0.35, 1.2, 6]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
        <Edges scale={1.02} threshold={15} color="#8A2BE2" />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.7, 1.2, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#111" metalness={0.8} />
        <Edges scale={1.05} color="#00F5FF" />
      </mesh>
      <mesh position={[0.7, 1.2, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.3, 0.4, 0.3]} />
        <meshStandardMaterial color="#111" metalness={0.8} />
        <Edges scale={1.05} color="#00F5FF" />
      </mesh>

      {/* Floating Arms */}
      <mesh position={[-0.8, 0.5, 0.1]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} />
      </mesh>
      <mesh position={[0.8, 0.5, 0.1]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} />
      </mesh>
      
      {/* Power Core Reactor in Chest */}
      <mesh position={[0, 0.9, 0.42]} ref={coreRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.12, 0.03, 16, 32]} />
        <meshBasicMaterial color="#00FFFF" />
      </mesh>
      <mesh position={[0, 0.9, 0.42]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Data Rings Orbiting the Avatar */}
      <Float speed={2} rotationIntensity={0.5}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, 0.5, 0]}>
          <torusGeometry args={[1.5, 0.01, 16, 100]} />
          <meshBasicMaterial color="#8A2BE2" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, Math.PI / 8, 0]} position={[0, 1.2, 0]}>
          <torusGeometry args={[1.2, 0.01, 16, 100]} />
          <meshBasicMaterial color="#00F5FF" transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export default function HumanScene({ setActiveTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[75vh] min-h-[500px] relative rounded-3xl overflow-hidden glass-panel border border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent uppercase tracking-widest font-mono">
          Virtual Identity Matrix
        </h2>
        <p className="text-sm text-gray-400 font-mono mt-2">
          &gt; Select a holographic module to initialize.<br/>
          &gt; Zero-latency interaction active.
        </p>
      </div>

      <Canvas camera={{ position: [0, 1.5, 6], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.5} />
        
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00F5FF" />
        <pointLight position={[-5, 2, -5]} intensity={2} color="#8A2BE2" />
        <Environment preset="city" />

        <group position={[0, -0.5, 0]}>
          <CyberAvatar />

          {/* Holographic Interactive Panels arranged around the avatar */}
          <InteractivePanel 
            position={[-2.8, 1.5, 1]} 
            rotation={[0, Math.PI / 6, 0]} 
            label="Projects Lab" 
            subtitle="View Experiments"
            color="#00F5FF" 
            onClick={() => setActiveTab("projects")} 
          />
          <InteractivePanel 
            position={[-2.5, 0, 0]} 
            rotation={[0, Math.PI / 8, 0]} 
            label="Skills Intel" 
            subtitle="View Matrix"
            color="#8A2BE2" 
            onClick={() => setActiveTab("skills")} 
          />
          <InteractivePanel 
            position={[2.8, 1.5, 1]} 
            rotation={[0, -Math.PI / 6, 0]} 
            label="Entity Data" 
            subtitle="About Me"
            color="#00F5FF" 
            onClick={() => setActiveTab("about")} 
          />
          <InteractivePanel 
            position={[2.5, 0, 0]} 
            rotation={[0, -Math.PI / 8, 0]} 
            label="Credentials" 
            subtitle="Resume / CV"
            color="#8A2BE2" 
            onClick={() => setActiveTab("resume")} 
          />
          <InteractivePanel 
            position={[0, -0.5, 1.5]} 
            rotation={[-Math.PI / 12, 0, 0]} 
            label="Communicate" 
            subtitle="Ping System"
            color="#FFFFFF" 
            onClick={() => setActiveTab("contact")} 
          />

          <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#00F5FF" />
        </group>

        <Sparkles count={100} scale={10} size={1.5} speed={0.5} opacity={0.4} color="#00F5FF" />
        
        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </motion.div>
  );
}
