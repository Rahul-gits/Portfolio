import { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Environment, ContactShadows } from "@react-three/drei";
import { Mic, Terminal, Database, Code, Cpu, User } from "lucide-react";

function PremiumAvatar() {
  const groupRef = useRef();
  const coreRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.8;
      coreRef.current.rotation.x = t * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1.2}>
        {/* Core Energy Source */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial color="#ffffff" emissive="#00F5FF" emissiveIntensity={3} wireframe />
        </mesh>
        
        {/* Premium Dark Glass Shell */}
        <mesh>
          <icosahedronGeometry args={[1.5, 0]} />
          <meshPhysicalMaterial 
            color="#050505" 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={0.8}
            envMapIntensity={3}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        
        {/* Orbital computation rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.01, 32, 100]} />
          <meshStandardMaterial color="#8A2BE2" emissive="#8A2BE2" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <torusGeometry args={[3, 0.01, 32, 100]} />
          <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={2} />
        </mesh>
      </Float>

      <Sparkles count={80} scale={8} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
    </group>
  );
}

export default function AIOrb({ setActiveTab }) {
  const navigation = [
    { label: "Projects Lab", dest: "projects", icon: <Code size={18} /> },
    { label: "Skills Intel", dest: "skills", icon: <Database size={18} /> },
    { label: "Entity Data", dest: "about", icon: <User size={18} /> },
    { label: "Credentials", dest: "resume", icon: <Terminal size={18} /> },
    { label: "Communicate", dest: "contact", icon: <Cpu size={18} /> },
  ];

  return (
    <motion.div
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.98, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl px-4 lg:px-10 h-full gap-10"
    >
      {/* UI Overlay - Left Side */}
      <div className="flex-1 space-y-10 z-10 w-full lg:w-1/2 flex flex-col items-center lg:items-start pt-10 lg:pt-0 pb-10">
        <div className="text-center lg:text-left space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary tracking-widest text-xs uppercase font-bold shadow-[0_0_15px_rgba(0,245,255,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Neural System Online
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight"
          >
            I am <br />
            <span className="bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
               RahulOS
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-gray-400 font-sans text-base max-w-md mx-auto lg:mx-0 leading-relaxed"
          >
             You have accessed the internal cognitive framework of <span className="text-white font-semibold">Rahul Gunda</span>. Select a module to begin the visual synthesis of his experience and skills.
          </motion.p>
        </div>

        {/* Navigation Modules */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-2 gap-4 w-full"
        >
          {navigation.map((btn, idx) => (
            <motion.button
              key={btn.dest}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + idx * 0.05, duration: 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(0, 245, 255, 0.08)",
                borderColor: "rgba(0, 245, 255, 0.5)",
                boxShadow: "0 10px 30px -10px rgba(0,245,255,0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(btn.dest)}
              className="glass-panel flex items-center gap-4 p-4 rounded-2xl text-gray-300 hover:text-white transition-all shadow-lg text-left"
            >
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-primary">
                {btn.icon}
              </div>
              <span className="font-mono text-sm tracking-wide font-semibold">{btn.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Voice Input Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex items-center gap-4 glass-panel border border-accent/20 rounded-full px-6 py-4 w-full max-w-md shadow-lg"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-primary flex items-center justify-center relative flex-shrink-0 shadow-[0_0_15px_rgba(138,43,226,0.6)]">
            <Mic size={18} className="text-white" />
          </div>
          <p className="text-sm font-sans text-gray-400">
            Awaiting voice directives... <br />
            <span className="text-white font-mono text-xs opacity-70">Try: "Show me the Projects"</span>
          </p>
        </motion.div>
      </div>

      {/* 3D Canvas Avatar Core - Right Side */}
      <div className="relative w-full h-[50vh] lg:h-[80vh] flex-1 min-h-[400px]">
        {/* Added dpr={[1, 1.5]} which significantly improves performance and responsiveness */}
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="rounded-2xl pointer-events-none lg:pointer-events-auto" dpr={[1, 1.5]}>
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00F5FF" />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#8A2BE2" />
          <Suspense fallback={null}>
            <PremiumAvatar />
            <Environment preset="city" />
            <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#00F5FF" />
          </Suspense>
        </Canvas>
      </div>
    </motion.div>
  );
}
