import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sparkles, Html, ContactShadows, Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

function RoomObject({ position, rotation, scale, color, emissive, name, label, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.05;
    } else if (meshRef.current) {
       // Reset position smoothly
       meshRef.current.position.y = position[1];
    }
  });

  return (
    <group 
      position={position} 
      rotation={rotation} 
      scale={hovered ? scale * 1.05 : scale}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      ref={meshRef}
    >
      {/* Glow Effect on Hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 1.5, 0]} center>
          <div className="bg-black/80 backdrop-blur-md border border-primary px-3 py-1 rounded text-primary text-xs font-mono uppercase tracking-widest pointer-events-none shadow-[0_0_15px_rgba(0,245,255,0.5)] whitespace-nowrap">
            Launch: {label}
          </div>
        </Html>
      )}
      
      {children ? children : (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color={color} 
            emissive={hovered ? emissive : "#000000"} 
            emissiveIntensity={hovered ? 2 : 0} 
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      )}
    </group>
  );
}

// Custom specialized objects
function Laptop({ onClick }) {
  return (
    <RoomObject position={[0, -0.5, 1]} scale={1.2} label="Projects Lab" onClick={onClick}>
      <group>
        {/* Base */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[1.6, 0.1, 1.2]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.8} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.5, -0.55]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[1.6, 1.1, 0.05]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} />
        </mesh>
        {/* Inner Screen Display (Glowing) */}
        <mesh position={[0, 0.5, -0.52]} rotation={[0.2, 0, 0]}>
          <planeGeometry args={[1.4, 0.9]} />
          <meshBasicMaterial color="#00F5FF" />
        </mesh>
      </group>
    </RoomObject>
  );
}

function Bookshelf({ onClick }) {
  return (
    <RoomObject position={[-3, 0, -2]} rotation={[0, Math.PI / 4, 0]} scale={1.5} label="Skills Intelligence" onClick={onClick}>
      <group>
        {/* Back and sides */}
        <mesh position={[0, 1, -0.2]}>
          <boxGeometry args={[1.4, 3, 0.1]} />
          <meshStandardMaterial color="#111" metalness={0.5} />
        </mesh>
        {/* Shelves */}
        {[0, 0.8, 1.6, 2.4].map((y, i) => (
          <group key={i}>
            <mesh position={[0, y, 0]}>
              <boxGeometry args={[1.4, 0.05, 0.4]} />
              <meshStandardMaterial color="#333" />
            </mesh>
            {/* Glowing "Data Books" */}
            <mesh position={[-0.4 + Math.random()*0.2, y + 0.2, 0]}>
              <boxGeometry args={[0.1, 0.35, 0.3]} />
              <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={1} />
            </mesh>
            <mesh position={[0.2 + Math.random()*0.2, y + 0.2, 0]}>
              <boxGeometry args={[0.1, 0.3, 0.25]} />
              <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.5} />
            </mesh>
          </group>
        ))}
      </group>
    </RoomObject>
  );
}

function Whiteboard({ onClick }) {
  return (
    <RoomObject position={[2, 1, -2]} rotation={[0, -Math.PI / 6, 0]} scale={1.2} label="Profile & Experience" onClick={onClick}>
      <group>
        {/* Stand */}
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#555" metalness={0.8} />
        </mesh>
        <mesh position={[-0.8, -1, 0]}><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#555" /></mesh>
        <mesh position={[0.8, -1, 0]}><cylinderGeometry args={[0.05, 0.05, 2]} /><meshStandardMaterial color="#555" /></mesh>
        
        {/* Board */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        {/* Holographic Diagrams on board */}
        <mesh position={[-0.5, 0.7, 0.06]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshBasicMaterial color="#00F5FF" wireframe />
        </mesh>
        <mesh position={[0.4, 0.3, 0.06]}>
          <torusGeometry args={[0.2, 0.05, 8, 16]} />
          <meshBasicMaterial color="#8A2BE2" wireframe />
        </mesh>
      </group>
    </RoomObject>
  );
}

function FuturisticDoor({ onClick }) {
  return (
    <RoomObject position={[4, 0.5, 1]} rotation={[0, -Math.PI / 2, 0]} scale={1.4} label="Communicate" onClick={onClick}>
      <group>
        {/* Door Frame */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1.8, 3.2, 0.2]} />
          <meshStandardMaterial color="#111" metalness={0.9} />
        </mesh>
        {/* Glowing Portal inside frame */}
        <mesh position={[0, 1, 0.05]}>
          <boxGeometry args={[1.6, 3, 0.1]} />
          <meshStandardMaterial color="#000" emissive="#00F5FF" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </RoomObject>
  );
}

function ServerRack({ onClick }) {
  return (
    <RoomObject position={[-2, 0.5, 3]} rotation={[0, Math.PI / 2, 0]} scale={1.2} label="Credentials / Resume" onClick={onClick}>
      <group>
        {/* Rack Body */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[1, 2, 1.2]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
        </mesh>
        {/* Blinking LEDs */}
        {[-0.2, 0, 0.2, 0.6, 1].map((y, i) => (
          <mesh key={i} position={[0.51, y, 0]}>
             <planeGeometry args={[0.1, 0.05]} />
             <meshBasicMaterial color={Math.random() > 0.5 ? "#00F5FF" : "#8A2BE2"} />
          </mesh>
        ))}
      </group>
    </RoomObject>
  );
}

export default function RoomScene({ setActiveTab }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full h-[75vh] min-h-[500px] relative rounded-3xl overflow-hidden glass-panel border border-primary/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Intruction Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-widest font-mono">
          Developer Workspace
        </h2>
        <p className="text-sm text-gray-400 font-mono mt-2">
          &gt; Interactive mode active.<br/>
          &gt; Rotate camera to explore.<br/>
          &gt; Click objects to launch modules.
        </p>
      </div>

      <Canvas camera={{ position: [0, 3, 8], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#030303"]} />
        <ambientLight intensity={0.4} />
        
        {/* Cinematic Dynamic Lighting */}
        <pointLight position={[0, 4, 0]} intensity={1} color="#00F5FF" castShadow />
        <pointLight position={[-4, 2, -4]} intensity={2} color="#8A2BE2" />
        <pointLight position={[4, 2, 4]} intensity={1.5} color="#00F5FF" />

        {/* Ambient environment for reflections */}
        <Environment preset="city" />

        <group position={[0, -1, 0]}>
          {/* Cyberpunk Grid Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#0A0A0A" />
          </mesh>
          <gridHelper args={[20, 20, "#00F5FF", "#111111"]} position={[0, 0, 0]} opacity={0.2} transparent />

          {/* Glowing Room Objects that act as Navigation */}
          <Laptop onClick={() => setActiveTab("projects")} />
          <Bookshelf onClick={() => setActiveTab("skills")} />
          <Whiteboard onClick={() => setActiveTab("about")} />
          <FuturisticDoor onClick={() => setActiveTab("contact")} />
          <ServerRack onClick={() => setActiveTab("resume")} />

          <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
        </group>

        {/* Floating atmospheric dust particles */}
        <Sparkles count={150} scale={12} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
        
        <OrbitControls 
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going under the floor
          minDistance={3}
          maxDistance={12}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </motion.div>
  );
}
