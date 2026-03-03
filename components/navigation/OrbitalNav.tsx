import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, BrainCircuit, Zap, Fingerprint } from 'lucide-react';
import { Vibe } from '../background/NeuralBackground';

interface OrbitalNavProps {
  vibe: Vibe;
  setVibe: (v: Vibe) => void;
}

export const OrbitalNav = ({ vibe, setVibe }: OrbitalNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const navItems = [
    { icon: Layers, label: 'Minimal', value: 'minimal' },
    { icon: BrainCircuit, label: 'Neural', value: 'neural' },
    { icon: Zap, label: 'Maximal', value: 'maximal' },
  ];

  // Elite Physics Configuration
  const springConfig = { type: "spring" as const, stiffness: 400, damping: 25 };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center pointer-events-none">
      
      {/* Container needs pointer-events-auto for interaction */}
      <div className="relative pointer-events-auto">
        <AnimatePresence>
          {isOpen && navItems.map((item, index) => {
             // Calculate precise orbital position (Top Semicircle: -160deg to -20deg)
             // 3 items: 0 -> -160 (Left), 1 -> -90 (Top), 2 -> -20 (Right)
             const totalSpread = 140 * (Math.PI / 180); 
             const startAngle = -160 * (Math.PI / 180);
             const step = totalSpread / (navItems.length - 1);
             const angle = startAngle + (index * step);
             
             const radius = 85;
             const x = Math.cos(angle) * radius;
             const y = Math.sin(angle) * radius;

             const isActive = vibe === item.value;

             return (
               <motion.button
                 key={item.label}
                 aria-label={`Set vibe to ${item.label}`}
                 initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                 animate={{ opacity: 1, x, y, scale: 1 }}
                 exit={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                 transition={{ ...springConfig, delay: index * 0.05 }}
                 onClick={() => { setVibe(item.value as Vibe); setIsOpen(false); }}
                 className={`absolute top-0 left-0 w-12 h-12 rounded-full flex items-center justify-center border backdrop-blur-2xl shadow-lg transition-all duration-500
                   ${isActive 
                     ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)] scale-110' 
                     : 'bg-white/[0.03] border-white/10 text-zinc-500 hover:text-white hover:border-emerald-500/30 hover:bg-white/[0.08]'}`}
               >
                 <item.icon size={18} />
               </motion.button>
             );
          })}
        </AnimatePresence>

        {/* Main Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleOpen}
          className={`relative w-16 h-16 bg-[#050505] border rounded-full flex items-center justify-center z-50 transition-colors duration-500
            ${isOpen ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.15)]' : 'border-white/10 shadow-2xl'}`}
        >
          {/* Subtle Breathing Glow (Replaces aggressive Ping) */}
          <div className={`absolute inset-0 rounded-full bg-emerald-500/10 blur-xl transition-opacity duration-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
          
          <Fingerprint 
            size={28} 
            className={`transition-all duration-700 ${isOpen ? 'text-emerald-500 rotate-180 scale-110' : 'text-zinc-500 hover:text-emerald-400'}`} 
          />
        </motion.button>
      </div>
      
     {/* System Label */}
     <motion.div 
       initial={{ opacity: 0, y: -10 }}
       animate={{ opacity: 1, y: 0 }}
       className="mt-8 px-4 py-1.5 bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-full text-[8px] font-mono text-zinc-600 uppercase tracking-[0.4em] pointer-events-auto flex items-center gap-3"
     >
        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
        SYS.NAV // <span className="text-emerald-500 font-bold">{vibe}</span>
     </motion.div>
    </div>
  );
};