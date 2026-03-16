import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, Globe } from "lucide-react";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-5xl font-mono pt-10"
    >
      <div className="grid md:grid-cols-5 gap-8 glass-panel p-8 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Hologram Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,245,255,0.05),transparent)] pointer-events-none" />
        
        {/* Left Col - Info */}
        <div className="col-span-2 space-y-8 relative z-10 p-6 bg-background/50 rounded-xl border border-gray-800">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              System Ping
            </h2>
            <p className="text-sm text-gray-400">Initialize a connection with Rahul's neural link. Response latency &lt; 24h.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Direct Protocol</div>
                <div className="text-sm text-gray-300 group-hover:text-white transition-colors">rahul@example.com</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Coordinates</div>
                <div className="text-sm text-gray-300 group-hover:text-white transition-colors">Planet Earth, Orbit 3</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group cursor-pointer">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-500 group-hover:bg-green-500 group-hover:text-black transition-colors">
                <Globe size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Network Subnet</div>
                <div className="text-sm text-gray-300 group-hover:text-white transition-colors">linkedin.com/in/rahulgunda</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col - Form */}
        <div className="col-span-3 relative z-10">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Identifier
                </label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-black/50 border border-gray-700 hover:border-primary/50 focus:border-primary rounded p-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-primary uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Return Address
                </label>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-black/50 border border-gray-700 hover:border-primary/50 focus:border-primary rounded p-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-primary uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Payload Data
              </label>
              <textarea 
                rows="5"
                placeholder="Message content..." 
                className="w-full bg-black/50 border border-gray-700 hover:border-primary/50 focus:border-primary rounded p-3 text-sm text-white focus:outline-none transition-colors resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0,245,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary/20 hover:bg-primary border border-primary text-white py-4 rounded font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-colors group"
            >
              Transmit Signal <Send size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
