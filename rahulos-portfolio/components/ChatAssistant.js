import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Cpu, User, Mic, MicOff } from "lucide-react";

export default function ChatAssistant({ setActiveTab }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "System online. I am RahulOS. How can I assist your inquiry today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Voice Recognition Logic
  useEffect(() => {
    if (typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      if (isListening) recognition.start();
      else recognition.stop();

      return () => recognition.stop();
    }
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    setMessages(prev => [...prev, { role: "user", content: `[Voice Command]: ${command}` }]);
    processQuery(command);
  };

  const processQuery = (query) => {
    setIsTyping(true);
    const q = query.toLowerCase();
    
    setTimeout(() => {
      let response = "Query processed. No direct match in database. Rahul Gunda is an AI & Full Stack Engineer specializing in Three.js and Intelligent Systems.";
      
      if (q.includes("project")) {
        response = "Initializing Projects Module. Rahul has built AI Fitness Trackers, E-commerce platforms, and 3D systems. Navigating you now...";
        setActiveTab("projects");
      } else if (q.includes("skill") || q.includes("tech") || q.includes("know")) {
        response = "Accessing Skills Matrix. Core competencies: React, Next.js, Python, TensorFlow, and Three.js. Navigating...";
        setActiveTab("skills");
      } else if (q.includes("about") || q.includes("who is") || q.includes("rahul")) {
        response = "Loading Identity Profile. Rahul Gunda is a B.Tech CSBS student and a pioneer in AI-Web integration.";
        setActiveTab("about");
      } else if (q.includes("resume") || q.includes("cv") || q.includes("hire")) {
        response = "Retrieving Credentials. Accessing Resume.pdf and technical certifications.";
        setActiveTab("resume");
      } else if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
        response = "Establishing Communication Link. Opening Contact protocols.";
        setActiveTab("contact");
      } else if (q.includes("home") || q.includes("back") || q.includes("avatar")) {
        response = "Returning to Core Identity Matrix.";
        setActiveTab("home");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
      if (!isOpen) setIsOpen(true);
    }, 1000);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const currentInput = input;
    setInput("");
    processQuery(currentInput);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
        {/* Voice Command Floating Button */}
        <motion.button
          onClick={() => setIsListening(!isListening)}
          className={`p-4 rounded-full border shadow-lg backdrop-blur-md transition-all ${isListening ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse" : "bg-accent/20 border-accent text-accent hover:bg-accent hover:text-white"}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </motion.button>

        {/* Chat Toggle Button */}
        <motion.button
          className="p-4 bg-primary/20 bg-opacity-80 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-primary text-primary hover:bg-primary hover:text-black transition-colors group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <MessageSquare className="group-hover:animate-pulse" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] bg-black/90 backdrop-blur-2xl border border-primary/30 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.9)] z-50 font-mono overflow-hidden flex flex-col h-[550px]"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/40 flex items-center justify-center text-primary relative">
                   <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-20" />
                   <Cpu size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white tracking-tighter uppercase">RahulOS AI</div>
                  <div className="text-[10px] text-primary/70 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" /> Subprocessor Active
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors truncate">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border ${msg.role === "user" ? "bg-accent/10 border-accent/30 text-accent" : "bg-primary/10 border-primary/30 text-primary"}`}>
                    {msg.role === "user" ? <User size={12} /> : <Cpu size={12} />}
                  </div>
                  <div className={`max-w-[80%] p-3 rounded-xl text-[13px] leading-relaxed ${msg.role === "user" ? "bg-accent/10 border border-accent/20 text-white rounded-br-none" : "bg-white/5 border border-white/10 text-gray-300 rounded-bl-none"}`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-end gap-2">
                   <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary"><Cpu size={12} /></div>
                   <div className="bg-white/5 border border-white/10 p-4 rounded-xl rounded-bl-none flex gap-1">
                      <span className="w-1 h-1 bg-primary rounded-full animate-bounce" />
                      <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <form onSubmit={handleSend} className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask RahulOS..."
                  className="flex-1 bg-black/40 border border-white/10 hover:border-primary/50 focus:border-primary rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none transition-all text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="absolute right-3 p-1.5 text-primary hover:scale-110 disabled:opacity-30 transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-2 text-[9px] text-gray-600 text-center uppercase tracking-[0.2em]">
                Neural Link Encryption Enabled
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
