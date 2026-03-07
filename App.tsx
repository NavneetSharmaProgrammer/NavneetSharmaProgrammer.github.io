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
import { TerminalConsole } from './components/ui/TerminalConsole';
import { InteractiveCLI } from './components/ui/InteractiveCLI';
import { HackerText } from './components/ui/HackerText';
import { 
  AlgorithmicCore, ETLPipeline, ClassificationReport, APIInference,
  InteractiveInferenceNode, IncidentReports, ExternalRegistries, SystemTopology 
} from './components/ui/AIMLModules';
import AiChat from './AiChat';

const App: React.FC = () => {
  const [baseVibe, setBaseVibe] = useState<Vibe>('neural');
  const [activeProject, setActiveProject] = useState<any>(null);

  // Dynamic Vibe Override: If project is open, intensify to 'maximal'
  const vibe = activeProject ? 'maximal' : baseVibe;

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

  // Memoize flat skills list
  const skills = useMemo(() => SKILL_CATEGORIES.flatMap(c => c.skills), []);

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* --- LAYER 0: SYSTEMS --- */}
      <NeuralBackground vibe={vibe} />
      <div className="atmosphere" />
      <div className="noise" />
      <OrbitalNav vibe={vibe} setVibe={setBaseVibe} />
      
      {/* Overlays */}
      <div className="scanline" />

      {/* --- LAYER 1: CONTENT --- */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 sm:p-8 md:p-12 pb-32">
        
        {/* Header HUD - Refined */}
        <header className="flex justify-between items-center mb-12 sm:mb-16 py-4 sm:py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-6 rounded-b-3xl">
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
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold">
                  {PROFILE.currentStatus}
                </span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-600">
                  Neural Link Established
                </span>
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-8">
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* HERO SECTION - Spans 8 columns */}
            <div className="md:col-span-8 row-span-2">
              <Hero />
            </div>

            {/* QUICK STATS / SYSTEM INFO - Spans 4 columns */}
            <div className="md:col-span-4 space-y-4 sm:space-y-6">
              <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-emerald-500" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-widest">System Console</h3>
                  </div>
                  <span className="font-mono text-[8px] text-emerald-500 animate-pulse">DAEMON_ACTIVE</span>
                </div>
                <TerminalConsole />
              </TiltCard>

              <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-emerald-500" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-widest">System Telemetry // Scale</h3>
                  </div>
                  <span className="font-mono text-[8px] text-emerald-500 animate-pulse">LIVE_SYNC</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Datasets Processed", value: "119K+ ROWS", percent: 100, trend: "NOMINAL" },
                    { label: "Model Accuracy", value: "92.5%", percent: 92.5, trend: "OPTIMAL" },
                    { label: "Pipeline Uptime", value: "99.9%", percent: 99.9, trend: "STABLE" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end text-[10px] font-mono uppercase tracking-wider">
                        <div className="flex flex-col gap-1">
                          <span className="text-zinc-500">{stat.label}</span>
                          <span className="text-emerald-500/50 text-[8px]">{stat.trend}</span>
                        </div>
                        <span className="text-white font-bold">{stat.value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
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

              <TiltCard className="p-6 sm:p-8 glass-card border-emerald-500/10">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <Activity size={18} className="text-emerald-500" />
                    <h3 className="font-display font-bold text-sm uppercase tracking-widest">Live Node Stats</h3>
                  </div>
                  <span className="font-mono text-[8px] text-emerald-500 animate-pulse">GITHUB_API</span>
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

              <TiltCard className="p-6 sm:p-8 glass-card">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <Activity size={18} className="text-emerald-500" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest">Tech Stack Matrix</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    "PY", "LC", "DB", "SQL",
                    "FL", "PT", "SK", "PD",
                    "NP", "DK", "AW", "GT"
                  ].map((tech, i) => (
                    <motion.div 
                      key={i}
                      className="aspect-square rounded-sm bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center group/tech relative overflow-hidden"
                      whileHover={{ scale: 1.05, borderColor: "rgba(16,185,129,0.4)" }}
                    >
                      <span className="font-mono text-[8px] text-emerald-500/40 group-hover/tech:text-emerald-500 transition-colors z-10">{tech}</span>
                      <motion.div 
                        className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/tech:opacity-100 transition-opacity"
                        animate={{ 
                          opacity: [0, 0.1, 0],
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
                   {[
                     { k: "PY", v: "Python" }, { k: "LC", v: "LangChain" },
                     { k: "DB", v: "VectorDB" }, { k: "SQL", v: "MySQL" },
                     { k: "FL", v: "Flask" }, { k: "PT", v: "PyTorch" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-2 text-[8px] font-mono text-zinc-600">
                        <span className="text-emerald-500/50">{item.k}:</span>
                        <span className="truncate">{item.v}</span>
                     </div>
                   ))}
                </div>
              </TiltCard>

              <ExternalRegistries />
              <AlgorithmicCore />
            </div>

            {/* BACKGROUND DAEMON SECTION */}
            <div className="md:col-span-12 mt-8 sm:mt-12">
               <TiltCard className="p-6 sm:p-10 md:p-12 glass-card border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none hidden sm:block">
                    <Terminal size={200} />
                  </div>
                  <div className="max-w-4xl">
                    <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// INITIALIZING BACKGROUND_DAEMON ///</span>
                    <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 leading-relaxed font-light mb-6 sm:mb-8">
                      {(PROFILE as any).about}
                    </p>
                    <div className="flex items-start gap-4 p-4 sm:p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                       <div className="mt-1"><Activity size={16} className="text-emerald-500" /></div>
                       <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">System Idle Mode</span>
                          <p className="text-sm text-zinc-400">{(PROFILE as any).idleMode}</p>
                       </div>
                    </div>
                    <div className="mt-6 flex items-start gap-4 p-4 sm:p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
                       <div className="mt-1"><ShieldCheck size={16} className="text-emerald-500" /></div>
                       <div className="flex flex-col gap-1">
                          <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest font-bold">Deployment Status</span>
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

            {/* INTERACTIVE CLI SECTION */}
            <div className="md:col-span-12 mt-8 sm:mt-12">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// SYSTEM_INTERFACE_ACCESS ///</span>
               <InteractiveCLI />
            </div>

            {/* LIVE INFERENCE PLAYGROUND */}
            <div className="md:col-span-12 mt-8 sm:mt-12">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// LIVE_INFERENCE_PLAYGROUND ///</span>
               <div className="max-w-3xl mx-auto">
                  <InteractiveInferenceNode />
               </div>
            </div>

            {/* PROJECTS GRID - Full width */}
            <div id="projects-grid" className="md:col-span-12 mt-8 sm:mt-12">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// ACTIVE_NODES (PROJECTS) ///</span>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                 {PROJECTS.map((project) => (
                    <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
                 ))}
               </div>
            </div>

            {/* ENGINEERING LOGS */}
            <div className="md:col-span-12 mt-8 sm:mt-12">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// ENGINEERING_LOGS // INCIDENT_REPORTS ///</span>
               <IncidentReports />
            </div>

            {/* SKILLS TICKER - Full width */}
            <div className="md:col-span-12 mt-8 sm:mt-12">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// TECH_STACK_MODULE.EXE ///</span>
               <div className="py-8 sm:py-12 bg-emerald-500 text-black border-none flex items-center overflow-hidden rounded-[2rem] sm:rounded-[3rem] relative">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <div className="animate-ticker flex items-center gap-8 sm:gap-16 whitespace-nowrap relative z-10">
                     {[...skills, ...skills, ...skills].map((skill, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-4 sm:gap-6 interactive cursor-default"
                          whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                        >
                           <span className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter">{skill}</span>
                           <Zap size={24} className="fill-black sm:w-8 sm:h-8" />
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

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

            {/* EXPERIENCE LOG & FORMATION */}
            <div className="md:col-span-7">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// EXPERIENCE_LOG ///</span>
               <TiltCard className="h-full p-6 sm:p-10 glass-card">
                  <div className="flex items-center gap-4 mb-8 sm:mb-12 pb-6 border-b border-white/5">
                     <Terminal className="text-emerald-500" size={24} />
                     <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight">Experience Log</h3>
                  </div>
                  <div className="space-y-10 sm:space-y-12 pl-6 border-l border-emerald-500/20 relative flex-1 overflow-y-auto max-h-[400px] sm:max-h-[500px] pr-4 custom-scrollbar">
                     {WORK_LOG.map((log, i) => (
                        <div key={i} className="relative group">
                           <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-[#050505] ${log.active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 group-hover:bg-emerald-500/50'} transition-all duration-500`} />
                           <div className="flex flex-col gap-2">
                              <span className="font-display font-bold text-lg sm:text-xl leading-none group-hover:text-emerald-400 transition-colors">{log.role}</span>
                              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                                <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-bold">{log.inst}</span>
                                <span className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
                                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{log.date}</span>
                              </div>
                              <p className="text-sm text-zinc-400 mt-2 sm:mt-3 leading-relaxed font-light max-w-2xl">{log.log}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </TiltCard>
            </div>

            <div className="md:col-span-5">
               <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-6 sm:mb-8 block">/// EDUCATION_AND_CERTS ///</span>
               <TiltCard className="p-6 sm:p-10 h-full glass-card">
                  <div className="flex items-center justify-between mb-8 sm:mb-12">
                     <h3 className="font-display font-bold text-xl sm:text-2xl uppercase flex items-center gap-4 tracking-tight">
                        <ShieldCheck className="text-emerald-500" size={24} /> Education & Certs
                     </h3>
                  </div>
                  <div className="grid gap-3 sm:gap-4">
                     {CERTIFICATIONS.map((cert, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="interactive flex items-start justify-between p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-emerald-500/30 transition-all group cursor-default"
                        >
                           <div className="flex items-start gap-4">
                              <div className="w-1 h-8 sm:w-1.5 sm:h-10 bg-emerald-500/10 group-hover:bg-emerald-500 transition-all duration-500 rounded-full mt-1" />
                              <div className="flex flex-col">
                                 <span className="font-bold text-xs sm:text-sm uppercase tracking-tight group-hover:text-emerald-400 transition-colors">{cert.title}</span>
                                 <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono tracking-widest mt-1 sm:mt-2 uppercase">{cert.focus}</span>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </TiltCard>
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
                    <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-4 block">Initialization Complete</span>
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

            {/* FOOTER METRICS */}
            <div className="md:col-span-12 mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/5 flex flex-col gap-12 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] block">/// TERMINAL_CONNECTION (FOOTER) ///</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-700 text-[8px]">Status</span>
                        <span className="text-emerald-500">System Nominal // Active</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-zinc-700 text-[8px]">Bio</span>
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

          </div>
        </LayoutGroup>

        {/* --- MODALS --- */}
        <AnimatePresence>
          {activeProject && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[#0B0F14]/90 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setActiveProject(null)}
            >
              {/* Ambient Glow for Modal */}
              <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-gradient-radial from-emerald-500/30 to-transparent pointer-events-none"
              />

              <motion.div
                layoutId={`project-${activeProject.id}`}
                className="w-full max-w-5xl bg-[#12161C] border border-emerald-500/20 rounded-[2rem] overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                 <button onClick={() => setActiveProject(null)} className="absolute top-6 right-6 z-50 p-2 bg-black/50 rounded-full text-white hover:text-red-500 transition-colors">
                    <X size={24} />
                 </button>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Left Panel - Image */}
                    <motion.div 
                      className="h-[400px] md:h-auto relative overflow-hidden group"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                       <img src={activeProject.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[#12161C] via-transparent to-transparent" />
                       <div className="absolute bottom-8 left-8">
                          <span className="px-3 py-1 bg-emerald-500 text-black font-bold text-xs uppercase tracking-widest rounded mb-4 inline-block">{activeProject.stat}</span>
                          <h2 className="text-4xl md:text-5xl font-display font-black uppercase leading-none">{activeProject.title}</h2>
                       </div>
                    </motion.div>
                    
                    {/* Right Panel - Details */}
                    <motion.div 
                      className="p-12 flex flex-col justify-between bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                       <div className="space-y-8">
                          <div>
                             <h4 className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">/ Technical Brief</h4>
                             <div className="space-y-4 font-mono text-sm text-zinc-400">
                                <div className='p-4 bg-white/5 rounded border border-white/5'>
                                    <span className="text-zinc-500 block text-xs uppercase mb-1">Constraint</span>
                                    {activeProject.brief.constraint}
                                </div>
                                <div className='p-4 bg-white/5 rounded border border-white/5'>
                                    <span className="text-zinc-500 block text-xs uppercase mb-1">Strategy</span>
                                    {activeProject.brief.strategy}
                                </div>
                                <div className='p-4 bg-emerald-500/10 rounded border border-emerald-500/20 text-emerald-400'>
                                    <span className="text-emerald-600 block text-xs uppercase mb-1">Outcome</span>
                                    {activeProject.brief.outcome}
                                </div>
                             </div>
                          </div>
                          
                          <div className="p-6 bg-black/30 rounded-xl border border-white/5 font-mono text-xs">
                             <div className="flex items-center gap-2 mb-4 text-zinc-500 border-b border-white/5 pb-2">
                                <Code size={14} /> <span>Stack_Trace.json</span>
                             </div>
                             <div className="text-emerald-400 space-y-1">
                                {activeProject.tags.map((tag: string, i: number) => (
                                   <div key={i}>"{tag}": <span className="text-white">true</span>,</div>
                                ))}
                             </div>
                          </div>

                          {activeProject.id === 'hotel-analytics' && (
                            <div className="space-y-2">
                              <h4 className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">/ Model_Metrics.log</h4>
                              <ClassificationReport />
                            </div>
                          )}

                          {(activeProject.id === 'vidsnap-ai' || activeProject.id === 'rag-ta') && (
                            <div className="space-y-2">
                              <h4 className="font-mono text-xs text-emerald-500 uppercase tracking-widest mb-2">/ API_Inference.json</h4>
                              <APIInference />
                            </div>
                          )}
                       </div>
                       
                     <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
                        {activeProject.link && (
                           <a 
                             href={activeProject.link} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             aria-label={`Launch ${activeProject.title} project`}
                             className="flex-1 py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest text-center rounded hover:bg-emerald-400 transition-colors"
                           >
                              Launch
                           </a>
                        )}
                        <a 
                          href={activeProject.github || PROFILE.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`View ${activeProject.title} source code on GitHub`}
                          className="px-6 py-4 border border-white/10 rounded hover:bg-white/5 transition-colors flex items-center justify-center"
                        >
                           <Github size={20} />
                        </a>
                     </div>
                    </motion.div>
                 </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AiChat />
        
      </main>
    </div>
  );
};

export default App;