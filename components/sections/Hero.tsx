
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Download, Github, Linkedin, Youtube, Instagram, MessageSquare, Activity, Terminal, ExternalLink, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../constants';
import { TiltCard } from '../ui/TiltCard';

const Typewriter = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let timeout: any;
    let interval: any;
    let currentText = '';
    let index = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          currentText += text[index];
          setDisplayText(currentText);
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span className="font-mono">
      {displayText}
      {!isComplete && (
        <motion.span 
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block ml-0.5 text-emerald-500"
        >
          █
        </motion.span>
      )}
    </span>
  );
};

const DecodeText = ({ targetText, initialScramble, delay = 0, onComplete }: { targetText: string; initialScramble: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState(initialScramble);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let timeout: any;
    let interval: any;

    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(prev => 
          prev.split('').map((char, index) => {
            if (index < iteration) {
              return targetText[index] || '';
            }
            return characters[Math.floor(Math.random() * characters.length)];
          }).join('').slice(0, Math.max(targetText.length, initialScramble.length))
        );
        
        if (iteration >= targetText.length) {
          clearInterval(interval);
          if (onCompleteRef.current) onCompleteRef.current();
        }
        
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [targetText, initialScramble, delay]);

  return <span>{displayText}</span>;
};

const SystemMetric = ({ label, value, color = "emerald" }: { label: string; value: string; color?: string }) => {
  const colorMap: Record<string, string> = {
    emerald: 'text-emerald-500 bg-emerald-500/40',
    cyan: 'text-cyan-500 bg-cyan-500/40',
    purple: 'text-purple-500 bg-purple-500/40',
    amber: 'text-amber-500 bg-amber-500/40'
  };
  
  const activeColor = colorMap[color] || colorMap.emerald;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-end">
        <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">{label}</span>
        <span className={`font-mono text-[10px] font-bold ${activeColor.split(' ')[0]}`}>{value}</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          className={`h-full absolute left-0 top-0 ${activeColor.split(' ')[1]}`}
          animate={{ width: ["20%", "85%", "40%", "95%", "60%"] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

const TerminalLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const logPool = [
    "Initializing neural pathways...",
    "Syncing vector database...",
    "Optimizing RAG pipeline...",
    "Establishing secure handshake...",
    "Loading model weights...",
    "Compiling kernel modules...",
    "Handshaking with remote node...",
    "Memory allocation stable.",
    "CPU cycles optimized.",
    "Bypassing firewall...",
    "Accessing encrypted dossier...",
    "Neural link established.",
    "Vector space mapped.",
    "RAG context window: 128k tokens.",
    "Model: Gemini 3.1 Pro Preview."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-4), logPool[Math.floor(Math.random() * logPool.length)]]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[8px] text-zinc-700 space-y-1">
      {logs.map((log, i) => (
        <div key={i} className="flex gap-2">
          <span className="text-emerald-500/20">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
          <span className="animate-pulse">{log}</span>
        </div>
      ))}
    </div>
  );
};

