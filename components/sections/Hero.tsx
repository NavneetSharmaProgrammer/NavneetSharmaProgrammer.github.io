
import React, { useState, useEffect, useRef } from 'react';
import { Download, Github, Linkedin, Youtube, Instagram, MessageSquare, Activity, Terminal, ExternalLink, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROFILE } from '../../constants';
import { TiltCard } from '../ui/TiltCard';

const Typewriter = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: any;
    let currentText = '';
    let index = 0;

    timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < text.length) {
          currentText += text[index];
          setDisplayText(currentText);
          index++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return (
    <span className="font-mono">
      {displayText}
      {!isComplete && <span className="animate-pulse">█</span>}
    </span>
  );
};

const DecodeText = ({ targetText, initialScramble, delay = 0, onComplete }: { targetText: string; initialScramble: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState(initialScramble);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

  useEffect(() => {
    let timeout: any;
    timeout = setTimeout(() => {
      let iteration = 0;
      const interval = setInterval(() => {
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
          if (onComplete) onComplete();
        }
        
        iteration += 1 / 3;
      }, 30);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [targetText, initialScramble, delay, onComplete]);

  return <span>{displayText}</span>;
};

export const Hero = () => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showStatus, setShowStatus] = useState(false);

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
         className="absolute -inset-10 bg-emerald-500/5 rounded-[5rem] blur-[100px] z-0"
         animate={{ opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <TiltCard className="h-full flex flex-col justify-between p-6 sm:p-10 md:p-16 glass-card border-emerald-500/10 relative z-10 overflow-hidden">
        
        {/* Header - Status Indicator */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0 border-b border-white/5 pb-8 mb-8">
           <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1 mb-2">
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">System: Operational</span>
                <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">Neural Link Established</span>
                <span className="font-mono text-[8px] text-emerald-500/60 uppercase tracking-widest font-bold">Core Version: v3.4.0-STABLE</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full relative shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500 font-bold animate-flicker">Node: Active</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-widest">Lat: 28.5355 // Long: 77.3910</span>
              </div>
           </div>
           
           <div className="flex flex-col items-end gap-4">
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-end">
                 {[
                   { icon: Linkedin, href: PROFILE.linkedIn, label: "LinkedIn Profile" },
                   { icon: Github, href: PROFILE.github, label: "GitHub Profile" },
                   { icon: Youtube, href: PROFILE.youtube, label: "YouTube Channel" },
                   { icon: Instagram, href: PROFILE.instagram, label: "Instagram Profile" },
                   { icon: MessageSquare, href: PROFILE.whatsapp, label: "WhatsApp Contact" },
                   { icon: FileText, href: `mailto:${PROFILE.email}`, label: "Email Transmission" },
                 ].map((social, i) => (
                   <motion.a
                     key={i}
                     href={social.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     aria-label={social.label}
                     className="p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-full text-zinc-500 hover:text-emerald-500 hover:border-emerald-500/30 transition-all relative group/icon"
                     whileHover={{ scale: 1.1, y: -2 }}
                   >
                     <social.icon size={14} />
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-emerald-500 text-black text-[8px] font-mono font-bold rounded opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                       {social.label.split(' ')[0]}
                     </div>
                   </motion.a>
                 ))}
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex flex-col items-end">
                    <span className="font-mono text-[7px] text-zinc-700 uppercase tracking-widest">Memory Usage</span>
                    <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                       <motion.div 
                         className="h-full bg-emerald-500/40"
                         animate={{ width: ["40%", "65%", "40%"] }}
                         transition={{ duration: 4, repeat: Infinity }}
                       />
                    </div>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="font-mono text-[7px] text-zinc-700 uppercase tracking-widest">CPU Load</span>
                    <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden mt-1">
                       <motion.div 
                         className="h-full bg-emerald-500/40"
                         animate={{ width: ["20%", "45%", "20%"] }}
                         transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                       />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Core Content */}
        <div className="mt-4 relative flex-1">
          <div className="flex flex-col gap-2 mb-8 sm:mb-12 p-4 bg-black/20 border border-white/5 rounded-lg font-mono">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500/50 text-[10px]">$</span>
              <div className="text-[10px] text-emerald-500 uppercase tracking-[0.2em] font-bold h-4">
                <Typewriter text={`whoami --profile ${PROFILE.name.split(' ')[0].toLowerCase()}`} onComplete={() => setStep(1)} />
              </div>
            </div>
            {step >= 1 && (
              <div className="flex flex-col gap-1 pl-4 border-l border-emerald-500/20 mt-1">
                <span className="text-[10px] text-white uppercase tracking-widest font-bold">User: {PROFILE.name} 👋</span>
                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] h-4">
                  <Typewriter text={`Role: ${PROFILE.role}`} onComplete={() => setStep(2)} />
                </div>
              </div>
            )}
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-[0.85] text-white">
            <div className="h-[1.1em] overflow-hidden">
              {step >= 2 && (
                <DecodeText 
                  targetText="Engineering." 
                  initialScramble="EngiZ6^7O0(@" 
                  onComplete={() => setStep(3)} 
                />
              )}
            </div>
            <div className="flex flex-wrap gap-x-8">
              <AnimatePresence>
                {step >= 3 && (
                  <motion.span 
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    onAnimationComplete={() => setStep(4)}
                  >
                    Data.
                  </motion.span>
                )}
                {step >= 4 && (
                  <motion.span 
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 12, delay: 0.2 }}
                    className="text-glow-neon text-emerald-500"
                  >
                    Driven.
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </h1>

          <motion.div 
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] text-zinc-500 border-y border-white/5 py-4"
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
            <p className="font-mono text-sm md:text-base text-zinc-400 leading-relaxed tracking-tight border-l-2 border-emerald-500/20 pl-6">
              {PROFILE.about}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between max-w-xs font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
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
           className="flex flex-wrap gap-4 sm:gap-8 mt-12 sm:mt-16 font-mono text-[10px] uppercase tracking-[0.3em]"
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
