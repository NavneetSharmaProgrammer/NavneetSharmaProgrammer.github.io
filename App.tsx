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
  Download,
  MapPin,
  Mail,
  MessageCircle,
  Check
} from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  Variants, 
  useSpring, 
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'framer-motion';
import { PROFILE, PROJECTS, SKILL_CATEGORIES, Project } from './constants';

// --- HYPERTEXT (SCRAMBLE EFFECT) ---
const HyperText = ({ text, className, glow = false }: { text: string; className?: string; glow?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterations = useRef(0);
  
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iter = 0;
    
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iter) {
          return text[index];
        }
        return characters[Math.floor(Math.random() * characters.length)];
      }).join(""));
      
      if (iter >= text.length) {
        clearInterval(interval);
        setIsScrambling(false);
      }
      
      iter += 1 / 3;
    }, 30);
  };

  return (
    <motion.span 
      onHoverStart={scramble}
      onViewportEnter={scramble} // Trigger on view
      className={`inline-block cursor-default font-mono ${className} ${glow ? 'text-glow-emerald text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500' : ''}`}
    >
      {displayText}
    </motion.span>
  );
};

// --- MAGNETIC BUTTON ---
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.2); // Magnetic strength
    position.y.set(middleY * 0.2);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// --- NEURAL CANVAS BACKGROUND ---
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

// --- 3D TILT & SPOTLIGHT PROJECT CARD ---
const ProjectCard = ({ project, colSpan = 1, rowSpan = 1, delay = 0 }: { project: Project, colSpan?: number, rowSpan?: number, delay?: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 400, damping: 25 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ 
        rotateX, 
        rotateY, 
        gridColumn: `span ${colSpan}`, 
        gridRow: `span ${rowSpan}`,
        //@ts-ignore
        "--mouse-x": mouseX, 
        //@ts-ignore
        "--mouse-y": mouseY 
      } as any}
      onMouseMove={handleMouse}
      onMouseLeave={() => {
        x.set(0); y.set(0); setIsHovered(false);
      }}
      onMouseEnter={() => setIsHovered(true)}
      className="bento-card spotlight-card group flex flex-col p-0 perspective-1000"
    >
      <div className="absolute inset-0 z-0 bg-neutral-900">
        <AnimatePresence>
          {isHovered && project.videoUrl ? (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            />
          ) : (
            <motion.img 
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={project.imageUrl} 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-700"
              alt={project.title}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </div>

      <div className="relative z-20 mt-auto p-8 md:p-12">
        <div className="flex gap-2 mb-4 flex-wrap">
            {project.tags.map(t => <span key={t} className="glass-pill backdrop-blur-md bg-black/50">{t}</span>)}
        </div>
        <h3 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-glow-emerald transition-all duration-300">
          {project.title}
        </h3>
        <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
           <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-lg mb-4">
            {project.description}
           </p>
           <p className="text-xs font-mono text-emerald-400 mb-6"> &gt; Key Tech: {project.keyTech}</p>
        </div>
        
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                <ShieldCheck size={16} className="text-emerald-500" />
              </div>
              <span className="text-[10px] md:text-[12px] font-black uppercase text-emerald-500 tracking-[0.2em]">{project.stat}</span>
            </div>
            <ArrowUpRight size={24} className="text-white opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
      </div>
    </motion.div>
  );
};

