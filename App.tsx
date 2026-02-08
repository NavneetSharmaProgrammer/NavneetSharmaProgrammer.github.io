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
import { PROFILE, PROJECTS, SKILL_CATEGORIES, CERTIFICATIONS, Project } from './constants';

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
      className="bento-card spotlight-card group flex flex-col p-0 perspective-1000 relative bg-neutral-900 overflow-hidden rounded-xl border border-white/10"
    >
      <div className="absolute inset-0 z-0 bg-neutral-900 h-48 overflow-hidden">
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
              layoutId={`img-${project.id}`}
              src={project.imageUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent opacity-90" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full justify-end mt-32">
        <div className="flex justify-between items-start mb-2">
           <div className="space-y-1">
             <h3 className="text-2xl font-bold font-display tracking-tight text-white">{project.title}</h3>
             <p className="text-emerald-400 font-mono text-xs">{project.stat || "SYSTEM ONLINE"}</p>
           </div>
           <ArrowUpRight className="text-white/50 group-hover:text-emerald-400 transition-colors" />
        </div>
        
        <p className="text-neutral-400 text-sm mb-4 line-clamp-3 group-hover:text-neutral-200 transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded text-xs text-neutral-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-neutral-950 min-h-screen text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <NeuralCanvas vibe="neural" />
      
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

      <main className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col justify-center mb-32">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-emerald-500 font-mono text-sm mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              {PROFILE.currentStatus}
            </div>

            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter leading-tight">
              <HyperText text="NAVNEET" className="block" glow />
              <span className="text-neutral-500">SHARMA</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light">
                {PROFILE.summary}
              </p>
            </div>

            <div className="flex gap-4 pt-8">
              <Magnetic>
                <a href={PROFILE.linkedIn} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-4 bg-emerald-500 text-neutral-950 font-bold rounded-full hover:bg-emerald-400 transition-colors">
                  Resume <Download className="w-4 h-4" />
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-display font-bold">Featured Architecture</h2>
            <div className="text-right hidden md:block">
              <p className="text-neutral-500 font-mono text-sm">SELECTED WORKS 2024-2025</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* Skills Bento */}
        <section className="mb-32">
          <h2 className="text-4xl font-display font-bold mb-12">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div 
                key={cat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.07] transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-emerald-400">{cat.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map(skill => (
                    <span key={skill} className="text-sm text-neutral-300 font-mono px-2 py-1 bg-black/20 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications */}
         <section className="mb-32">
          <h2 className="text-4xl font-display font-bold mb-12">Certifications</h2>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-6 bg-neutral-900/50 border-l-2 border-emerald-500 rounded-r-xl"
              >
                <div>
                  <h3 className="text-lg font-bold">{cert.title}</h3>
                  <p className="text-neutral-400">{cert.issuer}</p>
                </div>
                <span className="font-mono text-emerald-500/80">{cert.date}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-20 border-t border-white/10">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Initialize Communication</h2>
              <p className="text-neutral-400 mb-8 max-w-md">
                Ready to architect the next generation of AI solutions? My neural networks are open for connection.
              </p>
              <div className="flex flex-col gap-4">
                <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-3 text-lg hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" /> {PROFILE.email}
                </a>
                <a href={`tel:${PROFILE.phone}`} className="flex items-center gap-3 text-lg hover:text-emerald-400 transition-colors">
                  <Settings className="w-5 h-5" /> {PROFILE.phone}
                </a>
                <div className="flex items-center gap-3 text-lg text-neutral-500">
                  <MapPin className="w-5 h-5" /> {PROFILE.location}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-end items-end">
              <div className="text-right mb-8">
                <p className="font-mono text-emerald-500 mb-2">SYSTEM ID: {PROFILE.systemId}</p>
                <p className="text-neutral-600 text-sm">© 2025 NAVNEET SHARMA. ALL RIGHTS RESERVED.</p>
              </div>
              <div className="flex gap-4">
                 <a href={PROFILE.youtube} className="p-3 bg-white/5 rounded-full hover:bg-red-500/20 hover:text-red-500 transition-colors"><Youtube className="w-5 h-5" /></a>
                 <a href={PROFILE.instagram} className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 hover:text-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                 <a href={PROFILE.whatsapp} className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 hover:text-green-500 transition-colors"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
