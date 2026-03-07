import React, { useState, useMemo } from 'react';
import { 
  Github, Terminal, Activity, Zap, ShieldCheck, 
  Code, X, Linkedin, Youtube, Instagram, MessageSquare, Phone
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

// Logic & Data
import { PROFILE, PROJECTS, CERTIFICATIONS, SKILL_CATEGORIES, WORK_LOG } from './constants';

// Modular Components
import { NeuralBackground, Vibe } from './components/background/NeuralBackground';
import { OrbitalNav } from './components/navigation/OrbitalNav';
import { CustomCursor } from './components/ui/CustomCursor';
import { TiltCard } from './components/ui/TiltCard';
import { Hero } from './components/sections/Hero';
import { ProjectCard } from './components/sections/ProjectCard';
import CareerCenter from './components/sections/CareerCenter';
import { TerminalConsole } from './components/ui/TerminalConsole';
import { InteractiveCLI } from './components/ui/InteractiveCLI';
import { HackerText } from './components/ui/HackerText';
import { 
  AlgorithmicCore, ETLPipeline, ClassificationReport, APIInference,
  InteractiveInferenceNode, IncidentReports, ExternalRegistries, SystemTopology 
} from './components/ui/AIMLModules';
import { TechStackManifest } from './components/sections/TechStackManifest';
import ImageLab from './components/ui/ImageLab';
import AiChat from './AiChat';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [baseVibe, setBaseVibe] = useState<Vibe>('neural');
  const [activeProject, setActiveProject] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<'portfolio' | 'career'>('portfolio');

  const skills = useMemo(() => SKILL_CATEGORIES.flatMap(cat => cat.skills), []);

  // Dynamic Vibe Override: If project is open, intensify to 'maximal'
  const vibe = activeProject ? 'maximal' : baseVibe;

  // Startup Sequence
  React.useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Dynamic Metadata Update
  React.useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.title} | Navneet Sharma`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', activeProject.brief.outcome);
      }
    } else {
      document.title = 'Navneet Sharma 3.0 | Neural Orbital System';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'A high-end Bento-style portfolio for Navneet Sharma, featuring Data Science, AI/ML, and Full-Stack development expertise.');
      }
    }
  }, [activeProject]);

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
      
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="grid-bg" />
              <div className="scanline" />
            </div>
            
            <div className="w-full max-w-md space-y-8 relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 border-2 border-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                  <Terminal className="text-emerald-500" size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-sm text-emerald-500 font-bold tracking-tighter">NAVNEET_OS [v3.4.0]</span>
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Neural Kernel Initializing...</span>
                </div>
              </div>

              <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <div className="flex justify-between">
                  <span>Core_Engine</span>
                  <span className="text-emerald-500">OK</span>
                </div>
                <div className="flex justify-between">
                  <span>Neural_Weights</span>
                  <span className="text-emerald-500">LOADED</span>
                </div>
                <div className="flex justify-between">
                  <span>Orbital_Link</span>
                  <span className="text-emerald-500">ESTABLISHED</span>
                </div>
                <div className="flex justify-between">
                  <span>Visual_Buffer</span>
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.2, repeat: 10 }}
                    className="text-emerald-500"
                  >
                    SYNCING...
                  </motion.span>
                </div>
              </div>

              <div className="relative h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              
              <div className="flex justify-center">
                <span className="font-mono text-[8px] text-zinc-700 animate-pulse">ESTABLISHING SECURE CONNECTION TO NEURAL_GRID...</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LAYER 0: SYSTEMS --- */}
      <NeuralBackground vibe={vibe} />
      <CustomCursor vibe={vibe} />
      <div className="grid-bg" />
      <div className="atmosphere" />
      <div className="noise" />
      <OrbitalNav vibe={vibe} setVibe={setBaseVibe} />
      
      {/* Overlays */}
      <div className="scanline" />

      {/* --- LAYER 1: CONTENT --- */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 sm:p-8 md:p-12 pb-32">
        
        {/* Header HUD - Refined */}
        <header className="flex justify-between items-center mb-12 sm:mb-16 py-4 sm:py-6 border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 rounded-b-3xl">
           <div className="flex items-center gap-4">
              <div className="relative">
                <Activity size={18} className="text-emerald-500" />
                <motion.div 
                  className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm uppercase tracking-[0.2em] text-emerald-500 font-bold">
                  {PROFILE.currentStatus}
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-600">
                  Neural Link Established
                </span>
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-8">
              <div className="flex bg-white/[0.03] border border-white/10 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveSection('portfolio')}
                  className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all ${activeSection === 'portfolio' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                >
                  Portfolio
                </button>
                <button 
                  onClick={() => setActiveSection('career')}
                  className={`px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all ${activeSection === 'career' ? 'bg-emerald-500 text-black font-bold' : 'text-zinc-500 hover:text-white'}`}
                >
                  Career
                </button>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Core Version</span>
                <span className="font-mono text-[12px] text-white font-bold tracking-tighter">v3.4.0-STABLE</span>
              </div>
              <div className="flex gap-1.5 h-8 items-end">
                 {[0.2, 0.4, 0.6, 0.8, 1.0].map((op, i) => (
                   <motion.div 
                    key={i}
                    className="w-1 bg-emerald-500"
                    initial={{ height: "20%" }}
                    animate={{ 
                      height: ["20%", "100%", "20%"],
                      opacity: op
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.1,
                      ease: "easeInOut"
                    }}
                   />
                 ))}
              </div>
           </div>
        </header>

        <LayoutGroup>
          <AnimatePresence mode="wait">
            {activeSection === 'portfolio' ? (
              <motion.div 
                key="portfolio"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6"
              >
                
                {/* HERO SECTION - Spans 12 columns */}
                <div className="md:col-span-12">
                  <Hero />
                </div>

                {/* BACKGROUND DAEMON SECTION - Moved up for context */}
                <div className="md:col-span-12 mt-6">
                   <TiltCard className="p-10 md:p-16 glass-card border-white/5 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none hidden sm:block">
                         <Terminal size={200} />
                      </div>
                      <div className="max-w-4xl">
                        <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text-alt">/// INITIALIZING BACKGROUND_DAEMON ///</span></span>
                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-8">
                          {PROFILE.about}
                        </p>
                        <div className="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                           <div className="mt-1"><Activity size={16} className="text-emerald-500" /></div>
                           <div className="flex flex-col gap-1">
                              <span className="font-mono text-sm text-zinc-500 uppercase tracking-widest">System Idle Mode</span>
                              <p className="text-sm text-zinc-400">{PROFILE.idleMode}</p>
                           </div>
                        </div>
                        <div className="mt-6 flex items-start gap-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                           <div className="mt-1"><ShieldCheck size={16} className="text-emerald-500" /></div>
                           <div className="flex flex-col gap-1">
                              <span className="font-mono text-sm text-emerald-500 uppercase tracking-widest font-bold">Deployment Status</span>
                              <p className="text-sm text-zinc-300">Fully trained and seeking my first full-time deployment in a Data Science, AI/ML, or Python Backend role.</p>
                           </div>
                        </div>
                        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                           <ETLPipeline />
                           <SystemTopology />
                        </div>
                      </div>
                   </TiltCard>
                </div>

                {/* SYSTEM OVERVIEW GRID - Telemetry, GitHub, Tech Stack */}
                <div className="md:col-span-4 mt-6">
                  <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10 h-full">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <Activity size={18} className="text-emerald-500" />
                        <h3 className="font-display font-bold text-sm uppercase tracking-widest">Telemetry</h3>
                      </div>
                      <span className="font-mono text-sm text-emerald-500 animate-pulse">LIVE_SYNC</span>
                    </div>
                    <div className="space-y-6">
                      {[
                        { label: "Datasets Processed", value: "119K+ ROWS", percent: 100, trend: "NOMINAL" },
                        { label: "Model Accuracy", value: "92.5%", percent: 92.5, trend: "OPTIMAL" },
                        { label: "Pipeline Uptime", value: "99.9%", percent: 99.9, trend: "STABLE" }
                      ].map((stat, i) => (
                        <div key={i} className="space-y-3">
                          <div className="flex justify-between items-end text-sm font-mono uppercase tracking-wider">
                            <div className="flex flex-col gap-1">
                              <span className="text-zinc-500">{stat.label}</span>
                              <span className="text-emerald-500/50 text-xs">{stat.trend}</span>
                            </div>
                            <span className="text-white font-bold">{stat.value}</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div 
                              className="h-full bg-emerald-500"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${stat.percent}%` }}
                              transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </TiltCard>
                </div>

                <div className="md:col-span-4 mt-6">
                  <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10 h-full">
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <Github size={18} className="text-emerald-500" />
                        <h3 className="font-display font-bold text-sm uppercase tracking-widest">Node Stats</h3>
                      </div>
                      <span className="font-mono text-sm text-emerald-500 animate-pulse">GITHUB_API</span>
                    </div>
                    <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex justify-center interactive group/stats">
                      <img 
                        src={`https://github-readme-stats.vercel.app/api?username=${PROFILE.github.replace(/\/$/, '').split('/').pop()}&show_icons=true&theme=matrix&hide_border=true&bg_color=050505`} 
                        alt="GitHub Stats" 
                        className="w-full opacity-80 group-hover/stats:opacity-100 transition-opacity"
                        referrerPolicy="no-referrer"
                      />
                    </a>
                  </TiltCard>
                </div>

                <div className="md:col-span-4 mt-6">
                  <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10 h-full flex flex-col justify-center items-center text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
                        <Zap size={32} className="text-emerald-500" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-lg uppercase tracking-widest">Neural Stack</h3>
                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">v3.4.0 Optimized</p>
                      </div>
                      <motion.div 
                        className="px-4 py-2 bg-emerald-500 text-black text-[10px] font-mono font-bold rounded-full uppercase tracking-widest"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        System Ready
                      </motion.div>
                    </div>
                  </TiltCard>
                </div>

                {/* PROJECTS GRID - Full width */}
                <div id="projects-grid" className="md:col-span-12 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text">/// ACTIVE_NODES (PROJECTS) ///</span></span>
                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                     {PROJECTS.map((project) => (
                        <ProjectCard key={project.id} project={project} colorClass={project.colorClass} />
                     ))}
                   </div>
                </div>

                {/* INTERACTIVE MODULES SECTION */}
                <div className="md:col-span-12 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text">/// SYSTEM_INTERFACE_ACCESS ///</span></span>
                   <InteractiveCLI />
                </div>

                <div className="md:col-span-12 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text-alt">/// LIVE_INFERENCE_PLAYGROUND ///</span></span>
                   <div className="max-w-3xl mx-auto">
                      <InteractiveInferenceNode />
                   </div>
                </div>

                <div className="md:col-span-12 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text">/// NEURAL_IMAGE_SYNTHESIS_LAB ///</span></span>
                   <ImageLab />
                </div>

                <div className="md:col-span-12 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text">/// ENGINEERING_LOGS // INCIDENT_REPORTS ///</span></span>
                   <IncidentReports />
                </div>

                {/* TECH STACK SECTION - FULL WIDTH */}
                <div className="md:col-span-12 mt-12">
                   <TechStackManifest />
                </div>
                            <motion.div 
                              key={i} 
                              className="flex items-center gap-4 sm:gap-6 interactive cursor-default"
                              whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                            >

                {/* DETAILED SKILLS GRID */}
                <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                   {SKILL_CATEGORIES.map((cat, i) => (
                     <TiltCard key={i} className="p-6 sm:p-8 glass-card border-white/5 hover:border-emerald-500/30 transition-all">
                        <h4 className="font-display font-bold text-xs uppercase tracking-widest text-emerald-500 mb-4 sm:mb-6 border-b border-emerald-500/10 pb-4">{cat.title}</h4>
                        <div className="flex flex-wrap gap-2">
                           {cat.skills.map((skill, j) => (
                             <span key={j} className="px-3 py-1.5 bg-white/5 rounded-lg text-[10px] font-mono text-zinc-400 border border-white/5 hover:border-emerald-500/20 hover:text-white transition-all">
                                {skill}
                             </span>
                           ))}
                        </div>
                     </TiltCard>
                   ))}
                </div>

                {/* CONTACT NODES */}
                <div className="md:col-span-12 mt-12 sm:mt-20">
                   <TiltCard className="p-8 sm:p-16 glass-card border-emerald-500/20 text-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="relative z-10"
                      >
                        <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-4 block">Initialization Complete</span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 sm:mb-8">Establish<br/><span className="text-glow">Connection.</span></h2>
                        <p className="max-w-xl mx-auto text-zinc-400 font-mono text-xs sm:text-sm mb-8 sm:mb-12 px-4">
                          Available for deployment into high-impact Python Backend and Data Science roles. 
                          Neural link established. Ready for transmission.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4">
                           <a 
                             href={`mailto:${PROFILE.email}`} 
                             aria-label="Send email transmission"
                             className="w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-5 bg-emerald-500 text-black font-black font-mono text-xs uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex justify-center items-center"
                           >
                              Send Transmission
                           </a>
                           <a 
                             href={PROFILE.whatsapp} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             aria-label="Contact via WhatsApp"
                             className="w-full sm:w-auto px-10 py-4 sm:px-12 sm:py-5 border border-white/10 text-white font-black font-mono text-xs uppercase tracking-widest rounded-full hover:bg-white/5 transition-all backdrop-blur-md flex justify-center items-center"
                           >
                              Direct Link
                           </a>
                        </div>
                      </motion.div>
                   </TiltCard>
                </div>

                {/* EXPERIENCE LOG & FORMATION */}
                <div className="md:col-span-7 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text-alt">/// EXPERIENCE_LOG ///</span></span>
                   <TiltCard className="h-full p-6 sm:p-10 glass-card">
                      <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/5">
                         <Terminal className="text-emerald-500" size={24} />
                         <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight">Experience Log</h3>
                      </div>
                      <div className="space-y-12 pl-6 border-l border-emerald-500/20 relative flex-1 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
                         {WORK_LOG.map((log, i) => (
                            <div key={i} className="relative group">
                               <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-[#050505] ${log.active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 group-hover:bg-emerald-500/50'} transition-all duration-500`} />
                               <div className="flex flex-col gap-2">
                                  <span className="font-display font-bold text-lg sm:text-xl leading-none group-hover:text-emerald-400 transition-colors">{log.role}</span>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                    <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.2em] font-bold">{log.inst}</span>
                                    <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                                    <span className="font-mono text-sm text-zinc-500 uppercase tracking-widest">{log.date}</span>
                                  </div>
                                  <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-light max-w-2xl">{log.log}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </TiltCard>
                </div>

                <div className="md:col-span-5 mt-12">
                   <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-8 block"><span className="gradient-text">/// EDUCATION_AND_CERTS ///</span></span>
                   <TiltCard className="p-6 sm:p-10 h-full glass-card">
                      <div className="flex items-center justify-between mb-12">
                         <h3 className="font-display font-bold text-xl sm:text-2xl uppercase flex items-center gap-4 tracking-tight">
                            <ShieldCheck className="text-emerald-500" size={24} /> Education & Certs
                         </h3>
                      </div>
                      <div className="grid gap-4">
                         {CERTIFICATIONS.map((cert, i) => (
                            <motion.div 
                              key={i} 
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="interactive flex items-start justify-between p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-emerald-500/30 transition-all group cursor-default"
                            >
                               <div className="flex items-start gap-4">
                                  <div className="w-1.5 h-10 bg-emerald-500/10 group-hover:bg-emerald-500 transition-all duration-500 rounded-full mt-1" />
                                  <div className="flex flex-col">
                                     <span className="font-bold text-sm uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{cert.title}</span>
                                     <span className="text-sm text-zinc-500 font-mono tracking-widest mt-2 uppercase">{cert.focus}</span>
                                  </div>
                               </div>
                            </motion.div>
                         ))}
                      </div>
                   </TiltCard>
                </div>

                {/* FOOTER METRICS */}
                <div className="md:col-span-12 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/5 flex flex-col gap-12 text-zinc-500 font-mono text-sm uppercase tracking-[0.3em]">
                    <div className="flex flex-col gap-6">
                      <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] block">/// TERMINAL_CONNECTION (FOOTER) ///</span>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-zinc-700 text-xs">Status</span>
                            <span className="text-emerald-500">System Nominal // Active</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-zinc-700 text-xs">Bio</span>
                            <span className="normal-case tracking-normal text-zinc-400 leading-relaxed max-w-md">
                              {PROFILE.summary}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex flex-col gap-4">
                            <a href={`mailto:${PROFILE.email}`} className="text-emerald-500 hover:text-white transition-colors">
                              [ Establish Connection ]
                            </a>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 normal-case tracking-tight text-zinc-400">
                              <a href={`mailto:${PROFILE.email}`} aria-label={`Email ${PROFILE.email}`} className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <X size={12} className="text-emerald-500" /> Email: {PROFILE.email}
                              </a>
                              <a href={`tel:${PROFILE.phone}`} aria-label={`Call ${PROFILE.phone}`} className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <Phone size={12} className="text-emerald-500" /> Phone: {PROFILE.phone}
                              </a>
                              <a href={PROFILE.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <Linkedin size={12} className="text-emerald-500" /> LinkedIn: {PROFILE.linkedIn.replace('https://www.', '')}
                              </a>
                              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <Github size={12} className="text-emerald-500" /> GitHub: {PROFILE.github.replace('https://', '')}
                              </a>
                              <a href={PROFILE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="flex items-center gap-2 hover:text-emerald-500 transition-colors">
                                <Youtube size={12} className="text-emerald-500" /> YouTube: {PROFILE.youtube.split('/').pop()}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <span className="text-zinc-700">[ END OF LINE ]</span>
                      <span className="text-zinc-800">{PROFILE.systemId}</span>
                    </div>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="career"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <CareerCenter />
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- MODALS --- */}
        </LayoutGroup>

        <AiChat />
        
      </main>
    </div>
  );
};

export default App;