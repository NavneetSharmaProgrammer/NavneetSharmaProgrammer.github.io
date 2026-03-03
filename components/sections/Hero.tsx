
import { Download, Github, BrainCircuit } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { PROFILE } from '../../constants';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="h-full min-h-[600px] flex flex-col relative group">
      {/* Background Pulse Glow */}
      <motion.div 
         className="absolute -inset-10 bg-emerald-500/5 rounded-[5rem] blur-[100px] z-0"
         animate={{ opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <TiltCard className="h-full flex flex-col justify-between p-16 glass-card border-emerald-500/10 relative z-10 overflow-visible">
        
        {/* Header - Status Indicator */}
        <motion.div 
          className="flex justify-between items-start"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
           <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute inset-0" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full relative" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-emerald-500 font-bold">Node: Active</span>
           </div>
           <div className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">
             Lat: 28.5355 // Long: 77.3910
           </div>
        </motion.div>

        {/* Core Content */}
        <div className="mt-12 relative">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="font-serif italic text-2xl text-emerald-500/60 mb-4 block">Engineering</span>
            <h1 className="text-7xl md:text-9xl font-display font-black uppercase tracking-tighter leading-[0.8] text-white">
              Data<br/>
              <span className="text-glow">Driven.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            className="mt-12 space-y-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <p className="font-mono text-xs md:text-sm text-zinc-400 leading-relaxed tracking-wide">
              Specializing in <span className="text-white font-bold">Python Backend Architecture</span> and 
              <span className="text-white font-bold"> Machine Learning Pipelines</span>. 
              Translating raw data into actionable business intelligence through high-fidelity engineering.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              <span className="font-mono text-[8px] text-zinc-600 uppercase tracking-[0.5em]">Production Ready</span>
            </div>
          </motion.div>
        </div>

        {/* Footer Actions */}
        <motion.div 
          className="flex flex-wrap gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
           <motion.a 
             href={PROFILE.resumeUrl} target="_blank"
             className="interactive px-10 py-5 bg-emerald-500 text-black font-black font-mono text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all flex items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
             whileHover={{ scale: 1.05, y: -5 }}
             whileTap={{ scale: 0.95 }}
           >
              <Download size={16} /> Download Dossier
           </motion.a>
           <motion.a 
             href={PROFILE.github} target="_blank"
             className="interactive px-10 py-5 border border-white/10 text-white font-black font-mono text-[10px] uppercase tracking-[0.2em] rounded-full hover:bg-white/5 transition-all flex items-center gap-4 backdrop-blur-md"
             whileHover={{ scale: 1.05, y: -5 }}
             whileTap={{ scale: 0.95 }}
           >
              <Github size={16} /> Source Code
           </motion.a>
        </motion.div>

        {/* Large Background Text */}
        <div className="absolute -bottom-10 -right-10 opacity-[0.02] font-display font-black text-[20rem] leading-none pointer-events-none select-none">
          DS
        </div>

      </TiltCard>
    </div>
  );
};
