import { motion } from "framer-motion";
import { Folder, FileText, Download, Github, Linkedin, Terminal, ChevronRight } from "lucide-react";

export default function Resume() {
  const files = [
    { name: "Resume.pdf", size: "1.2 MB", date: "2026-03-15", icon: <FileText size={16} className="text-red-400" /> },
    { name: "Portfolio_Tech_Specs.md", size: "45 KB", date: "2026-03-10", icon: <FileText size={16} className="text-blue-400" /> },
    { name: "Project_Case_Studies", size: "-", date: "2026-03-01", isFolder: true, icon: <Folder size={16} className="text-yellow-400" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl font-mono pt-10"
    >
      <div className="bg-[#1e1e1e]/90 backdrop-blur-md border border-gray-700/50 rounded-lg shadow-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Window Title Bar */}
        <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-gray-900">
          <div className="flex gap-2 items-center">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <Terminal size={14} /> /home/rahulos/documents
          </div>
          <div className="w-16" /> {/* spacer for balance */}
        </div>

        <div className="flex overflow-hidden h-[500px]">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-gray-700 bg-[#252526] p-4 hidden md:block">
            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-4">Quick Access</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300 hover:bg-white/10 p-2 rounded cursor-pointer transition-colors bg-white/5">
                <Folder size={16} className="text-blue-400" /> Documents
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400 hover:bg-white/10 p-2 rounded cursor-pointer transition-colors">
                <Folder size={16} className="text-blue-400" /> Downloads
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400 hover:bg-white/10 p-2 rounded cursor-pointer transition-colors">
                <Folder size={16} className="text-blue-400" /> AI_Models
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[#1e1e1e] flex flex-col">
            {/* Header / Path */}
            <div className="px-4 py-3 border-b border-gray-700 flex items-center gap-2 text-sm text-gray-300 bg-[#2d2d2d]">
              <span className="text-primary hover:underline cursor-pointer">rahulos</span>
              <ChevronRight size={14} className="text-gray-500" />
              <span>documents</span>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {/* File header */}
              <div className="grid grid-cols-12 gap-4 text-xs text-gray-500 px-2 pb-2 border-b border-gray-800 mb-2">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Date Modified</div>
                <div className="col-span-3 text-right">Size</div>
              </div>
              
              {files.map((file, i) => (
                <motion.div
                  key={i}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  className="grid grid-cols-12 gap-4 items-center px-2 py-3 rounded cursor-pointer transition-colors text-sm text-gray-300 group"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {file.icon}
                    <span className="group-hover:text-primary transition-colors">{file.name}</span>
                  </div>
                  <div className="col-span-3 text-gray-500 text-xs">{file.date}</div>
                  <div className="col-span-3 text-right text-gray-500 text-xs">{file.size}</div>
                </motion.div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-[#252526] border-t border-gray-700 flex flex-wrap gap-4 items-center justify-between">
              <button className="flex items-center gap-2 bg-primary hover:bg-primary/80 text-black px-4 py-2 rounded font-bold text-sm transition-colors shadow-[0_0_15px_rgba(0,245,255,0.3)]">
                <Download size={16} /> Download Selected
              </button>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 border border-gray-600 hover:border-white hover:text-white text-gray-400 px-4 py-2 rounded text-sm transition-colors">
                  <Github size={16} /> View GitHub
                </button>
                <button className="flex items-center gap-2 border border-[#0077b5]/50 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] text-[#0077b5] px-4 py-2 rounded text-sm transition-colors">
                  <Linkedin size={16} /> Open LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