// --- SYSTEM SENTIENCE HUD ---
const SystemSentienceHUD = () => {
  const [thoughts, setThoughts] = useState("System Initialized...");
  const sentienceMessages = [
    "Optimizing Neural Weights...",
    "RAG Context Window: Expanded.",
    "Predictive Model Accuracy: 99.2%",
    "Analyzing Data Topology...",
    "System Load: Nominal.",
    "Deploying Microservices...",
    "Orchestrating AI Agents..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughts(sentienceMessages[Math.floor(Math.random() * sentienceMessages.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 md:max-w-md pointer-events-none">
       <div className="bg-black/80 backdrop-blur-2xl border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-4 pointer-events-auto shadow-2xl shadow-emerald-500/10">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
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
  const [copied, setCopied] = useState(false);

  // Experience Scroll Ref
  const experienceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end end"]
  });
  
  // Scrollytelling Hooks
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-10, 10]); // Velocity based skew
  const smoothSkew = useSpring(skewVelocity, { stiffness: 400, damping: 30 }); // Smooth physics skew

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

  const handleCopy = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dataTools = useMemo(() => [
    "Python", "SQL (T-SQL)", "C++", "Scikit-Learn", "TensorFlow", "PyTorch", "LangChain", 
    "OpenAI API", "Whisper", "Pandas", "NumPy", "BeautifulSoup", "NetworkX", "Power BI (DAX)", 
    "Matplotlib", "Seaborn", "Flask", "React.js", "Tailwind CSS", "Git", "Docker", "FFmpeg"
  ], []);

  const experience = useMemo(() => [
    { inst: "Croma Campus | Noida", role: "Data Science Trainee", date: "SEP 2025 - PRESENT", active: true, log: "Building automated Python scripts for data integrity & predictive modeling. Architecting Power BI dashboards for executive decision support." },
    { inst: "Micro Info Tech Services", role: "Web Development Intern", date: "MAY 2025 - JUN 2025", active: false, log: "Engineered responsive frontend architecture with 100% design fidelity. Optimized Git workflows, reducing merge conflicts by 20%." },
    { inst: "UptoSkills | Remote", role: "Web Development Intern", date: "JAN 2025 - APR 2025", active: false, log: "Architected scalable MERN Stack solutions. Integrated Redux for robust state management & optimized backend API performance." }
  ], []);

  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  const jellyConfig = { type: 'spring' as const, stiffness: 700, damping: 15, mass: 1.5 };
  
  const toggleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className={`min-h-screen ${vibe === 'minimal' ? 'bg-[#fafafa] text-black' : 'bg-[#050505] text-white'} selection:bg-emerald-500 selection:text-black font-sans transition-colors duration-1000 overflow-x-hidden relative`}>
      
      {/* CRT OVERLAY */}
      <div className="fixed inset-0 crt-overlay pointer-events-none z-[9999] opacity-30" />

      <NeuralCanvas vibe={vibe} />
      <SystemSentienceHUD />

      <main className="max-w-[1550px] mx-auto p-4 md:p-12 relative z-10">
        
        <nav className="flex justify-between items-center mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.85, rotate: -15, borderRadius: "50%" }}
                transition={jellyConfig}
                className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                NS
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-black border-2 border-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
            </div>
            <div>
              <p className="font-display font-black text-3xl tracking-tighter uppercase italic leading-none">
                <HyperText text="NAVNEET.OS" />
              </p>
              <div className="flex gap-2 mt-1">
                 <span className="text-[7px] font-black uppercase text-neutral-500 tracking-widest bg-white/5 px-2 py-0.5 rounded">Kernel 4.0.1</span>
                 <span className="text-[7px] font-black uppercase text-emerald-500 tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded animate-pulse">Root Access</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <Magnetic>
              <div 
                className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group" 
                onClick={() => setIsCommandOpen(true)}
              >
                <Command size={14} className="text-neutral-500 group-hover:text-emerald-500" />
                <span className="text-[10px] font-black uppercase text-neutral-500 group-hover:text-white">Neural Search [⌘K]</span>
              </div>
            </Magnetic>
            
            <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
              {(['minimal', 'maximal', 'neural'] as const).map((v) => (
                <motion.button 
                  key={v}
                  onClick={() => setVibe(v)}
                  whileTap={{ scale: 0.85 }}
                  transition={jellyConfig}
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${vibe === v ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'text-neutral-500 hover:text-white'}`}
                >
                  {v}
                </motion.button>
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
          
          <motion.div className="col-span-1 md:col-span-2 md:row-span-2 bento-card p-12 md:p-20 flex flex-col justify-between group perspective-1000">
            <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
               <Layers size={300} strokeWidth={0.5} className="animate-float" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <BrainCircuit size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500">{PROFILE.currentStatus}</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase">
                <HyperText text="ARCHITECTING" /> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 group-hover:from-white group-hover:to-white transition-all duration-1000">
                  <HyperText text="INTELLIGENCE." glow />
                </span> 
              </h1>
              <div className="space-y-4">
                <p className="text-neutral-400 text-2xl max-w-xl font-medium leading-relaxed">
                  {PROFILE.summary}
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-emerald-500 text-[11px] font-black uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-xl inline-block border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    {PROFILE.currentRole}
                  </p>
                  <p className="text-neutral-500 text-[11px] font-black uppercase tracking-widest px-1">
                    {PROFILE.location}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-16">
              <div className="flex flex-wrap gap-5">
                <Magnetic>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    href={PROFILE.resumeUrl} target="_blank" 
                    className="px-8 py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)]"
                  >
                    <Download size={20} /> DOWNLOAD_RESUME
                  </motion.a>
                </Magnetic>
                <Magnetic>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    href={`mailto:${PROFILE.email}`}
                    className="px-8 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all flex items-center gap-4"
                  >
                    <Mail size={20} /> INITIATE_CONTACT
                  </motion.a>
                </Magnetic>
              </div>
              <p className="mt-6 text-[10px] font-mono text-emerald-500/80 flex items-center gap-2">
                <Activity size={12}/> GitHub Activity: 400+ Contributions in the last year
              </p>
            </div>
          </motion.div>

          {/* PROJECT CARDS - REFACTORED TO USE ProjectCard */}
          {PROJECTS.map((proj, i) => (
             <ProjectCard key={proj.id} project={proj} colSpan={2} rowSpan={2} delay={i * 0.1} />
          ))}

          {/* USER DNA CARD */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bento-card p-10 flex flex-col justify-between group overflow-hidden bg-gradient-to-br from-emerald-500/5 to-transparent"
          >
            <div className="absolute top-0 right-0 p-4">
               <Fingerprint size={60} className="text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors" />
            </div>
            <div className="flex justify-between items-center relative z-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 italic">User DNA</h4>
               <motion.div 
                whileTap={{ scale: 0.8 }}
                transition={jellyConfig}
                className={`p-2 rounded-full transition-all duration-500 ${scanning ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,1)]' : 'bg-white/5 text-emerald-500 hover:bg-emerald-500/20'}`} onClick={toggleScan}
               >
                 <Activity size={18} className={scanning ? 'animate-bounce' : 'animate-pulse'} />
               </motion.div>
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
                    <p className="text-sm font-bold font-mono">0.00028ms</p>
                  </div>
                  <Zap size={20} className="text-emerald-500 animate-pulse" />
               </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 bento-card flex flex-col justify-center py-12 overflow-hidden group"
          >
            <div className="px-12 mb-8 flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-500 italic">Processing Array</h3>
              <div className="flex gap-2">
                 <Mic size={14} className="text-neutral-700 hover:text-emerald-500 transition-colors cursor-pointer" />
                 <Sparkles size={16} className="text-emerald-500 group-hover:rotate-180 transition-transform duration-[1.5s]" />
              </div>
            </div>
            <div className="relative overflow-hidden flex items-center h-20">
              {/* Velocity-based Skew Ticker */}
              <motion.div style={{ skewX: smoothSkew }} className="animate-ticker origin-center">
                {dataTools.map((tool, i) => (
                  <div key={i} className="px-14 flex items-center gap-8">
                    <span className="text-5xl font-display font-black uppercase tracking-tighter text-white/10 group-hover:text-white transition-all duration-700 cursor-default whitespace-nowrap hover:scale-125 hover:text-emerald-500 shadow-glow hover:text-glow-emerald">
                      {tool}
                    </span>
                    <div className="w-3 h-3 bg-emerald-500/20 rounded-full border border-emerald-500/30" />
                  </div>
                ))}
              </motion.div>
              <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10" />
            </div>
          </motion.div>

          <motion.a 
            href={PROFILE.youtube} target="_blank"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={jellyConfig}
            className="bento-card p-10 flex flex-col justify-between group hover:border-red-500/40 relative"
          >
             <div className="absolute top-[-30%] right-[-30%] w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
             <div className="flex justify-between items-start relative z-10">
               <div className="p-4 bg-red-500/10 text-red-500 rounded-[2rem] group-hover:bg-red-500 group-hover:text-white transition-all shadow-2xl shadow-red-500/10 border border-red-500/20">
                 <Youtube size={32} />
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-xl">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live Tutorials</span>
               </div>
             </div>
             <div className="relative z-10 mt-6">
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2 tracking-[0.2em]">Broadcast Array</p>
               <h4 className="text-3xl font-display font-black uppercase leading-[0.9] group-hover:text-glow-red transition-all">Coding With <br/> Navneet</h4>
             </div>
             <ArrowUpRight size={24} className="text-neutral-700 group-hover:text-white transition-colors self-end mt-4" />
          </motion.a>

          {/* EXPERIENCE LOG WITH SCROLL PATH */}
          <motion.div 
            ref={experienceRef}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="md:row-span-2 bento-card p-12 flex flex-col group relative"
          >
            <div className="flex items-center gap-4 mb-14 sticky top-12 z-20 bg-[#0c0c0e]/90 backdrop-blur-xl p-4 -ml-4 rounded-xl border border-white/5">
               <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                 <Award size={28} className="text-emerald-500" />
               </div>
               <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Experience Log</h3>
            </div>
            
            <div className="flex-1 space-y-14 relative z-10">
               {/* Scroll Drawing Path */}
               <svg className="absolute left-1.5 top-0 bottom-0 w-1 h-full overflow-visible z-0 pointer-events-none">
                  <motion.path 
                    d={`M 1 0 V ${experience.length * 200}`} // Approximate height
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    fill="none"
                  />
                  <motion.path 
                    d={`M 1 0 V ${experience.length * 200}`}
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    style={{ pathLength: scrollYProgress }}
                  />
               </svg>
               
               {experience.map((exp, idx) => (
                 <motion.div 
                   key={idx} 
                   initial={{ opacity: 0, x: -30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.15, type: "spring" }}
                   viewport={{ once: true, margin: "-50px" }}
                   className={`pl-12 relative transition-all duration-700 ${exp.active ? 'opacity-100 scale-105' : 'opacity-80 group-hover:opacity-100'}`}
                 >
                    <div className={`absolute left-[-3px] top-2 w-5 h-5 rounded-full z-10 border-4 border-[#0c0c0e] ${exp.active ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)]' : 'bg-neutral-800'}`} />
                    <div className="sticky top-32 z-10 bg-[#0c0c0e]/80 backdrop-blur-md inline-block px-3 py-1 rounded-lg border border-white/5 mb-2">
                       <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">{exp.date}</p>
                    </div>
                    <p className="text-[11px] font-black uppercase text-neutral-500 mb-1 tracking-[0.3em]">{exp.inst}</p>
                    <h5 className="text-xl font-bold leading-tight uppercase group-hover:text-emerald-400 transition-colors mb-2">{exp.role}</h5>
                    <p className="text-[12px] text-neutral-400 leading-relaxed italic">{exp.log}</p>
                 </motion.div>
               ))}
            </div>
            <motion.a 
              href={PROFILE.resumeUrl}
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9, scaleX: 1.15, scaleY: 0.85 }}
              transition={jellyConfig}
              className="mt-16 w-full py-6 bg-white/5 border border-white/10 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.5em] hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all shadow-xl text-center flex items-center justify-center gap-3 relative z-20"
            >
              <Download size={14} /> Full Logic Sheet
            </motion.a>
          </motion.div>

          <motion.a 
            href={PROFILE.instagram} target="_blank"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={jellyConfig}
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
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2 tracking-[0.2em]">Visual Trace</p>
               <h4 className="text-3xl font-display font-black uppercase leading-none group-hover:text-glow-pink">Life @ <br/> Noida</h4>
             </div>
          </motion.a>

          {/* ISOMETRIC STATS / TRUST SIGNALS */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="bento-card p-10 flex flex-col justify-center text-center group bg-emerald-500/5 border-emerald-500/20 overflow-hidden"
          >
            {/* Simple Isometric Grid Simulation */}
            <div className="absolute inset-0 opacity-20 pointer-events-none transform rotate-45 scale-150 translate-y-10">
               <div className="grid grid-cols-6 gap-2">
                  {Array.from({length: 36}).map((_, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, scale: 0 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: i * 0.05 }}
                       className={`w-8 h-8 rounded-md ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                     />
                  ))}
               </div>
            </div>

            <div className="relative mx-auto mb-6 z-10">
               <Zap size={40} className="text-emerald-500 group-hover:animate-bounce relative z-10" />
               <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full scale-150 animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-500 relative z-10">Core Engine</p>
            <p className="text-3xl font-display font-black text-white mt-2 uppercase italic tracking-tighter relative z-10">Peak Stable</p>
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
                     { label: 'RAG AI Logic', icon: BrainCircuit, link: '#' },
                     { label: 'Download Resume', icon: Download, link: PROFILE.resumeUrl },
                     { label: 'LinkedIn Uplink', icon: Linkedin, link: PROFILE.linkedIn },
                     { label: 'Github Repos', icon: Github, link: PROFILE.github },
                     { label: 'YouTube Archive', icon: Youtube, link: PROFILE.youtube },
                     { label: 'Instagram Trace', icon: Instagram, link: PROFILE.instagram }
                   ].map((cmd, i) => (
                     <motion.a 
                       key={i} 
                       href={cmd.link}
                       target="_blank"
                       whileHover={{ x: 5, scale: 1.02 }}
                       whileTap={{ scale: 0.97 }}
                       transition={jellyConfig}
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
                  <span className="flex items-center gap-2 italic"> <MousePointer2 size={12} /> Press ESC to Close System Interface</span>
                  <span className="text-emerald-500/60 animate-pulse">Connection: Stable</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
           <div className="flex flex-col gap-10 w-full md:w-auto">
             <div className="flex flex-wrap justify-center md:justify-start gap-12">
                <motion.div 
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className="flex items-center gap-4 text-neutral-400 hover:text-emerald-500 transition-colors cursor-pointer relative"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Mail size={18} className="text-emerald-500" />}
                  <span className="text-[11px] font-black uppercase tracking-widest">{copied ? "COPIED TO CLIPBOARD" : PROFILE.email}</span>
                  {copied && <motion.span initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="absolute -top-8 left-0 text-[9px] bg-emerald-500 text-black px-2 py-1 rounded">CMD EXECUTED</motion.span>}
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-4 text-neutral-400 hover:text-emerald-500 transition-colors cursor-pointer"
                >
                  <MessageCircle size={18} className="text-emerald-500" />
                  <a href={PROFILE.whatsapp} target="_blank" className="text-[11px] font-black uppercase tracking-widest">Connect on WhatsApp</a>
                </motion.div>
                <div className="flex items-center gap-4 text-neutral-400">
                  <MapPin size={18} className="text-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{PROFILE.location}</span>
                </div>
             </div>

             <div className="flex flex-wrap justify-center md:justify-start gap-6">
               <motion.a 
                 href={PROFILE.youtube} 
                 target="_blank"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
               >
                 <Youtube size={20} />
               </motion.a>
               <motion.a 
                 href={PROFILE.instagram} 
                 target="_blank"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
               >
                 <Instagram size={20} />
               </motion.a>
               <motion.a 
                 href={PROFILE.github} 
                 target="_blank"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-white/5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
               >
                 <Github size={20} />
               </motion.a>
             </div>
           </div>

           <div className="text-center md:text-right w-full md:w-auto">
             <p className="text-[11px] font-black uppercase text-white/10 tracking-[1.5em] mb-4">SYSTEM ID: {PROFILE.systemId}</p>
             <div className="flex flex-col items-center md:items-end gap-1">
                <p className="text-[9px] font-mono text-neutral-800 uppercase tracking-widest leading-none">NS_KERNEL_V4.0 // ROOT_ACCESS</p>
                <div className="flex gap-2 mt-2">
                   <span className="w-1.5 h-1.5 bg-emerald-500/20 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-emerald-500/40 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse shadow-[0_0_5px_#10b981]" />
                </div>
             </div>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default App;