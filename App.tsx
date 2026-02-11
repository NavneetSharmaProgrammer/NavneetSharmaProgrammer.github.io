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
  Video,
  Sparkles,
  Command,
  ShieldCheck,
  Camera,
  Layers,
  Fingerprint,
  Mic,
  Wifi,
  Download,
  Mail,
  MessageCircle,
  Smartphone
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
  useAnimationFrame,
  MotionValue,
  useMotionTemplate
} from 'framer-motion';
import { PROFILE, PROJECTS, CERTIFICATIONS, WORK_LOG, SKILL_CATEGORIES } from './constants';

// --- ERROR BOUNDARY COMPONENT ---
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-2 text-[10px] font-mono text-red-500 bg-red-900/10 border border-red-500/20 rounded flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          MODULE ERROR
        </div>
      );
    }

    return this.props.children;
  }
}

// --- KINETIC TYPOGRAPHY COMPONENT (Enhanced with Entrance Animation) ---
const KineticText = ({ text, className, glow = false, delay = 0 }: { text: string; className?: string; glow?: boolean, delay?: number }) => {
  const charVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: 90, skewX: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0, 
      skewX: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 } 
    }
  };

  return (
    <motion.span 
      className={`inline-flex whitespace-pre flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: 0.03, delayChildren: delay }}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={charVariants}
              className="inline-block cursor-default origin-bottom will-change-transform"
              whileHover={{
                scaleY: 1.5,
                scaleX: 0.85,
                y: -5,
                rotate: Math.random() * 15 - 7.5,
                color: glow ? 'var(--accent-main)' : undefined,
                textShadow: glow ? '0 0 20px var(--accent-glow)' : undefined,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};

// --- PARALLAX IMAGE COMPONENT ---
const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden h-full w-full relative ${className}`}>
      <motion.img 
        style={{ y, scale }}
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
      />
    </div>
  );
};

// --- GITHUB ISO CITY COMPONENT ---
// A CSS-Only Isometric City Implementation
const GithubCityBetter = React.memo(() => {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden -z-0">
             <div className="relative transform skew-y-12 scale-110 opacity-90 -translate-y-8">
                <div className="grid grid-cols-7 gap-2">
                    {Array.from({length: 49}).map((_, i) => {
                        const h = Math.random() > 0.8 ? 50 : Math.random() * 25 + 5;
                        const isActive = h > 30;
                        return (
                            <motion.div 
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: h }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.02, type: 'spring' }}
                                className={`w-3 relative shadow-xl ${isActive ? 'bg-theme-accent' : 'bg-theme-border'}`}
                                style={{ boxShadow: '-2px 2px 0px rgba(0,0,0,0.3)' }}
                            >
                                {isActive && <div className="absolute top-0 left-0 w-full h-1 bg-white/40 animate-pulse" />}
                            </motion.div>
                        )
                    })}
                </div>
             </div>
        </div>
    )
})


