import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight,
  Award,
  ChevronRight,
  BrainCircuit,
  Terminal,
  Activity,
  Zap,
  ExternalLink,
  Instagram,
  FileText,
  Youtube,
  PlayCircle,
  Video,
  Database,
  Search,
  Sparkles,
  MousePointer2,
  Cpu,
  Command,
  Settings,
  ShieldCheck,
  ZapOff,
  Camera,
  Layers,
  Fingerprint,
  Mic,
  Wifi,
  Download
} from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, Variants, useSpring, useMotionValue } from 'framer-motion';
import { PROFILE, PROJECTS } from './constants';

// --- INVENTED: Neural Canvas Background ---
const NeuralCanvas = ({ vibe }: { vibe: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = vibe === 'neural' ? 100 : 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = vibe === 'neural' ? '16, 185, 129' : (vibe === 'maximal' ? '139, 92, 246' : '150, 150, 150');
      const opacityMultiplier = vibe === 'minimal' ? 0.03 : 0.12;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacityMultiplier})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / 180) * opacityMultiplier})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => window.removeEventListener('resize', resize);
  }, [vibe]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// --- INVENTED: 3D Tilt Wrapper ---
const TiltCard = ({ children, className, colSpan = 1, rowSpan = 1 }: any) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 400, damping: 25 });

  function handleMouse(event: any) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ rotateX, rotateY, gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}` }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// --- INVENTED: System Sentience Overlay ---
const SystemSentienceHUD = () => {
  const [thoughts, setThoughts] = useState("System Initialized...");
  const sentienceMessages = [
    "Analyzing scroll patterns...",
    "User focus detected on RAG Project.",
    "Optimizing data rendering pathways.",
    "Neural weights updated.",
    "Bento grid structure: Stable.",
    "Dopamine levels rising...",
    "System 2.0.26 operating at 99.8%."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughts(sentienceMessages[Math.floor(Math.random() * sentienceMessages.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 md:max-w-md pointer-events-none">
       <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-4 pointer-events-auto">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-tighter w-48 truncate">{thoughts}</p>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
             <Wifi size={12} className="text-emerald-500" />
             <div className="w-px h-3 bg-white/10" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [vibe, setVibe] = useState<'minimal' | 'maximal' | 'neural'>('neural');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [stats, setStats] = useState({ mouseV: 0, clickCount: 0 });
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let lastX = 0, lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const v = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      setStats(prev => ({ ...prev, mouseV: Math.round(v) }));
      lastX = e.clientX; lastY = e.clientY;
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const dataTools = useMemo(() => [
    "Python", "SQL", "Power BI", "Pandas", "NumPy", "Scikit-Learn", "LLMs", "LangChain", 
    "PyTorch", "Flask", "FFmpeg", "ElevenLabs", "Matplotlib", "Seaborn", "Git", "Jupyter",
    "TensorFlow", "XGBoost", "HuggingFace", "FastAPI", "PostgreSQL", "React", "D3.js"
  ], []);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const toggleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className={`min-h-screen ${vibe === 'minimal' ? 'bg-[#fafafa] text-black' : 'bg-[#050505] text-white'} selection:bg-emerald-500 selection:text-black font-sans transition-colors duration-1000 overflow-x-hidden`}>
      
      <NeuralCanvas vibe={vibe} />
      <SystemSentienceHUD />

      <main className="max-w-[1550px] mx-auto p-4 md:p-12 relative z-10">
        
        <nav className="flex justify-between items-center mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] group-hover:rotate-12 transition-transform cursor-pointer">
                NS
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border-2 border-emerald-500 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="font-display font-black text-3xl tracking-tighter uppercase italic leading-none">
                NAVNEET<span className="text-emerald-500">.</span>OS
              </p>
              <div className="flex gap-2 mt-1">
                 <span className="text-[7px] font-black uppercase text-neutral-500 tracking-widest bg-white/5 px-2 py-0.5 rounded">Core 2.0.26</span>
                 <span className="text-[7px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse">Live Uplink</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group" onClick={() => setIsCommandOpen(true)}>
              <Command size={14} className="text-neutral-500 group-hover:text-emerald-500" />
              <span className="text-[10px] font-black uppercase text-neutral-500 group-hover:text-white">Neural Search [⌘K]</span>
            </div>
            
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
              {(['minimal', 'maximal', 'neural'] as const).map((v) => (
                <button 
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${vibe === v ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-neutral-500 hover:text-white'}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <motion.div 
          variants={gridVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          
          <TiltCard colSpan={2} rowSpan={2} className="bento-card p-12 md:p-20 flex flex-col justify-between group">
            <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
               <Layers size={300} strokeWidth={0.5} className="animate-float" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <BrainCircuit size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500">Cognitive Layer Active</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase">
                Data <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 group-hover:from-white group-hover:to-white transition-all duration-1000">Evolved</span> <br/>
                Into Art<span className="text-emerald-500">.</span>
              </h1>
              <p className="text-neutral-400 text-2xl max-w-xl font-medium leading-relaxed">
                Navneet Sharma here. Engineering <span className="text-white italic">Synthetic Wisdom</span> through <span className="text-white">Generative Pipelines</span> and <span className="text-white">Advanced ML</span>.
              </p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-5 mt-16">
              <motion.a 
                whileHover={{ scale: 1.05, y: -8, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                href={PROFILE.linkedIn} target="_blank" 
                className="px-8 py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)]"
              >
                <Fingerprint size={20} /> Identity Profile
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -8, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                href={PROFILE.github} target="_blank" 
                className="px-8 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all"
              >
                Logic Repos
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, y: -8, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                href={PROFILE.resumeUrl} target="_blank" 
                className="px-8 py-6 bg-white/5 border border-emerald-500/30 text-emerald-500 font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-emerald-500 hover:text-black transition-all flex items-center gap-4"
              >
                <Download size={20} /> Download Resume
              </motion.a>
            </div>
          </TiltCard>

          <TiltCard colSpan={2} rowSpan={2} className="bento-card group flex flex-col p-0">
            <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/95 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] grayscale group-hover:grayscale-0"
              alt="RAG AI"
            />
            <div className="relative z-20 mt-auto p-12">
              <div className="flex gap-3 mb-6">
                 {['Whisper', 'VectorDB', 'LangChain'].map(t => <span key={t} className="glass-pill">{t}</span>)}
              </div>
              <h3 className="text-6xl font-display font-black uppercase tracking-tighter mb-5 group-hover:text-glow-emerald transition-all duration-700">RAG AI Tutor</h3>
              <p className="text-neutral-300 text-xl leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-8 group-hover:translate-y-0 duration-500">
                Created a semantic-aware educational assistant that decodes lecture streams and allows students to {"'"}chat{"'"} with their course history.
              </p>
              <div className="mt-10 pt-10 border-t border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-emerald-500/20 rounded-lg">
                     <ShieldCheck size={20} className="text-emerald-500" />
                   </div>
                   <span className="text-[12px] font-black uppercase text-emerald-500 tracking-[0.3em]">Verified Logic Core</span>
                 </div>
                 <ArrowUpRight size={32} className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
          </TiltCard>

          <motion.div variants={itemVariants} className="bento-card p-10 flex flex-col justify-between group overflow-hidden bg-gradient-to-br from-emerald-500/5 to-transparent">
            <div className="absolute top-0 right-0 p-4">
               <Fingerprint size={60} className="text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
            </div>
            <div className="flex justify-between items-center relative z-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 italic">User DNA</h4>
               <div className={`p-2 rounded-full transition-all duration-500 ${scanning ? 'bg-emerald-500 text-black' : 'bg-white/5 text-emerald-500 hover:bg-emerald-500/20'}`} onClick={toggleScan}>
                 <Activity size={18} className={scanning ? 'animate-bounce' : 'animate-pulse'} />
               </div>
            </div>
            <div className="space-y-6 relative z-10">
               <div>
                  <p className="text-[9px] font-black text-neutral-600 uppercase mb-2">Input Velocity</p>
                  <p className="text-4xl font-display font-black text-emerald-500">{stats.mouseV}<span className="text-sm font-sans text-neutral-500 ml-2">px/s</span></p>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${Math.min(stats.mouseV / 12, 100)}%` }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_#10b981]" 
                  />
               </div>
               <div className="flex justify-between items-end border-t border-white/5 pt-4">
                  <div>
                    <p className="text-[9px] font-black text-neutral-600 uppercase">Core Latency</p>
                    <p className="text-sm font-bold font-mono">0.00032ms</p>
                  </div>
                  <Zap size={20} className="text-emerald-500 animate-pulse" />
               </div>
            </div>
          </motion.div>

          <TiltCard className="bento-card p-10 flex flex-col justify-between group">
             <div className="flex justify-between items-start relative z-10">
               <div className="w-16 h-16 bg-white/5 rounded-[2rem] flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all shadow-xl border border-white/5 group-hover:border-emerald-400">
                 <Video size={28} />
               </div>
               <div className="text-right">
                 <p className="text-[24px] font-display font-black leading-none text-emerald-500 text-glow-emerald">2026</p>
                 <p className="text-[9px] font-black uppercase text-neutral-600 tracking-tighter mt-1">Autonomous GEN-AI</p>
               </div>
             </div>
             <div className="relative z-10 mt-6">
               <h4 className="text-2xl font-display font-black uppercase mb-2">VidSnapAI</h4>
               <p className="text-[12px] text-neutral-500 leading-snug">Orchestrated a Flask-based pipeline for viral short-form content generation using ElevenLabs and FFmpeg.</p>
             </div>
             <div className="pt-6 border-t border-white/5 flex gap-2 relative z-10">
               <span className="glass-pill !bg-emerald-500/10 !text-emerald-500">100% Logic Path</span>
             </div>
          </TiltCard>

          <TiltCard className="bento-card p-10 flex flex-col justify-between group border-emerald-500/10">
             <div className="flex justify-between items-center">
               <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                 <Search size={24} />
               </div>
               <div className="flex gap-1.5">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-4 bg-white/10 group-hover:bg-emerald-500/60 transition-colors" style={{ transitionDelay: `${i*100}ms` }} />)}
               </div>
             </div>
             <div className="py-4">
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2">Model Inference #0xAF2</p>
               <h4 className="text-2xl font-display font-black uppercase leading-[1.1]">Valuation <br/> Engine</h4>
             </div>
             <div className="p-4 bg-zinc-950/80 border border-emerald-500/20 rounded-2xl">
               <p className="text-[11px] font-mono text-emerald-500 leading-relaxed whitespace-pre-wrap">
                 {"$ model.predict(X_test)\n >> RMSE: 0.124\n >> Status: Converged"}
               </p>
             </div>
          </TiltCard>

          <motion.div variants={itemVariants} className="md:col-span-2 bento-card flex flex-col justify-center py-12 overflow-hidden group">
            <div className="px-12 mb-8 flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-500 italic">Synthetic Processing Array</h3>
              <div className="flex gap-2">
                 <Mic size={14} className="text-neutral-700 hover:text-emerald-500 transition-colors cursor-pointer" />
                 <Sparkles size={16} className="text-emerald-500 group-hover:rotate-180 transition-transform duration-[1.5s]" />
              </div>
            </div>
            <div className="relative overflow-hidden flex items-center h-20">
              <div className="animate-ticker">
                {dataTools.map((tool, i) => (
                  <div key={i} className="px-14 flex items-center gap-8">
                    <span className="text-5xl font-display font-black uppercase tracking-tighter text-white/10 group-hover:text-white transition-all duration-700 cursor-default whitespace-nowrap hover:scale-125 hover:text-emerald-500">
                      {tool}
                    </span>
                    <div className="w-3 h-3 bg-emerald-500/20 rounded-full border border-emerald-500/30" />
                  </div>
                ))}
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10" />
            </div>
          </motion.div>

          <motion.a 
            href={PROFILE.youtube} target="_blank"
            variants={itemVariants}
            className="bento-card p-10 flex flex-col justify-between group hover:border-red-500/40 relative"
          >
             <div className="absolute top-[-30%] right-[-30%] w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
             <div className="flex justify-between items-start relative z-10">
               <div className="p-4 bg-red-500/10 text-red-500 rounded-[2rem] group-hover:bg-red-500 group-hover:text-white transition-all shadow-2xl shadow-red-500/10 border border-red-500/20">
                 <Youtube size={32} />
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-xl">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live Uplink</span>
               </div>
             </div>
             <div className="relative z-10 mt-6">
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2 tracking-[0.2em]">Broadcast Array</p>
               <h4 className="text-3xl font-display font-black uppercase leading-[0.9] group-hover:text-glow-red transition-all">Synthetic <br/> Tutorials</h4>
             </div>
             <ArrowUpRight size={24} className="text-neutral-700 group-hover:text-white transition-colors self-end mt-4" />
          </motion.a>

          <motion.div 
            variants={itemVariants}
            className="md:row-span-2 bento-card p-12 flex flex-col group"
          >
            <div className="flex items-center gap-4 mb-14">
               <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                 <Award size={28} className="text-emerald-500" />
               </div>
               <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Timeline<span className="text-emerald-500">_</span></h3>
            </div>
            <div className="flex-1 space-y-14 relative">
               <div className="absolute left-1.5 top-0 bottom-0 w-px bg-white/5 group-hover:bg-emerald-500/30 transition-all duration-1000" />
               
               {[
                 { inst: "Croma Campus", role: "DS Trainee", date: "Sep 2025", active: true },
                 { inst: "MSU Saharanpur", role: "BCA Graduate", date: "Aug 2025", active: false },
                 { inst: "UptoSkills", role: "WD Intern", date: "Apr 2025", active: false },
                 { inst: "TCS iON", role: "Credential", date: "Jan 2025", active: false }
               ].map((cert, idx) => (
                 <div key={idx} className={`pl-12 relative transition-all duration-700 ${cert.active ? 'opacity-100 scale-105' : 'opacity-20 group-hover:opacity-60'}`}>
                    <div className={`absolute left-[-1.5px] top-2 w-4 h-4 rounded-full ${cert.active ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'bg-neutral-800 border border-white/5'}`} />
                    <p className="text-[11px] font-black uppercase text-neutral-500 mb-2 tracking-[0.3em]">{cert.inst}</p>
                    <h5 className="text-xl font-bold leading-tight uppercase group-hover:text-emerald-400 transition-colors">{cert.role}</h5>
                    <p className="text-[11px] text-emerald-500/60 mt-3 font-mono bg-emerald-500/5 inline-block px-2 py-1 rounded">TIMESTAMP: {cert.date}</p>
                 </div>
               ))}
            </div>
            <motion.a 
              href={PROFILE.resumeUrl}
              target="_blank"
              whileHover={{ y: -5, scale: 1.02 }}
              className="mt-16 w-full py-6 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all shadow-xl text-center flex items-center justify-center gap-3"
            >
              <Download size={14} /> Verify Credentials
            </motion.a>
          </motion.div>

          <motion.a 
            href={PROFILE.instagram} target="_blank"
            variants={itemVariants}
            className="bento-card p-10 flex flex-col justify-between group overflow-hidden border-pink-500/10"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/10 via-[#dc2743]/10 to-[#bc1888]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="flex justify-between items-start relative z-10">
               <div className="p-4 bg-pink-500/10 rounded-[2rem] text-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-all">
                 <Instagram size={36} />
               </div>
               <Camera size={20} className="text-neutral-700 group-hover:text-pink-400 transition-colors" />
             </div>
             <div className="relative z-10 mt-6">
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2 tracking-[0.2em]">Trace Library</p>
               <h4 className="text-3xl font-display font-black uppercase leading-none group-hover:text-glow-pink">Visual <br/> Logbook</h4>
             </div>
          </motion.a>

          <motion.div 
            variants={itemVariants}
            className="bento-card p-10 flex flex-col justify-center text-center group bg-emerald-500/5 border-emerald-500/20"
          >
            <div className="relative mx-auto mb-6">
               <Zap size={40} className="text-emerald-500 group-hover:animate-bounce relative z-10" />
               <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full scale-150 animate-pulse" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-500">Core Engine</p>
            <p className="text-3xl font-display font-black text-white mt-2 uppercase italic tracking-tighter">Peak Stable</p>
            <div className="flex justify-center gap-2 mt-6">
              {[1,2,3,4,5,6].map(i => <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: `${i*150}ms` }} />)}
            </div>
          </motion.div>

        </motion.div>

        <AnimatePresence>
          {isCommandOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 backdrop-blur-xl bg-black/60"
              onClick={() => setIsCommandOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="w-full max-w-2xl bg-[#0c0c0e] border border-white/10 rounded-[3rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-6 mb-10 pb-6 border-b border-white/10">
                   <Terminal size={32} className="text-emerald-500" />
                   <input 
                     autoFocus
                     placeholder="Query Logic Core..."
                     className="bg-transparent border-none outline-none text-3xl w-full font-display font-bold placeholder:text-neutral-800 text-white italic"
                   />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {[
                     { label: 'Analyze RAG AI', icon: BrainCircuit, link: '#' },
                     { label: 'Fetch Master Resume', icon: FileText, link: PROFILE.resumeUrl },
                     { label: 'System Documentation', icon: Settings, link: '#' },
                     { label: 'Ping LinkedIn Uplink', icon: Linkedin, link: PROFILE.linkedIn },
                     { label: 'Neural Git Access', icon: Github, link: PROFILE.github },
                     { label: 'Broadcast Channel', icon: Youtube, link: PROFILE.youtube }
                   ].map((cmd, i) => (
                     <motion.a 
                       key={i} 
                       href={cmd.link}
                       target="_blank"
                       whileHover={{ x: 5, scale: 1.02 }}
                       className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-[1.5rem] hover:bg-emerald-500 hover:text-black cursor-pointer transition-all group"
                     >
                        <div className="flex items-center gap-4">
                           <cmd.icon size={20} className="text-neutral-500 group-hover:text-black transition-colors" />
                           <span className="text-[11px] font-black uppercase tracking-widest">{cmd.label}</span>
                        </div>
                        <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                     </motion.a>
                   ))}
                </div>
                <div className="mt-12 flex justify-between items-center text-[10px] font-black uppercase text-neutral-700 tracking-[0.2em]">
                  <span className="flex items-center gap-2 italic"> <MousePointer2 size={12} /> Click Command or ESC to Terminate</span>
                  <span className="text-emerald-500/60 animate-pulse">Uplink: Synchronized</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
           <div className="flex flex-wrap justify-center md:justify-start gap-16">
              {[
                { icon: Github, label: "Core.Repository", url: PROFILE.github },
                { icon: Linkedin, label: "Professional.Sync", url: PROFILE.linkedIn },
                { icon: Youtube, label: "Neural.Broadcast", url: PROFILE.youtube },
                { icon: Instagram, label: "Visual.Trace", url: PROFILE.instagram }
              ].map((s, idx) => (
                <a key={idx} href={s.url} target="_blank" className="flex items-center gap-4 text-[11px] font-black uppercase text-neutral-600 hover:text-emerald-500 transition-all group">
                   <s.icon size={24} className="group-hover:scale-125 group-hover:rotate-6 transition-all duration-500" /> 
                   <span className="group-hover:translate-x-1 transition-transform">{s.label}</span>
                </a>
              ))}
           </div>
           <div className="text-center md:text-right">
             <p className="text-[11px] font-black uppercase text-white/10 tracking-[1.5em] mb-4">SYSTEM.TERMINATED</p>
             <div className="flex flex-col items-center md:items-end gap-1">
                <p className="text-[9px] font-mono text-neutral-800">C:Navneet_Sharma_Portfolio_2026.exe --status=optimal</p>
                <div className="flex gap-2">
                   <span className="w-1.5 h-1.5 bg-emerald-500/20 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse" />
                </div>
             </div>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
