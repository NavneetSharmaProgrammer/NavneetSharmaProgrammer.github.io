import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../constants';

export const TechStackManifest: React.FC = () => {
  const skills = useMemo(() => SKILL_CATEGORIES.flatMap(cat => cat.skills), []);

  return (
    <div className="w-full py-12 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4 opacity-40 px-4">
        <span className="font-mono text-[10px] tracking-[0.4em] text-emerald-500 uppercase">/// TECH_STACK_MODULE.EXE ///</span>
      </div>

      {/* Marquee Container */}
      <div className="w-full relative overflow-hidden bg-emerald-500 text-black rounded-[3rem] sm:rounded-[4rem] py-8 md:py-16 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
        {/* Grainy Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <motion.div 
          className="flex whitespace-nowrap items-center gap-12 md:gap-24 relative z-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 40, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...skills, ...skills].map((skill, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-12 group cursor-default">
              <motion.span 
                className="font-display font-black text-4xl md:text-8xl uppercase tracking-tighter"
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              >
                {skill}
              </motion.span>
              <Zap className="fill-black w-8 h-8 md:w-16 md:h-16 animate-pulse" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
