import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';

function SkillNode({ position, name, category, color }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t + position[0]) * 0.2;
    meshRef.current.rotation.x = Math.sin(t / 2) * 0.1;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.5} />
        <Html distanceFactor={10} position={[0, -0.6, 0]} transform className="pointer-events-none">
          <div className="bg-black/80 border border-primary/50 text-white text-xs px-2 py-1 rounded shadow-[0_0_10px_currentColor] backdrop-blur-md" style={{ color }}>
            {name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

function SkillCluster({ category, nodes, basePosition, color }) {
  const groupRef = useRef();
  
  useFrame((state) => {
    groupRef.current.rotation.y += 0.002;
  });

  return (
    <group ref={groupRef} position={basePosition}>
      {/* Central Node for Cluster */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color={color} wireframe />
        <Html distanceFactor={12} position={[0, -1.2, 0]} transform>
          <div className="font-bold text-sm tracking-widest uppercase bg-black/50 px-3 py-1 border-b border-white backdro-blur" style={{ color }}>
            {category}
          </div>
        </Html>
      </mesh>
      
      {nodes.map((node, i) => {
        const phi = Math.acos(-1 + (2 * i) / nodes.length);
        const theta = Math.sqrt(nodes.length * Math.PI) * phi;
        const r = 2.5; // radius
        return (
          <SkillNode
            key={i}
            name={node.name}
            category={category}
            color={color}
            position={[
              r * Math.cos(theta) * Math.sin(phi),
              r * Math.sin(theta) * Math.sin(phi),
              r * Math.cos(phi)
            ]}
          />
        );
      })}
    </group>
  );
}

export default function Skills() {
  const frontend = [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind' }, { name: 'Framer' }, { name: 'Three.js' }];
  const ai = [{ name: 'Python' }, { name: 'Machine Learning' }, { name: 'MediaPipe' }, { name: 'TensorFlow' }, { name: 'LangChain' }];
  const backend = [{ name: 'Node.js' }, { name: 'FastAPI' }, { name: 'MongoDB' }, { name: 'PostgreSQL' }, { name: 'Redis' }];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full h-[70vh] flex flex-col font-mono relative"
    >
      <div className="absolute top-4 left-4 z-10 text-primary pointer-events-none">
        <h2 className="text-2xl font-bold glitch-text">Skills Intelligence</h2>
        <p className="text-xs text-gray-400 mt-2 max-w-sm">
          Interactive Galaxy Map. Scroll to zoom, drag to rotate.
          Hover over nodes to explore tech clusters.
        </p>
      </div>

      <div className="w-full h-full glass-panel rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(138,43,226,0.1)] hover:shadow-[0_8px_40px_rgba(0,245,255,0.2)] transition-shadow duration-300">
        <Canvas camera={{ position: [0, 2, 12], fov: 45 }} dpr={[1, 1.5]}>
          <color attach="background" args={['transparent']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls 
            enablePan={false}
            maxDistance={15}
            minDistance={4}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          <SkillCluster category="Frontend" nodes={frontend} basePosition={[-4, 0, 0]} color="#00F5FF" />
          <SkillCluster category="AI & ML" nodes={ai} basePosition={[0, 2, -2]} color="#8A2BE2" />
          <SkillCluster category="Backend" nodes={backend} basePosition={[4, 0, 0]} color="#00FFFF" />
        </Canvas>
      </div>
    </motion.div>
  );
}
