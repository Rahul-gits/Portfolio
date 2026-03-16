import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BootScreen({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    "Initializing RahulOS...",
    "[OK] Boot Sequence Started",
    "Loading Context Modules...",
    "[OK] Context Available",
    "Connecting Neural Interface...",
    "[WARN] High latency detected... Resolving...",
    "[OK] Connection Established",
    "Loading AI Projects...",
    "Activating Full-Stack Modules...",
    "[OK] All systems go",
    "Launching Portfolio System...",
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, bootSequence[currentLine]]);
      currentLine++;
      setProgress(Math.floor((currentLine / bootSequence.length) * 100));

      if (currentLine >= bootSequence.length) {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 bg-black flex flex-col items-center justify-center p-8 z-50 font-mono"
    >
      <div className="w-full max-w-2xl bg-black border border-primary/30 p-6 rounded-lg shadow-[0_0_30px_rgba(0,245,255,0.1)] relative overflow-hidden">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,245,255,0.2)_1px,transparent_1px)] bg-[size:100%_4px]" />
        
        <div className="text-primary font-bold text-xl mb-6 flex items-center gap-3">
          <span className="w-3 h-3 bg-primary animate-pulse rounded-full" />
          SYSTEM BOOT
        </div>

        <div className="h-48 overflow-y-auto mb-6 text-sm text-primary/80 space-y-2">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${line?.includes("[WARN]") ? "text-yellow-400" : line?.includes("[OK]") ? "text-green-400" : ""}`}
            >
              {`> ${line}`}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2 h-4 bg-primary inline-block mt-2"
          />
        </div>

        <div className="w-full bg-background border border-primary/50 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary relative"
          >
            <div className="absolute inset-0 bg-white/20 blur-[2px]" />
          </motion.div>
        </div>
        <div className="text-right text-xs text-primary mt-2">{progress}%</div>
      </div>
    </motion.div>
  );
}
