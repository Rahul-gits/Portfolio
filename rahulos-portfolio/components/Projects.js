import { motion } from "framer-motion";
import { ExternalLink, Github, FileText, Activity } from "lucide-react";

const projects = [
  {
    id: "CV-101",
    title: "AI Fitness Tracker",
    tech: "Computer Vision + ML",
    caps: ["Rep counting", "Posture correction", "Workout analytics"],
    color: "from-primary to-accent",
  },
  {
    id: "WEB-202",
    title: "NextGen E-Commerce",
    tech: "Next.js + Stripe + AI",
    caps: ["AI product recommendations", "Crypto payments", "3D product viewer"],
    color: "from-accent to-pink-500",
  },
  {
    id: "SYS-303",
    title: "Quantum Compiler",
    tech: "Rust + WebAssembly",
    caps: ["O(1) optimization", "Multi-threading", "Direct metal execution"],
    color: "from-green-400 to-primary",
  },
];

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl self-start pt-10 px-4 min-h-[70vh] font-mono"
    >
      <div className="mb-10 flex items-center justify-between border-b border-primary/20 pb-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
          Projects Lab
        </h2>
        <div className="text-primary text-sm tracking-widest hidden md:block">
          STATUS: ONLINE [///]
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="group relative glass-panel hover:bg-black/80 rounded-xl p-6 transition-shadow duration-300 overflow-hidden hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transform hover:scale-[1.02] border border-white/5 hover:border-primary/50"
          >
            {/* Background Effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${p.color} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity duration-500`} />
            
            <div className="text-xs text-accent font-bold mb-4 tracking-widest">
              Experiment ID: {p.id}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
            
            <div className="flex items-center gap-2 text-sm text-primary/80 mb-4 bg-primary/10 rounded px-2 py-1 w-fit">
              <Activity size={14} />
              {p.tech}
            </div>
            
            <div className="space-y-2 mb-6 text-sm text-gray-300 border-l border-primary/20 pl-3">
              <div className="text-xs text-primary font-bold mb-2 uppercase">Capabilities:</div>
              {p.caps.map((cap, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full" />
                  {cap}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider relative z-10">
              <button className="flex-1 flex justify-center items-center gap-2 bg-primary/20 hover:bg-primary text-white py-2 px-3 rounded transition-colors group/btn">
                <ExternalLink size={14} className="text-primary group-hover/btn:text-white" />
                Demo
              </button>
              <button className="flex-1 flex justify-center items-center gap-2 border border-primary/40 hover:bg-primary/20 text-white py-2 px-3 rounded transition-colors">
                <Github size={14} />
                Code
              </button>
              <button className="w-full mt-2 flex justify-center items-center gap-2 border border-accent/40 hover:bg-accent/20 text-accent py-2 px-3 rounded transition-colors">
                <FileText size={14} />
                Case Study
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
