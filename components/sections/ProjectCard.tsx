import { ArrowUpRight, GitCommit } from 'lucide-react';
import { TiltCard } from '../ui/TiltCard';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  return (
    <motion.div
      className={`col-span-1 interactive group`}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="h-full min-h-[420px] flex flex-col justify-between p-10 glass-card relative group cursor-pointer overflow-hidden">
        
        {/* Background Image with Reveal */}
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-all duration-700 scale-110 group-hover:scale-100">
          <img src={project.imageUrl} className="w-full h-full object-cover grayscale" alt="" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        {/* Top Section */}
        <div className="relative z-10 flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-emerald-500 font-bold">Project // {project.date}</span>
            <motion.div
              className="w-8 h-[2px] bg-emerald-500/30 group-hover:w-16 transition-all duration-500"
            />
          </div>
          <motion.div
            className="p-4 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500 group-hover:rotate-45"
          >
            <ArrowUpRight size={20} />
          </motion.div>
        </div>

        {/* Title Section */}
        <div className="relative z-10 mt-8">
          <h3 className="text-3xl font-display font-black uppercase leading-[0.9] tracking-tighter group-hover:text-emerald-400 transition-colors">
            {project.title.split(' ').map((word: string, i: number) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h3>
        </div>

        {/* Stats / Tags */}
        <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span key={tag} className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest bg-white/[0.03] px-2 py-1 rounded-sm border border-white/[0.02]">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Classification</span>
            <span className="font-mono text-[9px] text-emerald-500 uppercase tracking-widest font-bold">{project.stat}</span>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute -inset-20 bg-emerald-500/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </motion.div>
  );
};
