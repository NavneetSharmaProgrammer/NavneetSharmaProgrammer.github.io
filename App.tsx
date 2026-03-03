import React, { useState, useMemo } from 'react';
import { 
  Github, Terminal, Activity, Zap, ShieldCheck, 
  Code, X
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
import AiChat from './AiChat';

const App: React.FC = () => {
  const [baseVibe, setBaseVibe] = useState<Vibe>('neural');
  const [activeProject, setActiveProject] = useState<any>(null);

  // Dynamic Vibe Override: If project is open, intensify to 'maximal'
  const vibe = activeProject ? 'maximal' : baseVibe;

  // Memoize flat skills list
  const skills = useMemo(() => SKILL_CATEGORIES.flatMap(c => c.skills), []);

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* --- LAYER 0: SYSTEMS --- */}
      <NeuralBackground vibe={vibe} />
      <div className="atmosphere" />
      <div className="noise" />
      <CustomCursor vibe={vibe} />
      <OrbitalNav vibe={vibe} setVibe={setBaseVibe} />
      
      {/* Overlays */}
      <div className="scanline" />

      {/* --- LAYER 1: CONTENT --- */}
      <main className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-12 pb-32">
        
        {/* Header HUD - Refined */}
        <header className="flex justify-between items-center mb-16 py-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-40 px-6 rounded-b-3xl">
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
                  System: Operational
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
            <div className="md:col-span-4 space-y-6">
              <TiltCard className="p-8 glass-card border-emerald-500/10">
                <div className="flex items-center gap-3 mb-6">
                  <Terminal size={18} className="text-emerald-500" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest">System Metrics</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Neural Load", value: "14.2%", color: "bg-emerald-500" },
                    { label: "RAG Latency", value: "42ms", color: "bg-emerald-500" },
                    { label: "Uptime", value: "99.99%", color: "bg-emerald-500" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                        <span>{stat.label}</span>
                        <span className="text-white">{stat.value}</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${stat.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: stat.value }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TiltCard>

              <TiltCard className="p-8 glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <Activity size={18} className="text-emerald-500" />
                  <h3 className="font-display font-bold text-sm uppercase tracking-widest">Active Nodes</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="aspect-square rounded-sm bg-emerald-500/10 border border-emerald-500/20"
                      animate={{ 
                        opacity: [0.3, 1, 0.3],
                        backgroundColor: i % 3 === 0 ? ["rgba(16,185,129,0.1)", "rgba(16,185,129,0.4)", "rgba(16,185,129,0.1)"] : "rgba(16,185,129,0.1)"
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                    />
                  ))}
                </div>
              </TiltCard>
            </div>

            {/* PROJECTS GRID - Full width */}
            <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROJECTS.map((project) => (
                 <ProjectCard key={project.id} project={project} onClick={() => setActiveProject(project)} />
              ))}
            </div>

            {/* SKILLS TICKER - Full width */}
            <div className="md:col-span-12">
               <div className="py-12 bg-emerald-500 text-black border-none flex items-center overflow-hidden rounded-[3rem] relative">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                  <div className="animate-ticker flex items-center gap-16 whitespace-nowrap relative z-10">
                     {[...skills, ...skills, ...skills].map((skill, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-6 interactive cursor-default"
                          whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                        >
                           <span className="text-5xl font-display font-black uppercase tracking-tighter">{skill}</span>
                           <Zap size={32} className="fill-black" />
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>

            {/* EXPERIENCE LOG & FORMATION */}
            <div className="md:col-span-7">
               <TiltCard className="h-full p-10 glass-card">
                  <div className="flex items-center gap-4 mb-12 pb-6 border-b border-white/5">
                     <Terminal className="text-emerald-500" size={24} />
                     <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Experience Log</h3>
                  </div>
                  <div className="space-y-12 pl-6 border-l border-emerald-500/20 relative flex-1 overflow-y-auto max-h-[500px] pr-4 custom-scrollbar">
                     {WORK_LOG.map((log, i) => (
                        <div key={i} className="relative group">
                           <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-4 border-[#050505] ${log.active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-zinc-800 group-hover:bg-emerald-500/50'} transition-all duration-500`} />
                           <div className="flex flex-col gap-2">
                              <span className="font-display font-bold text-xl leading-none group-hover:text-emerald-400 transition-colors">{log.role}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-bold">{log.inst}</span>
                                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{log.date}</span>
                              </div>
                              <p className="text-sm text-zinc-400 mt-3 leading-relaxed font-light max-w-2xl">{log.log}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </TiltCard>
            </div>

            <div className="md:col-span-5">
               <TiltCard className="p-10 h-full glass-card">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="font-display font-bold text-2xl uppercase flex items-center gap-4 tracking-tight">
                        <ShieldCheck className="text-emerald-500" size={24} /> Formation
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
                                 <span className="text-[10px] text-zinc-500 font-mono tracking-widest mt-2 uppercase">{cert.focus}</span>
                              </div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </TiltCard>
            </div>

            {/* FOOTER METRICS */}
            <div className="md:col-span-12 mt-20 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                <div className="flex items-center gap-16">
                   <div className="flex flex-col gap-1">
                     <span className="text-zinc-700 text-[8px]">Location</span>
                     <span>Noida // India</span>
                   </div>
                   <div className="flex flex-col gap-1">
                     <span className="text-zinc-700 text-[8px]">Status</span>
                     <span className="text-emerald-500">Online // Active</span>
                   </div>
                </div>
                <div className="flex gap-12">
                   <a href={PROFILE.linkedIn} target="_blank" className="hover:text-emerald-500 transition-all hover:tracking-[0.4em]">LinkedIn</a>
                   <a href={PROFILE.email} className="hover:text-emerald-500 transition-all hover:tracking-[0.4em]">Email</a>
                   <a href={PROFILE.github} target="_blank" className="hover:text-emerald-500 transition-all hover:tracking-[0.4em]">Github</a>
                </div>
                <div className="text-zinc-700">
                   {PROFILE.systemId}
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
                       </div>
                       
                       <div className="flex gap-4 mt-8 pt-8 border-t border-white/5">
                          {activeProject.link && (
                             <a href={activeProject.link} target="_blank" className="flex-1 py-4 bg-emerald-500 text-black font-bold uppercase tracking-widest text-center rounded hover:bg-emerald-400 transition-colors">
                                Launch
                             </a>
                          )}
                          <button className="px-6 py-4 border border-white/10 rounded hover:bg-white/5 transition-colors">
                             <Github size={20} />
                          </button>
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