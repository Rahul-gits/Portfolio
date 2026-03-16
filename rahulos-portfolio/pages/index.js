import Head from "next/head";
import { useState, useEffect } from "react";
import BootScreen from "@/components/BootScreen";
import RoomScene from "@/components/RoomScene";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import { AnimatePresence, motion } from "framer-motion";
import ChatAssistant from "@/components/ChatAssistant";

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [activeTab, setActiveTab] = useState("home"); // home, projects, skills, about, resume, contact

  const handleBootComplete = () => {
    setBooting(false);
  };

  return (
    <>
      <Head>
        <title>RahulOS | AI Portfolio System</title>
        <meta name="description" content="A futuristic AI assistant system introducing Rahul Gunda." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-background text-text-main overflow-hidden relative font-sans">
        <AnimatePresence mode="wait">
          {booting ? (
            <BootScreen key="boot" onComplete={handleBootComplete} />
          ) : (
            <motion.div
              key="os"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative flex flex-col min-h-screen"
            >
              {/* Background effects */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
              </div>
              
              <div className="relative z-10 container mx-auto px-4 h-full flex flex-col min-h-screen">
                <header className="flex justify-between items-center py-6 border-b border-primary/20">
                  <div className="text-primary font-bold tracking-widest text-xl glitch-text">RahulOS v1.0</div>
                  <nav className="hidden md:flex gap-6">
                    {["home", "projects", "skills", "about", "resume", "contact"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`uppercase tracking-wider text-sm transition-all duration-300 hover:text-primary ${activeTab === tab ? "text-primary border-b border-primary" : "text-gray-400"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </header>

                <div className="flex-1 flex flex-col md:flex-row items-center justify-center py-10 relative">
                    <AnimatePresence mode="wait">
                      {activeTab === "home" && <RoomScene key="home" setActiveTab={setActiveTab} />}
                      {activeTab === "projects" && <Projects key="projects" />}
                      {activeTab === "skills" && <Skills key="skills" />}
                      {activeTab === "about" && <About key="about" />}
                      {activeTab === "resume" && <Resume key="resume" />}
                      {activeTab === "contact" && <Contact key="contact" />}
                    </AnimatePresence>
                </div>
              </div>
              
              {/* Chat Assistant Overlay */}
              <ChatAssistant />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
