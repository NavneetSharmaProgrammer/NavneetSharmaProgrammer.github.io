import React, { useEffect, useState, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight,
  Award,
  BrainCircuit,
  Terminal,
  Activity,
  Zap,
  Instagram,
  Youtube,
  Search,
  Sparkles,
  MousePointer2,
  Command,
  ShieldCheck,
  Layers,
  Fingerprint,
  Mic,
  Wifi,
  Download,
  MapPin,
  Mail,
  MessageCircle,
  Check,
  Camera
} from 'lucide-react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  AnimatePresence, 
  Variants, 
  useSpring, 
  useMotionValue,
  useVelocity
} from 'framer-motion';
import { PROFILE, PROJECTS, Project, CERTIFICATIONS } from './constants';

// --- VISUAL COMPONENTS ---

// 1. HyperText (Scramble Effect)
const HyperText = ({ text, className, glow = false }: { text: string; className?: string; glow?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);
    let iter = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split("").map((letter, index) => {
        if (index < iter) return text[index];
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
      onViewportEnter={scramble}
      className={`inline-block cursor-default font-mono ${className} ${glow ? 'text-glow-emerald text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500' : ''}`}
    >
      {displayText}
    </motion.span>
  );
};

// 2. Magnetic Button
const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.2);
    position.y.set(middleY * 0.2);
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      style={{ x: position.x, y: position.y }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

// 3. Neural Canvas Background
const NeuralCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 70; // High density

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
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 1.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = '16, 185, 129'; // Emerald

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.1)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${(1 - dist / 120) * 0.08})`;
            ctx.lineWidth = 0.5;
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
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// 4. Project Card with 3D Tilt & Parallax
const ProjectCard = ({ project, colSpan = 1, rowSpan = 1, delay = 0 }: { project: Project, colSpan?: number, rowSpan?: number, delay?: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 400, damping: 30 });
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
        gridColumn: `span ${colSpan}`, 
        gridRow: `span ${rowSpan}`,
      }}
      className="bento-card group perspective-1000 bg-transparent relative"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d", // Critical for parallax
          //@ts-ignore
          "--mouse-x": mouseX, 
          //@ts-ignore
          "--mouse-y": mouseY 
        }}
        onMouseMove={handleMouse}
        onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        className="w-full h-full spotlight-card flex flex-col p-0 bg-[#0c0c0e] relative overflow-hidden rounded-3xl border border-white/5 backface-hidden shadow-2xl"
      >
        {/* Background Layer (Z=0) */}
        <div className="absolute inset-0 z-0 bg-neutral-900 transform-z-0">
          <AnimatePresence mode='wait'>
            {isHovered && project.videoUrl ? (
              <motion.video
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={project.videoUrl}
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
              />
            ) : (
              <motion.img 
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={project.imageUrl} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700"
                alt={project.title}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
        </div>

        {/* Parallax Content Layer (Z=50) */}
        <div className="relative z-20 mt-auto p-8 md:p-10 transform-z-50 pointer-events-none">
          <div className="flex gap-2 mb-4 flex-wrap">
              {project.tags.map(t => <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-white/60 backdrop-blur-md">{t}</span>)}
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-glow-emerald transition-all duration-300 drop-shadow-lg">
            {project.title}
          </h3>
          <div className="overflow-hidden h-0 group-hover:h-auto transition-all duration-500">
             <p className="text-neutral-300 text-xs md:text-sm leading-relaxed max-w-lg mb-4 shadow-black drop-shadow-md">
              {project.description}
             </p>
             <p className="text-[10px] font-mono text-emerald-400 mb-6"> &gt; Key Tech: {project.keyTech}</p>
          </div>
          
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShieldCheck size={16} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.2em]">{project.stat}</span>
              </div>
              <ArrowUpRight size={24} className="text-white opacity-50 group-hover:opacity-100 transition-all" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 5. Glitch Certification Row
const GlitchCertification = ({ cert, index }: { cert: { title: string, issuer: string, date: string }, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, skewX: 20 }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        skewX: 0,
        transition: { 
          delay: index * 0.1, 
          type: "spring",
          stiffness: 100
        }
      }}
      whileHover={{ x: 10, backgroundColor: "rgba(16,185,129,0.05)" }}
      viewport={{ once: true }}
      className="flex items-center justify-between p-4 border-b border-white/5 group hover:border-emerald-500/30 transition-colors"
    >
      <div className="flex items-center gap-4">
         <div className="w-1 h-1 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
         <div>
            <h4 className="font-bold text-sm text-white/90 group-hover:text-emerald-400 transition-colors">{cert.title}</h4>
            <p className="text-xs text-neutral-500 uppercase tracking-wider">{cert.issuer}</p>
         </div>
      </div>
      <span className="font-mono text-xs text-neutral-600 group-hover:text-white transition-colors">{cert.date}</span>
    </motion.div>
  );
};

// 6. Holographic Tech Card
const TechCard = ({ name }: { name: string }) => {
  const glowColor = useMemo(() => {
    const n = name.toLowerCase();
    if (n.includes('react') || n.includes('python') || n.includes('pandas') || n.includes('docker') || n.includes('numpy')) return '#61DAFB'; // Cyan/Blue
    if (n.includes('sql') || n.includes('torch') || n.includes('tensor') || n.includes('aws') || n.includes('bi')) return '#F97316'; // Orange
    if (n.includes('node') || n.includes('open') || n.includes('mongo') || n.includes('lang') || n.includes('learn')) return '#10B981'; // Green
    return '#8B5CF6'; // Purple
  }, [name]);
  
  return (
    <div 
      className="relative flex-shrink-0 px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md group hover:scale-110 transition-transform duration-300 overflow-hidden cursor-default"
      style={{ '--glow-color': glowColor } as React.CSSProperties}
    >
      {/* Border Glow */}
      <div className="absolute inset-0 border border-transparent group-hover:border-[var(--glow-color)] rounded-xl transition-colors duration-300" />
      
      {/* Box Shadow Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_-5px_var(--glow-color)] rounded-xl" />
           
      {/* Moving Shine Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-12 translate-x-[-150%] group-hover:animate-card-shine pointer-events-none" />

      <span className="relative z-10 font-display font-bold text-sm md:text-base tracking-wider text-neutral-400 group-hover:text-white transition-colors uppercase">
        {name}
      </span>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [stats, setStats] = useState({ mouseV: 0 });
  const [scanning, setScanning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Scroll logic for Experience Path
  const experienceRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: experienceRef,
    offset: ["start center", "end center"]
  });
  
  // Scrollytelling Skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-10, 10]);
  const smoothSkew = useSpring(skewVelocity, { stiffness: 400, damping: 30 });

  useEffect(() => {
    let lastX = 0, lastY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const v = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      setStats({ mouseV: Math.round(v) });
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
    "Python", "SQL", "TensorFlow", "PyTorch", "LangChain", 
    "OpenAI", "Pandas", "NumPy", "NetworkX", "Power BI", 
    "Flask", "React.js", "Docker", "FFmpeg", "AWS"
  ], []);

  const experience = useMemo(() => [
    { inst: "Croma Campus | Noida", role: "Data Science Trainee", date: "SEP 2025 - PRESENT", active: true, log: "Building automated Python scripts for data integrity & predictive modeling." },
    { inst: "Micro Info Tech Services", role: "Web Development Intern", date: "MAY 2025 - JUN 2025", active: false, log: "Engineered responsive frontend architecture with 100% design fidelity." },
    { inst: "UptoSkills | Remote", role: "Web Development Intern", date: "JAN 2025 - APR 2025", active: false, log: "Architected scalable MERN Stack solutions with Redux state management." }
  ], []);

  const toggleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-black font-sans overflow-x-hidden relative">
      <NeuralCanvas />
      
      {/* Scanline Overlay */}
      <div className="fixed inset-0 crt-overlay pointer-events-none z-[50]" />

      {/* SYSTEM SENTIENCE HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
         <div className="bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-full flex items-center justify-between gap-6 pointer-events-auto shadow-2xl shadow-emerald-500/10 px-6">
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
               <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-tighter">SYSTEM ONLINE</p>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
         </div>
      </div>

      <main className="max-w-[1550px] mx-auto p-4 md:p-12 relative z-10">
        
        {/* NAV */}
        <nav className="flex justify-between items-center mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 group"
          >
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.85, rotate: -15, borderRadius: "50%" }}
                className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-black font-black text-2xl shadow-[0_0_40px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                NS
              </motion.div>
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
          
          <Magnetic>
            <div 
              className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group" 
              onClick={() => setIsCommandOpen(true)}
            >
              <Command size={14} className="text-neutral-500 group-hover:text-emerald-500" />
              <span className="text-[10px] font-black uppercase text-neutral-500 group-hover:text-white">Neural Search [⌘K]</span>
            </div>
          </Magnetic>
        </nav>

        {/* BENTO GRID */}
        <motion.div 
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          
          {/* HERO CARD (IDENTITY MODULE) */}
          <motion.div className="col-span-1 md:col-span-2 md:row-span-2 bento-card p-12 md:p-20 flex flex-col justify-between group perspective-1000 bg-[#0c0c0e] rounded-3xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
               <Layers size={300} strokeWidth={0.5} />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                <BrainCircuit size={16} className="text-emerald-500 animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-500">{PROFILE.currentStatus}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-[0.8] uppercase">
                <HyperText text="ARCHITECTING" /> <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                  <HyperText text="INTELLIGENCE." glow />
                </span> 
              </h1>
              <div className="space-y-4">
                <p className="text-neutral-400 text-xl md:text-2xl max-w-xl font-medium leading-relaxed">
                  {PROFILE.summary}
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-emerald-500 text-[11px] font-black uppercase tracking-widest bg-emerald-500/5 px-4 py-2 rounded-xl inline-block border border-emerald-500/20">
                    {PROFILE.currentRole}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-16 flex flex-wrap gap-5">
              <Magnetic>
                <motion.a 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
                  href={PROFILE.resumeUrl} target="_blank" 
                  className="px-8 py-6 bg-emerald-500 text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.4)] hover:bg-emerald-400 transition-colors"
                >
                  <Download size={20} /> DOWNLOAD_RESUME
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}
                  href={`mailto:${PROFILE.email}`}
                  className="px-8 py-6 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all flex items-center gap-4"
                >
                  <Mail size={20} /> INITIATE_UPLINK
                </motion.a>
              </Magnetic>
            </div>
          </motion.div>

          {/* PROJECT DATABASE (THE BIG 3) */}
          {PROJECTS.map((proj, i) => (
             <ProjectCard key={proj.id} project={proj} colSpan={2} rowSpan={2} delay={i * 0.1} />
          ))}

          {/* USER DNA / STATS */}
          <motion.div 
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="bento-card p-10 flex flex-col justify-between group overflow-hidden bg-[#0c0c0e] rounded-3xl border border-white/5 relative"
          >
            <div className="absolute top-0 right-0 p-4">
               <Fingerprint size={60} className="text-emerald-500/10" />
            </div>
            <div className="flex justify-between items-center relative z-10">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 italic">User DNA</h4>
               <motion.div 
                whileTap={{ scale: 0.8 }}
                className={`p-2 rounded-full cursor-pointer ${scanning ? 'bg-emerald-500 text-black' : 'bg-white/5 text-emerald-500'}`} onClick={toggleScan}
               >
                 <Activity size={18} className={scanning ? 'animate-bounce' : 'animate-pulse'} />
               </motion.div>
            </div>
            <div className="space-y-6 relative z-10">
               <div>
                  <p className="text-[9px] font-black text-neutral-600 uppercase mb-2">Input Velocity</p>
                  <p className="text-4xl font-display font-black text-emerald-500">{stats.mouseV}<span className="text-sm font-sans text-neutral-500 ml-2">px/s</span></p>
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

          {/* PROCESSING ARRAY (TECH STACK TICKER) */}
          <motion.div 
             variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="md:col-span-2 bento-card flex flex-col justify-center py-12 overflow-hidden bg-[#0c0c0e] rounded-3xl border border-white/5 relative"
          >
            <div className="px-12 mb-8 flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-500 italic">Processing Array</h3>
              <Sparkles size={16} className="text-emerald-500" />
            </div>
            <div className="relative overflow-hidden flex items-center h-28">
              <motion.div style={{ skewX: smoothSkew }} className="animate-ticker origin-center flex w-max items-center">
                {[...dataTools, ...dataTools].map((tool, i) => (
                  <div key={i} className="px-3">
                    <TechCard name={tool} />
                  </div>
                ))}
              </motion.div>
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0c0c0e] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0c0c0e] to-transparent z-10" />
            </div>
          </motion.div>

          {/* BROADCAST ARRAY (YOUTUBE) */}
          <motion.a 
            href={PROFILE.youtube} target="_blank"
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
            className="bento-card p-10 flex flex-col justify-between group bg-[#0c0c0e] rounded-3xl border border-white/5 relative overflow-hidden"
          >
             <div className="absolute top-[-30%] right-[-30%] w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none" />
             <div className="flex justify-between items-start relative z-10">
               <div className="p-4 bg-red-500/10 text-red-500 rounded-[2rem]">
                 <Youtube size={32} />
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-xl">
                 <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                 <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">Live</span>
               </div>
             </div>
             <div className="relative z-10 mt-6">
               <p className="text-[10px] font-black uppercase text-neutral-600 mb-2 tracking-[0.2em]">Broadcast Array</p>
               <h4 className="text-3xl font-display font-black uppercase leading-[0.9] group-hover:text-glow-pink transition-all">Coding With <br/> Navneet</h4>
             </div>
             <ArrowUpRight size={24} className="text-neutral-700 group-hover:text-white transition-colors self-end mt-4" />
          </motion.a>

          {/* EXPERIENCE LOG (TIMELINE) WITH STICKY HEADERS */}
          <motion.div 
            ref={experienceRef}
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="md:row-span-2 bento-card p-0 flex flex-col group relative bg-[#0c0c0e] rounded-3xl border border-white/5 overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex items-center gap-4 sticky top-0 z-30 bg-[#0c0c0e]/95 backdrop-blur-xl border-b border-white/5">
               <Award size={28} className="text-emerald-500" />
               <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic">Experience Log</h3>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="relative p-8 pt-0 flex-1 overflow-visible">
               {/* Scroll Circuit Line */}
               <div className="absolute left-[54px] top-4 bottom-10 w-[2px] bg-neutral-800 z-0">
                  <motion.div 
                    style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                    className="w-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  />
               </div>
               
               {experience.map((exp, idx) => (
                 <div key={idx} className="relative pl-12 py-8 group/item">
                    {/* Sticky Date Header */}
                    <div className="sticky top-20 z-20 flex items-center -ml-16 mb-6">
                         <div className={`w-5 h-5 rounded-full border-4 border-[#0c0c0e] relative z-10 ${exp.active ? 'bg-emerald-500' : 'bg-neutral-800 group-hover/item:bg-emerald-400 transition-colors'}`} />
                         <div className="ml-10 bg-[#0c0c0e]/90 backdrop-blur-xl px-4 py-1.5 rounded-lg border border-white/10 text-emerald-500 font-mono text-[10px] font-bold tracking-widest shadow-xl">
                            {exp.date}
                         </div>
                    </div>

                    {/* Content */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-emerald-500/20 transition-all hover:bg-white/[0.07]"
                    >
                       <p className="text-[10px] font-black uppercase text-neutral-500 mb-2 tracking-[0.2em]">{exp.inst}</p>
                       <h5 className="text-xl font-bold leading-tight uppercase mb-3 text-white">{exp.role}</h5>
                       <p className="text-xs text-neutral-400 leading-relaxed font-light">{exp.log}</p>
                    </motion.div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* VISUAL TRACE (INSTAGRAM) */}
          <motion.a 
            href={PROFILE.instagram} target="_blank"
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
            className="bento-card p-10 flex flex-col justify-between group overflow-hidden border-pink-500/10 bg-[#0c0c0e] rounded-3xl border border-white/5 relative"
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

          {/* ISOMETRIC CITY (STATS) */}
          <motion.div 
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="bento-card p-10 flex flex-col justify-center text-center group bg-emerald-500/5 border-emerald-500/20 overflow-hidden rounded-3xl relative"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none transform rotate-45 scale-150 translate-y-10">
               <div className="grid grid-cols-6 gap-2">
                  {Array.from({length: 36}).map((_, i) => (
                     <div key={i} className={`w-8 h-8 rounded-md transition-colors duration-1000 ${Math.random() > 0.5 ? 'bg-emerald-500/40' : 'bg-neutral-800/40'} hover:bg-emerald-400`} />
                  ))}
               </div>
            </div>
            <div className="relative mx-auto mb-6 z-10">
               <Zap size={40} className="text-emerald-500" />
               <div className="absolute inset-0 bg-emerald-500/40 blur-2xl rounded-full scale-150 animate-pulse" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-emerald-500 relative z-10">Core Engine</p>
            <p className="text-3xl font-display font-black text-white mt-2 uppercase italic tracking-tighter relative z-10">Peak Stable</p>
          </motion.div>

          {/* GLITCH REVEAL CERTIFICATIONS */}
           <motion.div 
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="md:col-span-2 bento-card p-10 flex flex-col group bg-[#0c0c0e] rounded-3xl border border-white/5 relative overflow-hidden"
          >
             <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
               <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight mb-1">Certifications</h3>
                  <p className="text-[10px] font-mono text-emerald-500 uppercase">Verified Credentials</p>
               </div>
               <Award size={20} className="text-neutral-500" />
             </div>
             <div className="flex flex-col gap-2">
                {CERTIFICATIONS.map((cert, i) => (
                   <GlitchCertification key={i} cert={cert} index={i} />
                ))}
             </div>
          </motion.div>

        </motion.div>

        {/* COMMAND PALETTE OVERLAY */}
        <AnimatePresence>
          {isCommandOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsCommandOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="w-full max-w-2xl bg-[#0c0c0e] border border-white/10 rounded-[2rem] p-10 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                   <Terminal size={24} className="text-emerald-500" />
                   <input autoFocus placeholder="Search..." className="bg-transparent text-2xl font-bold w-full outline-none text-white placeholder:text-neutral-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <a href={PROFILE.resumeUrl} target="_blank" className="p-4 bg-white/5 rounded-xl hover:bg-emerald-500 hover:text-black transition-colors flex items-center gap-3">
                      <Download size={18} /> <span className="font-bold text-sm">Download Resume</span>
                   </a>
                   <a href={PROFILE.linkedIn} target="_blank" className="p-4 bg-white/5 rounded-xl hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-3">
                      <Linkedin size={18} /> <span className="font-bold text-sm">LinkedIn</span>
                   </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}
        <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
           <div className="flex flex-col gap-10 w-full md:w-auto">
             <div className="flex flex-wrap gap-12">
                <div onClick={handleCopy} className="flex items-center gap-4 text-neutral-400 hover:text-emerald-500 transition-colors cursor-pointer relative group">
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Mail size={18} />}
                  <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-glow-emerald transition-all">{copied ? "COPIED" : PROFILE.email}</span>
                  {copied && <span className="absolute -top-6 left-0 text-[9px] bg-emerald-500 text-black px-2 py-0.5 rounded">COPIED</span>}
                </div>
                <div className="flex items-center gap-4 text-neutral-400">
                  <MapPin size={18} className="text-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{PROFILE.location}</span>
                </div>
             </div>
           </div>
           <div className="text-right">
             <p className="text-[11px] font-black uppercase text-white/10 tracking-[1.5em] mb-4">SYSTEM ID: {PROFILE.systemId}</p>
           </div>
        </footer>

      </main>
    </div>
  );
};

export default App;