const Radar = () => (
  <div className="relative w-12 h-12 border border-emerald-500/20 rounded-full overflow-hidden">
    <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-50" />
    <div className="absolute inset-0 border border-emerald-500/10 rounded-full scale-75" />
    <motion.div 
      className="absolute top-1/2 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-emerald-500 origin-left"
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-emerald-500 rounded-full shadow-[0_0_5px_#10b981]" />
  </div>
);

const NeuralWave = () => (
  <div className="flex items-end gap-0.5 h-4">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-1 bg-emerald-500/30 rounded-full"
        animate={{ 
          height: [4, 16, 8, 12, 4],
          opacity: [0.2, 0.5, 0.3, 0.6, 0.2]
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
);

const SystemIdentity = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">System Identity</span>
          <span className="font-mono text-[9px] text-zinc-600">
            {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC-8
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Radar />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-md">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full relative shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-emerald-500 font-bold">Node: Active</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">{PROFILE.location}</span>
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">28.5355° N // 77.3910° E</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Neural Link</span>
          <NeuralWave />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Signal Strength</span>
          <div className="flex items-end gap-1 h-4">
            {[1, 2, 3, 4, 5].map(i => (
              <motion.div 
                key={i} 
                className={`w-1 rounded-full ${i <= 4 ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-zinc-800'}`} 
                initial={{ height: 0 }}
                animate={{ height: `${i * 20}%` }}
                transition={{ delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showStatus, setShowStatus] = useState(false);

  const handleStep1 = useCallback(() => setStep(1), []);
  const handleStep2 = useCallback(() => setStep(2), []);
  const handleStep3 = useCallback(() => setStep(3), []);
  const handleStep4 = useCallback(() => setStep(4), []);

  useEffect(() => {
    if (step === 4) { // After "Driven." slams in
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowStatus(true);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
    <div className="h-full min-h-[700px] flex flex-col relative group">
      {/* CRT Scanline Overlay */}
      <div className="scanline opacity-20" />
      <div className="crt-overlay opacity-10" />

      {/* Background Pulse Glow */}
      <motion.div 
         className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/5 via-cyan-500/5 to-purple-500/5 rounded-[5rem] blur-[100px] z-0"
         animate={{ 
           opacity: [0.3, 0.6, 0.3],
           rotate: [0, 5, 0]
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Neural Link Visualization */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(10)].map((_, i) => (
            <motion.path
              key={i}
              d={`M ${-100 + i * 50} ${100 + i * 100} Q ${400 + i * 50} ${300 + i * 50} ${1200 + i * 50} ${100 + i * 100}`}
              stroke="url(#linkGradient)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0],
                x: [0, 100, 0]
              }}
              transition={{ 
                duration: 5 + i, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </svg>
      </div>

      <TiltCard className="min-h-full flex flex-col justify-between p-6 sm:p-10 md:p-16 glass-card border-emerald-500/10 relative z-10">
        
        {/* Header - Status Indicator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-white/5 pb-10 mb-10 relative">
           {/* Left Side: System Identity */}
           <SystemIdentity />

           {/* Center: Live Terminal Logs */}
           <div className="hidden lg:flex flex-col gap-2 border-x border-white/5 px-8">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em] mb-1">Live Activity Log</span>
              <TerminalLogs />
           </div>

           {/* Right Side: Metrics & Socials */}
           <div className="flex flex-col gap-6 lg:pl-4">
              {/* Live Metrics Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <SystemMetric label="Memory Usage" value="4.2GB / 16GB" />
                <SystemMetric label="CPU Load" value="12.4%" />
                <SystemMetric label="Network" value="842 Mbps" color="cyan" />
                <SystemMetric label="Uptime" value="14d 02h" color="purple" />
              </div>

              {/* Social Matrix */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]">External Nodes</span>
                  <span className="font-mono text-[8px] text-zinc-700 uppercase">v3.4.0-STABLE</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Linkedin, href: PROFILE.linkedIn, label: "LinkedIn" },
                    { icon: Github, href: PROFILE.github, label: "GitHub" },
                    { icon: Youtube, href: PROFILE.youtube, label: "YouTube" },
                    { icon: Instagram, href: PROFILE.instagram, label: "Instagram" },
                    { icon: MessageSquare, href: PROFILE.whatsapp, label: "WhatsApp" },
                    { icon: FileText, href: `mailto:${PROFILE.email}`, label: "Email" },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group/icon relative"
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <social.icon size={16} />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-black text-[10px] font-mono font-bold rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {social.label}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
           </div>
        </div>

        {/* Core Content */}
        <div className="mt-4 relative flex-1">
          <div className="flex flex-col gap-2 mb-8 sm:mb-12 p-4 bg-black/20 border border-white/5 rounded-lg font-mono relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <Terminal size={40} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500/50 text-sm">$</span>
              <div className="text-sm text-emerald-500 uppercase tracking-[0.2em] font-bold min-h-[1rem]">
                <Typewriter text="whoami --profile navneet" onComplete={handleStep1} />
              </div>
            </div>
            {step >= 1 && (
              <div className="flex flex-col gap-1 pl-4 border-l border-emerald-500/20 mt-1">
                <span className="text-sm text-white uppercase tracking-widest font-bold">User: {PROFILE.name} 👋</span>
                <div className="text-sm text-zinc-400 uppercase tracking-[0.2em] min-h-[1rem]">
                  <Typewriter text={`Role: ${PROFILE.role}`} onComplete={handleStep2} />
                </div>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tighter leading-[0.9] text-white">
            <div className="h-[1.4em] flex items-center whitespace-nowrap">
              {step >= 2 && (
                <span className="gradient-text">
                  <DecodeText 
                    targetText="Engineering." 
                    initialScramble="EngiZ6^7O0(@" 
                    onComplete={handleStep3} 
                  />
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-x-6 items-center">
              <AnimatePresence>
                {step >= 3 && (
                  <motion.span 
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    onAnimationComplete={handleStep4}
                    className="gradient-text-alt"
                  >
                    Data.
                  </motion.span>
                )}
                {step >= 4 && (
                  <motion.span 
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="text-glow-neon text-emerald-400"
                  >
                    Driven.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </h1>

          <motion.div 
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-sm text-zinc-500 border-y border-white/5 py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-zinc-700 uppercase tracking-widest">System Metrics:</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500/50">Neural Load:</span>
              <span className="text-white">14.2%</span>
            </div>
            <span className="text-zinc-800">|</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500/50">Query Latency:</span>
              <span className="text-white">42ms</span>
            </div>
            <span className="text-zinc-800">|</span>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500/50">Uptime:</span>
              <span className="text-white">99.99%</span>
            </div>
          </motion.div>

          <motion.div 
            className="mt-8 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 4 ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between max-w-xs font-mono text-sm text-zinc-500 uppercase tracking-widest">
                <span>Vector_Space.exe</span>
                {showStatus && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 1] }}
                    transition={{ duration: 0.5, times: [0, 0.2, 0.4, 1] }}
                    className="text-emerald-500 font-bold"
                  >
                    Production Ready | Verified Deployment
                  </motion.span>
                )}
              </div>
              <div className="w-full max-w-xs h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Actions */}
         <motion.div 
           className="flex flex-wrap gap-4 sm:gap-8 mt-12 sm:mt-16 font-mono text-sm uppercase tracking-[0.3em]"
           initial={{ opacity: 0 }}
           animate={{ opacity: step >= 4 ? 1 : 0 }}
           transition={{ delay: 0.5 }}
         >
            <button 
              onClick={() => document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' })}
              aria-label="Scroll to projects section"
              className="group relative px-4 py-2 text-emerald-500 transition-all duration-300"
            >
               <span className="absolute left-0 top-0 text-lg transition-all duration-300 group-hover:-translate-x-2">[</span>
               <span className="mx-2 group-hover:text-glow-neon group-hover:animate-flicker">Explore Active Nodes</span>
               <span className="absolute right-0 top-0 text-lg transition-all duration-300 group-hover:translate-x-2">]</span>
            </button>

            <span className="hidden sm:block text-zinc-800 self-center">//</span>

            <a 
              href={PROFILE.resumeUrl} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume PDF"
              className="group relative px-4 py-2 text-white transition-all duration-300"
            >
               <span className="absolute left-0 top-0 text-lg transition-all duration-300 group-hover:-translate-x-2">[</span>
               <span className="mx-2 group-hover:text-glow-neon group-hover:animate-flicker">Download Dossier (PDF)</span>
               <span className="absolute right-0 top-0 text-lg transition-all duration-300 group-hover:translate-x-2">]</span>
            </a>

            <span className="hidden sm:block text-zinc-800 self-center">//</span>

            <a 
              href={PROFILE.github} 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="group relative px-4 py-2 text-white transition-all duration-300"
            >
               <span className="absolute left-0 top-0 text-lg transition-all duration-300 group-hover:-translate-x-2">[</span>
               <span className="mx-2 group-hover:text-glow-neon group-hover:animate-flicker">Source Code (GitHub)</span>
               <span className="absolute right-0 top-0 text-lg transition-all duration-300 group-hover:translate-x-2">]</span>
            </a>
         </motion.div>

        {/* Large Background Text */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.02] font-display font-black text-[20rem] leading-none pointer-events-none select-none">
          AI
        </div>

      </TiltCard>
    </div>
  );
};