// --- NEURAL CANVAS BACKGROUND (Memoized for Performance) ---
const NeuralCanvas = React.memo(({ vibe, accentColor }: { vibe: string, accentColor: MotionValue<string> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentColor, setCurrentColor] = useState("16, 185, 129"); // Default Emerald

  // Sync MotionValue color to state for Canvas to read
  useEffect(() => {
    return accentColor.on("change", (latest) => {
      // Basic hex to rgb conversion for canvas
      const hex = latest.replace('#', '');
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      setCurrentColor(`${r}, ${g}, ${b}`);
    });
  }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = vibe === 'neural' ? 100 : (vibe === 'maximal' ? 70 : 40);

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
          vx: (Math.random() - 0.5) * (vibe === 'maximal' ? 0.8 : 0.4),
          vy: (Math.random() - 0.5) * (vibe === 'maximal' ? 0.8 : 0.4),
          radius: Math.random() * 1.5
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const opacityMultiplier = vibe === 'minimal' ? 0.05 : 0.12;
      const connectionDist = vibe === 'maximal' ? 220 : 180;
      const connectionDistSq = connectionDist * connectionDist; 

      ctx.fillStyle = `rgba(${currentColor}, ${opacityMultiplier})`;
      ctx.lineWidth = 0.4;

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < connectionDistSq) {
            const dist = Math.sqrt(distSq); 
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${currentColor}, ${(1 - dist / connectionDist) * opacityMultiplier})`;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [vibe, currentColor]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.6 }} />;
});

// --- 3D TILT WRAPPER ---
interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
  style?: React.CSSProperties;
}

const TiltCard = ({ children, className = "", colSpan = 1, rowSpan = 1, delay = 0, style = {} }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 400, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 400, damping: 25 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.9, rotateX: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 20, 
        delay: delay
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      style={{ rotateX, rotateY, gridColumn: `span ${colSpan}`, gridRow: `span ${rowSpan}`, ...style }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
};

// --- GLITCH CERTIFICATION COMPONENT (Updated with CSS Effect) ---
const GlitchCertification = React.memo(({ cert, index }: { cert: { title: string, issuer: string, date: string }, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="cert-card flex items-center justify-between p-4 border-b border-theme-border group hover:border-theme-accent hover:opacity-100 transition-colors cursor-pointer animate-glitch-reveal"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-4">
         <div className="cert-icon w-1.5 h-1.5 bg-theme-accent rounded-full opacity-50 group-hover:opacity-100 transition-all" />
         <div>
            <h4 className="cert-title font-bold text-sm text-theme-text opacity-90 group-hover:text-theme-accent transition-colors will-change-transform">{cert.title}</h4>
            <p className="text-[10px] text-theme-subtext uppercase tracking-widest">{cert.issuer}</p>
         </div>
      </div>
      <span className="font-mono text-[10px] text-theme-subtext group-hover:text-theme-text transition-colors">{cert.date}</span>
    </motion.div>
  );
});

// --- SYSTEM SENTIENCE HUD ---
const SystemSentienceHUD = React.memo(() => {
  const [thoughts, setThoughts] = useState("System Initialized...");
  const sentienceMessages = useMemo(() => [
    "Analyzing scroll patterns...",
    "User focus detected on RAG AI module.",
    "Optimizing predictive algorithms.",
    "Neural weights updated for Data Analysis.",
    "Bento structure: Stable & Optimized.",
    "Data scientist career path: Converging.",
    "System 2.0.26 operating at 99.9%."
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setThoughts(sentienceMessages[Math.floor(Math.random() * sentienceMessages.length)]);
    }, 4500);
    return () => clearInterval(interval);
  }, [sentienceMessages]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 md:max-w-md pointer-events-none">
       <div className="bg-theme-card backdrop-blur-2xl border border-theme-border p-3 rounded-2xl flex items-center justify-between gap-4 pointer-events-auto shadow-2xl shadow-theme-accent/5">
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-theme-accent animate-pulse shadow-[0_0_10px_var(--accent-main)]" />
             <p className="text-[10px] font-mono text-theme-accent uppercase tracking-tighter w-48 truncate">{thoughts}</p>
          </div>
          <div className="flex items-center gap-4 text-theme-subtext">
             <Wifi size={12} className="text-theme-accent" />
             <div className="w-px h-3 bg-theme-border" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
       </div>
    </div>
  );
});

// --- PERFORMANCE OPTIMIZED VELOCITY TRACKER COMPONENT ---
const VelocityTracker = ({ mouseVelocity }: { mouseVelocity: MotionValue<number> }) => {
  const velocityRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [scanning, setScanning] = useState(false);

  // Use animation frame to update DOM directly
  useAnimationFrame(() => {
    const v = mouseVelocity.get();
    if (velocityRef.current) {
      velocityRef.current.textContent = String(Math.round(v));
    }
    if (barRef.current) {
      const width = Math.min((v / 12), 100); 
      barRef.current.style.width = `${width}%`;
    }
  });

  const toggleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <motion.div 
      variants={{ hidden: {opacity:0, scale:0.8, y:50}, show: {opacity:1, scale:1, y:0} }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="bento-card p-10 flex flex-col justify-between group overflow-hidden bg-gradient-to-br from-theme-accent-dim to-transparent"
    >
      <div className="absolute top-0 right-0 p-4">
          <Fingerprint size={60} className="text-theme-accent-dim group-hover:text-theme-accent hover:opacity-100 opacity-60 transition-colors" />
      </div>
      <div className="flex justify-between items-center relative z-10">
          <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-theme-subtext italic">User DNA</h4>
          <motion.div 
          whileTap={{ scale: 0.8 }}
          className={`p-2 rounded-full transition-all duration-500 ${scanning ? 'bg-theme-accent text-white shadow-[0_0_15px_var(--accent-main)]' : 'bg-theme-accent-dim text-theme-accent hover:bg-theme-accent hover:opacity-80'}`} onClick={toggleScan}
          >
            <Activity size={18} className={scanning ? 'animate-bounce' : 'animate-pulse'} />
          </motion.div>
      </div>
      <div className="space-y-6 relative z-10">
          <div>
            <p className="text-[9px] font-black text-theme-subtext uppercase mb-2">Input Velocity</p>
            <p className="text-4xl font-display font-black text-theme-accent">
              <span ref={velocityRef}>0</span>
              <span className="text-sm font-sans text-theme-subtext ml-2">px/s</span>
            </p>
          </div>
          <div className="h-1.5 w-full bg-theme-border rounded-full overflow-hidden">
            <div 
              ref={barRef}
              className="h-full bg-theme-gradient shadow-[0_0_20px_var(--accent-glow)] transition-all duration-75 ease-out will-change-[width]"
              style={{ width: '0%' }}
            />
          </div>
          <div className="flex justify-between items-end border-t border-theme-border pt-4">
            <div>
              <p className="text-[9px] font-black text-theme-subtext uppercase">Core Latency</p>
              <p className="text-sm font-bold font-mono text-theme-text">0.02ms</p>
            </div>
            <Zap size={20} className="text-theme-accent animate-pulse" />
          </div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [vibe, setVibe] = useState<'minimal' | 'maximal' | 'neural'>('neural');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  
  // High-performance mouse tracking using MotionValues
  const mouseVelocity = useMotionValue(0);

  // Scrollytelling Hooks for Page-Wide Effects
  const { scrollY, scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skewVelocity = useTransform(scrollVelocity, [-1000, 1000], [-10, 10]); 
  const smoothSkew = useSpring(skewVelocity, { stiffness: 400, damping: 30 }); 

  // --- SCROLLYTELLING COLOR MORPH ---
  // Shifts accent color based on scroll position (Emerald -> Blue -> Purple -> Rose)
  const accentColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#10b981", "#3b82f6", "#8b5cf6", "#f43f5e"]
  );
  
  // Create RGB string for CSS variable usage (e.g. for rgba())
  const accentColorRgb = useTransform(accentColor, (latest) => {
    const hex = latest.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `${r}, ${g}, ${b}`;
  });

  // Experience Section specific scroll
  const experienceRef = useRef(null);
  const { scrollYProgress: experienceProgress } = useScroll({ target: experienceRef, offset: ["start center", "end center"] });

  useEffect(() => {
    let lastX = 0, lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = now - lastTime;
      
      if (dt > 16) { 
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        const velocity = Math.round((dist / dt) * 1000);
        mouseVelocity.set(velocity);
        
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
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
  }, [mouseVelocity]);

  const dataTools = useMemo(() => {
    return SKILL_CATEGORIES.flatMap(cat => cat.skills);
  }, []);

  const experience = WORK_LOG;

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
  
  return (
    // Apply dynamic variables using style to the root
    <motion.div 
      style={{
        "--accent-main": accentColor,
        "--accent-rgb": accentColorRgb,
        // We dynamically reconstruct these derived variables in JS because CSS vars in style prop
        // don't automatically update calculated CSS vars in :root unless we use them directly.
        "--accent-dim": useMotionTemplate`rgba(${accentColorRgb}, 0.1)`,
        "--accent-glow": useMotionTemplate`rgba(${accentColorRgb}, 0.4)`,
      } as any}
      className={`theme-${vibe} min-h-screen bg-theme-bg text-theme-text selection:bg-theme-accent selection:text-white font-sans transition-colors duration-700 overflow-x-hidden`}
    >
      
      <ErrorBoundary fallback={<div className="fixed inset-0 bg-[#050505] -z-10" />}>
        <NeuralCanvas vibe={vibe} accentColor={accentColor} />
      </ErrorBoundary>
      
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
                className="w-14 h-14 bg-theme-accent rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_40px_var(--accent-glow)] cursor-pointer will-change-transform"
              >
                NS
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-theme-bg border-2 border-theme-accent rounded-full animate-pulse shadow-[0_0_10px_var(--accent-main)]" />
            </div>
            <div>
              <p className="font-display font-black text-3xl tracking-tighter uppercase italic leading-none text-theme-text">
                <KineticText text="NAVNEET.OS" delay={0.2} />
              </p>
              <div className="flex gap-2 mt-1">
                 <span className="text-[7px] font-black uppercase text-theme-subtext tracking-widest bg-theme-border px-2 py-0.5 rounded">Core 2.0.26</span>
                 <span className="text-[7px] font-black uppercase text-theme-accent tracking-widest bg-theme-accent-dim px-2 py-0.5 rounded animate-pulse">Live Uplink</span>
              </div>
            </div>
          </motion.div>
          
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={jellyConfig}
              className="hidden lg:flex items-center gap-3 px-5 py-2.5 bg-theme-card border border-theme-border rounded-2xl hover:bg-theme-accent-dim hover:border-theme-accent opacity-80 hover:opacity-100 transition-all cursor-pointer group" 
              onClick={() => setIsCommandOpen(true)}
            >
              <Command size={14} className="text-theme-subtext group-hover:text-theme-accent" />
              <span className="text-[10px] font-black uppercase text-theme-subtext group-hover:text-theme-text">Neural Search [⌘K]</span>
            </motion.div>
            
            <ErrorBoundary>
              <div className="flex bg-theme-card border border-theme-border rounded-2xl p-1.5 backdrop-blur-xl">
                {(['minimal', 'maximal', 'neural'] as const).map((v) => (
                  <motion.button 
                    key={v}
                    onClick={() => setVibe(v)}
                    whileTap={{ scale: 0.85 }}
                    transition={jellyConfig}
                    className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${vibe === v ? 'bg-theme-accent text-white shadow-lg shadow-theme-accent/20' : 'text-theme-subtext hover:text-theme-text'}`}
                  >
                    {v}
                  </motion.button>
                ))}
              </div>
            </ErrorBoundary>
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
               <Layers size={300} strokeWidth={0.5} className="animate-float text-theme-text" />
            </div>
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-theme-accent-dim border border-theme-accent rounded-2xl border-opacity-20">
                <BrainCircuit size={16} className="text-theme-accent animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-theme-accent">Cognitive Layer Active</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-[0.8] uppercase text-theme-text overflow-visible">
                <KineticText text="AI/ML" delay={0.4} /> <br/>
                <span className="text-transparent bg-clip-text bg-theme-gradient transition-all duration-1000">
                  <KineticText text="Architect" glow delay={0.6} />
                </span>
              </h1>
              <div className="space-y-4">
                <p className="text-theme-subtext text-xl max-w-xl font-medium leading-relaxed">
                  {PROFILE.summary}
                </p>
                
                {/* Mission Control Section - Tactile Interaction */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="mt-6 p-6 bg-gradient-to-r from-theme-accent-dim to-transparent rounded-2xl border border-theme-border backdrop-blur-sm relative overflow-hidden group/mission cursor-default"
                >
                    <div className="absolute inset-0 bg-theme-accent-dim translate-x-[-100%] group-hover/mission:translate-x-0 transition-transform duration-700 ease-out"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity size={16} className="text-theme-accent animate-pulse" />
                            <p className="text-theme-accent font-black text-[11px] tracking-widest uppercase">Mission Control</p>
                        </div>
                        <p className="text-theme-text opacity-80 text-sm font-medium leading-relaxed font-mono">{PROFILE.mission}</p>
                    </div>
                </motion.div>

                <p className="text-theme-accent text-[11px] font-black uppercase tracking-widest bg-theme-accent-dim px-4 py-2 rounded-xl inline-block border border-theme-accent shadow-[0_0_15px_var(--accent-dim)] border-opacity-20">
                  {PROFILE.currentStatus}
                </p>
              </div>
            </div>
            <div className="relative z-10 flex flex-wrap gap-5 mt-16">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, scaleX: 1.15, scaleY: 0.85 }}
                transition={jellyConfig}
                href={PROFILE.linkedIn} target="_blank" rel="noopener noreferrer"
                className="px-8 py-6 bg-theme-accent text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_-10px_var(--accent-glow)]"
              >
                <Fingerprint size={20} /> Identity Profile
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, scaleX: 1.15, scaleY: 0.85 }}
                transition={jellyConfig}
                href={PROFILE.github} target="_blank" rel="noopener noreferrer"
                className="px-8 py-6 bg-theme-card border border-theme-border text-theme-text font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-theme-bg hover:text-theme-text transition-all"
              >
                Logic Repos
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9, scaleX: 1.15, scaleY: 0.85 }}
                transition={jellyConfig}
                href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="px-8 py-6 bg-theme-card border border-theme-accent text-theme-accent font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-theme-accent hover:text-white transition-all flex items-center gap-4 border-opacity-30"
              >
                <Download size={20} /> Download Resume
              </motion.a>
            </div>
          </TiltCard>

          {/* PROJECT 1: RAG AI (Parallax Enabled) */}
          <TiltCard colSpan={2} rowSpan={2} delay={0.1} className="bento-card group flex flex-col p-0">
            <div className="scanline opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/95 z-20" />
            
            {/* Parallax Image Component */}
            <ParallaxImage 
              src={PROJECTS[0].imageUrl} 
              alt={PROJECTS[0].title} 
              className="absolute inset-0 z-0 opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
            />
            
            <div className="relative z-30 mt-auto p-12">
              <div className="flex gap-3 mb-6">
                 {PROJECTS[0].tags.map(t => <span key={t} className="glass-pill">{t}</span>)}
              </div>
              <h3 className="text-6xl font-display font-black uppercase tracking-tighter mb-5 text-white group-hover:text-glow-accent transition-all duration-700">
                <KineticText text={PROJECTS[0].title} />
              </h3>
              <p className="text-neutral-300 text-xl leading-relaxed max-w-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-8 group-hover:translate-y-0 duration-500">
                {PROJECTS[0].description}
              </p>
              <div className="mt-10 pt-10 border-t border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-theme-accent-dim rounded-lg">
                     <ShieldCheck size={20} className="text-theme-accent" />
                   </div>
                   <span className="text-[12px] font-black uppercase text-theme-accent tracking-[0.3em]">{PROJECTS[0].stat}</span>
                 </div>
                 <ArrowUpRight size={32} className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
          </TiltCard>

          {/* Velocity Tracker Component */}
          <VelocityTracker mouseVelocity={mouseVelocity} />

          {/* PROJECT 2: VidSnap AI (Gen-AI Product) */}
          <TiltCard delay={0.2} className="bento-card p-10 flex flex-col justify-between group">
             <div className="flex justify-between items-start relative z-10">
               <div className="w-16 h-16 bg-theme-card rounded-[2rem] flex items-center justify-center group-hover:bg-theme-accent group-hover:text-white transition-all shadow-xl border border-theme-border group-hover:border-theme-accent">
                 <Video size={28} />
               </div>
               <div className="text-right">
                 <p className="text-[24px] font-display font-black leading-none text-theme-accent text-glow-accent">2026</p>
                 <p className="text-[9px] font-black uppercase text-theme-subtext tracking-tighter mt-1">{PROJECTS[1].stat}</p>
               </div>
             </div>
             <div className="relative z-10 mt-6">
               <h4 className="text-2xl font-display font-black uppercase mb-2 text-theme-text"><KineticText text={PROJECTS[1].title} /></h4>
               <p className="text-[12px] text-theme-subtext leading-snug">{PROJECTS[1].description}</p>
             </div>
             <div className="pt-6 border-t border-theme-border flex gap-2 relative z-10 flex-wrap">
               {PROJECTS[1].tags.map(t => <span key={t} className="glass-pill">{t}</span>)}
             </div>
          </TiltCard>

          {/* PROJECT 3: Thrift by Musk (Web Performance Module) */}
          <TiltCard delay={0.3} className="bento-card p-10 flex flex-col justify-between group">
             <div className="flex justify-between items-center">
               <div className="p-3 bg-theme-accent-dim rounded-xl text-theme-accent group-hover:rotate-12 transition-transform">
                 {/* Swapped icon to Smartphone/Globe for Web Module */}
                 <Smartphone size={24} />
               </div>
               <div className="flex gap-1.5">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-4 bg-theme-border group-hover:bg-theme-accent opacity-60 transition-colors" style={{ transitionDelay: `${i*100}ms` }} />)}
               </div>
             </div>
             <div className="py-4">
               <p className="text-[10px] font-black uppercase text-theme-subtext mb-2">{PROJECTS[2].stat}</p>
               <h4 className="text-2xl font-display font-black uppercase leading-[1.1] text-theme-text"><KineticText text={PROJECTS[2].title} /></h4>
             </div>
             
             {/* Web Metrics Visualization instead of Code Snippet */}
             <div className="p-4 bg-black/40 border border-theme-border rounded-2xl relative overflow-hidden">
                <div className="flex justify-between items-end mb-2 relative z-10">
                    <span className="text-[10px] text-theme-subtext font-mono">CLS SCORE</span>
                    <span className="text-theme-accent font-black font-mono">0.00</span>
                </div>
                <div className="h-1 w-full bg-theme-border rounded-full mb-3">
                   <div className="h-full w-full bg-theme-accent rounded-full"></div>
                </div>
                <div className="flex justify-between items-end relative z-10">
                    <span className="text-[10px] text-theme-subtext font-mono">RETENTION</span>
                    <span className="text-theme-accent font-black font-mono">+30%</span>
                </div>
             </div>
          </TiltCard>

          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 bento-card flex flex-col justify-center py-12 overflow-hidden group"
          >
            <div className="px-12 mb-8 flex items-center justify-between">
              <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-theme-subtext italic">Synthetic Processing Array</h3>
              <div className="flex gap-2">
                 <Mic size={14} className="text-theme-subtext hover:text-theme-accent transition-colors cursor-pointer" />
                 <Sparkles size={16} className="text-theme-accent group-hover:rotate-180 transition-transform duration-[1.5s]" />
              </div>
            </div>
            <div className="relative overflow-hidden flex items-center h-20">
              {/* Velocity-based Skew Ticker */}
              <motion.div style={{ skewX: smoothSkew }} className="animate-ticker origin-center will-change-transform">
                {[...dataTools, ...dataTools].map((tool, i) => (
                  <div key={i} className="px-14 flex items-center gap-8">
                    <span className="text-5xl font-display font-black uppercase tracking-tighter text-theme-subtext opacity-20 group-hover:text-theme-text transition-all duration-700 cursor-default whitespace-nowrap hover:scale-125 hover:text-theme-accent">
                      {tool}
                    </span>
                    <div className="w-3 h-3 bg-theme-accent-dim rounded-full border border-theme-accent border-opacity-30" />
                  </div>
                ))}
              </motion.div>
              <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-theme-card to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-theme-card to-transparent z-10" />
            </div>
          </motion.div>

          <motion.a 
            href={PROFILE.youtube} target="_blank" rel="noopener noreferrer"
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            transition={jellyConfig}
            className="bento-card p-10 flex flex-col justify-between group hover:border-red-500 hover:border-opacity-40 relative"
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
               <p className="text-[10px] font-black uppercase text-theme-subtext mb-2 tracking-[0.2em]">Broadcast Array</p>
               <h4 className="text-3xl font-display font-black uppercase leading-[0.9] text-theme-text group-hover:text-glow-red transition-all">Coding With <br/> Navneet</h4>
             </div>
             <ArrowUpRight size={24} className="text-theme-subtext group-hover:text-theme-text transition-colors self-end mt-4" />
          </motion.a>

          {/* EXPERIENCE LOG (TIMELINE) WITH STICKY HEADERS */}
          <motion.div 
            ref={experienceRef}
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="md:row-span-2 bento-card p-0 flex flex-col group relative bg-theme-card rounded-3xl border border-theme-border overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 flex items-center gap-4 sticky top-0 z-30 bg-theme-card/95 backdrop-blur-xl border-b border-theme-border">
               <Award size={28} className="text-theme-accent" />
               <h3 className="text-2xl font-display font-black uppercase tracking-tighter italic text-theme-text">Experience Log</h3>
            </div>
            
            {/* Scrollable Content Area */}
            <div className="relative p-8 pt-0 flex-1 overflow-visible">
               {/* Scroll Circuit Line */}
               <div className="absolute left-[54px] top-4 bottom-10 w-[2px] bg-theme-border z-0">
                  <motion.div 
                    style={{ height: useTransform(experienceProgress, [0, 1], ["0%", "100%"]) }}
                    className="w-full bg-theme-accent shadow-[0_0_15px_var(--accent-glow)] origin-top"
                  />
               </div>
               
               {experience.map((exp, idx) => (
                 <motion.div 
                   key={idx} 
                   className="relative pl-12 py-8 group/item"
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true, margin: "-10%" }}
                   transition={{ delay: idx * 0.1 }}
                 >
                    {/* Sticky Date Header */}
                    <div className="sticky top-20 z-20 flex items-center -ml-16 mb-6">
                         <div className={`w-5 h-5 rounded-full border-4 border-theme-card relative z-10 ${exp.active ? 'bg-theme-accent' : 'bg-theme-border group-hover:bg-theme-accent opacity-60 transition-colors'}`} />
                         <div className="ml-10 bg-theme-card/90 backdrop-blur-xl px-4 py-1.5 rounded-lg border border-theme-border text-theme-accent font-mono text-[10px] font-bold tracking-widest shadow-xl">
                            {exp.date}
                         </div>
                    </div>

                    {/* Content */}
                    <div className="bg-theme-bg/30 p-6 rounded-2xl border border-theme-border hover:border-theme-accent hover:border-opacity-20 transition-all hover:bg-theme-bg/50">
                       <p className="text-[10px] font-black uppercase text-theme-subtext mb-2 tracking-[0.2em]">{exp.inst}</p>
                       <h5 className="text-xl font-bold leading-tight uppercase mb-3 text-theme-text">{exp.role}</h5>
                       <p className="text-xs text-theme-subtext leading-relaxed font-light">{exp.log}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
          </motion.div>

          {/* VISUAL TRACE (INSTAGRAM) */}
          <motion.a 
            href={PROFILE.instagram} target="_blank" rel="noopener noreferrer"
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}
            className="p-10 flex flex-col justify-between group overflow-hidden bg-theme-card border border-pink-500/10 rounded-3xl relative backdrop-blur-3xl transition-all duration-300 cursor-pointer perspective-1000 shadow-xl shadow-black/5"
            style={{ transformStyle: 'preserve-3d' }}
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/10 via-[#dc2743]/10 to-[#bc1888]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             <div className="flex justify-between items-start relative z-10">
               <div className="p-4 bg-pink-500/10 rounded-[2rem] text-pink-500 group-hover:scale-110 group-hover:rotate-12 transition-all">
                 <Instagram size={36} />
               </div>
               <Camera size={20} className="text-theme-subtext group-hover:text-pink-400 transition-colors" />
             </div>
             <div className="relative z-10 mt-6">
               <p className="text-[10px] font-black uppercase text-theme-subtext mb-2 tracking-[0.2em]">Visual Trace</p>
               <h4 className="text-3xl font-display font-black uppercase leading-none text-theme-text group-hover:text-glow-pink">Life @ <br/> Noida</h4>
             </div>
          </motion.a>

          {/* GITHUB CITY (TRUST SIGNALS) */}
          <motion.div 
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="bento-card p-10 flex flex-col justify-center text-center group bg-theme-accent-dim border border-theme-accent border-opacity-20 overflow-hidden rounded-3xl relative"
          >
            <GithubCityBetter />
            <div className="relative mx-auto mb-6 z-10">
               <div className="p-3 bg-theme-card border border-theme-border rounded-2xl shadow-xl">
                  <Github size={32} className="text-theme-accent" />
               </div>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.5em] text-theme-accent relative z-10">Trust Signals</p>
            <p className="text-3xl font-display font-black text-theme-text mt-2 uppercase italic tracking-tighter relative z-10">Github Activity</p>
          </motion.div>

          {/* GLITCH REVEAL CERTIFICATIONS */}
           <motion.div 
            variants={{ hidden: {opacity:0, y:20}, show: {opacity:1, y:0} }}
            className="md:col-span-2 bento-card p-10 flex flex-col group bg-theme-card rounded-3xl border border-theme-border relative overflow-hidden"
          >
             <div className="flex justify-between items-end mb-8 border-b border-theme-border pb-4">
               <div>
                  <h3 className="text-xl font-display font-black uppercase tracking-tight mb-1 text-theme-text">Certifications</h3>
                  <p className="text-[10px] font-mono text-theme-accent uppercase">Verified Credentials</p>
               </div>
               <Award size={20} className="text-theme-subtext" />
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
                className="w-full max-w-2xl bg-theme-card border border-theme-border rounded-[2rem] p-10 shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-8 border-b border-theme-border pb-4">
                   <Terminal size={24} className="text-theme-accent" />
                   <input autoFocus aria-label="Search commands" placeholder="Search..." className="bg-transparent text-2xl font-bold w-full outline-none text-theme-text placeholder:text-theme-subtext" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <a href={PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-theme-bg/50 rounded-xl hover:bg-theme-accent hover:text-white transition-colors flex items-center gap-3 text-theme-text">
                      <Download size={18} /> <span className="font-bold text-sm">Download Resume</span>
                   </a>
                   <a href={PROFILE.linkedIn} target="_blank" rel="noopener noreferrer" className="p-4 bg-theme-bg/50 rounded-xl hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-3 text-theme-text">
                      <Linkedin size={18} /> <span className="font-bold text-sm">LinkedIn</span>
                   </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-40 pt-20 border-t border-theme-border flex flex-col md:flex-row justify-between items-center gap-16 mb-24">
           <div className="flex flex-col gap-10 w-full md:w-auto">
             <div className="max-w-md">
                <p className="text-sm text-theme-subtext italic font-medium leading-relaxed mb-6">"The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore all progress depends on the unreasonable man." — George Bernard Shaw</p>
             </div>
             <div className="flex flex-wrap justify-center md:justify-start gap-12">
                <motion.div 
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-4 text-theme-subtext hover:text-theme-accent transition-colors cursor-pointer"
                >
                  <Mail size={18} className="text-theme-accent" />
                  <span className="text-[11px] font-black uppercase tracking-widest">{PROFILE.email}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center gap-4 text-theme-subtext hover:text-theme-accent transition-colors cursor-pointer"
                >
                  <MessageCircle size={18} className="text-theme-accent" />
                  <a href={PROFILE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[11px] font-black uppercase tracking-widest">Connect on WhatsApp</a>
                </motion.div>
             </div>

             <div className="flex flex-wrap justify-center md:justify-start gap-6">
               <motion.a 
                 href={PROFILE.youtube} 
                 target="_blank" rel="noopener noreferrer"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-theme-card rounded-full text-theme-subtext hover:text-red-500 hover:bg-red-500/10 transition-colors"
               >
                 <Youtube size={20} />
               </motion.a>
               <motion.a 
                 href={PROFILE.instagram} 
                 target="_blank" rel="noopener noreferrer"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-theme-card rounded-full text-theme-subtext hover:text-pink-500 hover:bg-pink-500/10 transition-colors"
               >
                 <Instagram size={20} />
               </motion.a>
               <motion.a 
                 href={PROFILE.github} 
                 target="_blank" rel="noopener noreferrer"
                 whileHover={{ y: -3, scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 className="p-3 bg-theme-card rounded-full text-theme-subtext hover:text-theme-text hover:bg-theme-bg transition-colors"
               >
                 <Github size={20} />
               </motion.a>
             </div>
           </div>

           <div className="text-center md:text-right w-full md:w-auto">
             <p className="text-[11px] font-black uppercase text-theme-subtext tracking-[1.5em] mb-4">SYSTEM ID: {PROFILE.systemId}</p>
             <div className="flex flex-col items-center md:items-end gap-1">
                <p className="text-[9px] font-mono text-theme-subtext uppercase tracking-widest leading-none">Navneet_Sharma_2.0.exe --status=optimal</p>
                <div className="flex gap-2 mt-2">
                   <span className="w-1.5 h-1.5 bg-theme-accent/20 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-theme-accent/40 rounded-full" />
                   <span className="w-1.5 h-1.5 bg-theme-accent/60 rounded-full animate-pulse shadow-[0_0_5px_var(--accent-main)]" />
                </div>
             </div>
           </div>
        </footer>

      </main>
    </motion.div>
  );
};

export default App;