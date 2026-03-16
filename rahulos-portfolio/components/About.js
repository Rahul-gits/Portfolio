import { motion } from "framer-motion";
import { Terminal, Database, Code, CheckCircle, Brain, Cpu, BarChart } from "lucide-react";

export default function About() {
  const stats = [
    { label: "Projects Built", value: "10+", icon: <Code size={20} className="text-primary" /> },
    { label: "Technologies", value: "15+", icon: <Database size={20} className="text-accent" /> },
    { label: "GitHub Repositories", value: "20+", icon: <Terminal size={20} className="text-green-400" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl font-mono pt-10"
    >
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Hologram Effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,255,255,0.05)_3px,transparent_4px)] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-full border border-primary/50 relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-primary"
            />
            <Brain size={32} className="text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent tracking-widest uppercase">
              AI Analysis Result
            </h2>
            <p className="text-xs text-green-400">Confidence: 99.9% [Target Identified]</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10 relative z-10">
          <div className="space-y-4">
            <div className="bg-background/80 border border-gray-800 p-4 rounded-lg hover:border-primary/50 transition-colors">
              <span className="text-xs text-gray-500 block mb-1">Entity Name:</span>
              <span className="text-lg font-bold text-white tracking-widest">Rahul Gunda</span>
            </div>
            
            <div className="bg-background/80 border border-gray-800 p-4 rounded-lg hover:border-primary/50 transition-colors">
              <span className="text-xs text-gray-500 block mb-1">Designation:</span>
              <span className="text-lg text-primary font-bold">AI Engineer / Full Stack Developer</span>
            </div>
            
            <div className="bg-background/80 border border-gray-800 p-4 rounded-lg hover:border-primary/50 transition-colors">
              <span className="text-xs text-gray-500 block mb-1">Education Protocol:</span>
              <span className="text-lg text-white">B.Tech CSBS</span>
            </div>
          </div>

          <div className="bg-background/80 border border-accent/30 p-6 rounded-lg relative overflow-hidden hover:border-accent transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-[40px]" />
            <h3 className="text-sm text-accent font-bold mb-4 uppercase tracking-widest flex items-center gap-2">
              <Cpu size={16} /> Focus Areas
            </h3>
            <ul className="space-y-3">
              {['Computer Vision', 'Intelligent Web Systems', 'AI Applications'].map((focus, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-gray-300">{focus}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
          <BarChart size={16} /> Telemetry Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black border border-white/10 p-5 rounded-xl hover:border-primary/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-4 group"
            >
              <div className="p-3 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                {stat.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
