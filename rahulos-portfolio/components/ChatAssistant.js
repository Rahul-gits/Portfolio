import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, User } from "lucide-react";

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I am Rahul's AI assistant. Ask me anything about his skills, projects, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const simulateResponse = (query) => {
    setIsTyping(true);
    setTimeout(() => {
      let response = "I'm still learning! However, I can tell you Rahul is a Full Stack AI Engineer. Try asking about his projects or skills.";
      const q = query.toLowerCase();
      
      if (q.includes("project")) {
        response = "Rahul has built over 10+ projects including an AI Fitness Tracker, NextGen E-Commerce with Stripe, and a Quantum Compiler experiment.";
      } else if (q.includes("skill") || q.includes("tech")) {
        response = "His core stack includes React, Next.js, Python, Node.js, and Three.js. He's also proficient with AI integrations using OpenAI API and LangChain.";
      } else if (q.includes("contact") || q.includes("email")) {
        response = "You can reach Rahul at rahul@example.com or ping him via LinkedIn.";
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    simulateResponse(input);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 p-4 bg-primary/20 bg-opacity-80 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-primary text-primary hover:bg-primary hover:text-black transition-colors z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <MessageSquare className="group-hover:animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-black/80 backdrop-blur-xl border border-primary/50 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] z-50 font-mono overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-background border-b border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur-md animate-pulse" />
                  <div className="relative w-8 h-8 rounded-full bg-black border border-primary flex items-center justify-center text-primary">
                    <Cpu size={16} />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-widest uppercase">AI Assistant</div>
                  <div className="text-xs text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-accent/20 border border-accent text-accent" : "bg-primary/20 border border-primary text-primary"}`}>
                    {msg.role === "user" ? <User size={12} /> : <Cpu size={12} />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-xl text-sm ${msg.role === "user" ? "bg-accent/20 border border-accent/30 text-white rounded-br-none" : "bg-black/60 border border-primary/30 text-gray-300 rounded-bl-none"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2 text-primary">
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center"><Cpu size={12} /></div>
                  <div className="bg-black/60 border border-primary/30 p-4 rounded-xl rounded-bl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-black border-t border-primary/20">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-background border border-gray-700 hover:border-primary/50 focus:border-primary rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none transition-colors text-white placeholder-gray-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-2 p-1 text-gray-500 hover:text-primary disabled:opacity-50 transition-colors"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
