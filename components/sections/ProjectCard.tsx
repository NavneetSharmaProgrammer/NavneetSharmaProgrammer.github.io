import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ExternalLink, X, Code, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProjectCard = ({ project, colorClass = 'bento-emerald' }: { project: any; colorClass?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // On mobile, scroll to the top of the card with some offset
        const offset = 80;
        window.scrollTo({
          top: window.scrollY + rect.top - offset,
          behavior: 'smooth'
        });
      }
    }
  }, [isExpanded]);

  const handleLinkClick = (e: React.MouseEvent) => {
    if (project.link) {
      e.stopPropagation();
      window.open(project.link, '_blank');
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      className={`relative overflow-hidden glass-card cursor-pointer ${colorClass} ${isExpanded ? 'md:col-span-2 md:row-span-2 z-50' : 'col-span-1'}`}
      onClick={toggleExpand}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.2)' }}
      whileTap={{ 
        scale: 0.98, 
        borderColor: 'var(--accent)',
        backgroundColor: 'var(--accent-glow)',
        transition: { duration: 0.1 }
      }}
      viewport={{ once: true }}
      transition={{ layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } }}
    >
      <motion.div 
        layout
        className="h-full flex flex-col p-5 sm:p-10 relative group"
      >
        {/* Background Image with Reveal */}
        <motion.div 
          layout
          className={`absolute inset-0 z-0 transition-all duration-700 ${isExpanded ? 'opacity-10' : 'opacity-0 group-hover:opacity-20 scale-110 group-hover:scale-100'}`}
        >
          <img 
            src={project.imageUrl} 
            className="w-full h-full object-cover grayscale" 
            alt={`Background for ${project.title}`} 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="scanline-fast" />
        </motion.div>

        {/* Top Section */}
        <motion.div layout className="relative z-10 flex justify-between items-start mb-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">Project // {project.date}</span>
            <motion.div
              layout
              className={`h-[2px] bg-[var(--accent)]/30 transition-all duration-500 ${isExpanded ? 'w-24' : 'w-8 group-hover:w-16'}`}
            />
          </div>
          <div className="flex gap-2">
            {isExpanded ? (
              <motion.button
                onClick={toggleExpand}
                className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            ) : (
              <>
                {project.link && (
                  <motion.button
                    onClick={handleLinkClick}
                    className="p-2.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={14} />
                  </motion.button>
                )}
                <div className="p-3 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:bg-[var(--accent)] group-hover:text-black transition-all group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div 
          layout 
          className={`relative z-10 transition-all duration-500 ${isExpanded ? 'bg-black/80 p-5 sm:p-8 -mx-5 sm:-mx-10 rounded-2xl border-y border-white/10 backdrop-blur-xl shadow-2xl' : ''}`}
        >
          <h3 className={`font-display font-black uppercase leading-[0.9] tracking-tighter transition-colors ${isExpanded ? 'text-3xl sm:text-7xl text-white' : 'text-2xl sm:text-3xl group-hover:text-[var(--accent)]'}`}>
            {project.title}
          </h3>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex items-center gap-2"
            >
              <div className="h-px w-12 bg-[var(--accent)]" />
              <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-[0.3em] font-bold">System_Node_Active</span>
            </motion.div>
          )}
          {!isExpanded && (
            <motion.span 
              className="inline-block mt-4 font-mono text-[10px] text-[var(--accent)]/0 group-hover:text-[var(--accent)] transition-colors uppercase tracking-widest"
            >
              [ Click to Expand ]
            </motion.span>
          )}
        </motion.div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="relative z-10 mt-8 space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-3">/ Engineering Brief</h4>
                    <div className="space-y-3 font-mono text-[10px] sm:text-xs text-zinc-300">
                      <div className='p-3 sm:p-4 bg-white/5 rounded border border-white/10'>
                        <span className="text-zinc-400 block text-[8px] sm:text-[10px] uppercase mb-1">Constraint</span>
                        {project.brief.constraint}
                      </div>
                      <div className='p-3 sm:p-4 bg-white/5 rounded border border-white/10'>
                        <span className="text-zinc-400 block text-[8px] sm:text-[10px] uppercase mb-1">Strategy</span>
                        {project.brief.strategy}
                      </div>
                      <div className='p-3 sm:p-4 bg-[var(--accent)]/10 rounded border border-[var(--accent)]/20 text-[var(--accent)]'>
                        <span className="text-[var(--accent)]/80 block text-[8px] sm:text-[10px] uppercase mb-1">Outcome</span>
                        {project.brief.outcome}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 sm:p-6 bg-black/40 rounded-xl border border-white/10 font-mono text-[10px] sm:text-xs">
                    <div className="flex items-center gap-2 mb-4 text-zinc-400 border-b border-white/10 pb-2">
                      <Code size={14} /> <span>Stack_Trace.json</span>
                    </div>
                    <div className="text-[var(--accent)] space-y-1">
                      {project.tags.map((tag: string, i: number) => (
                        <div key={i}>"{tag}": <span className="text-white">true</span>,</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-4 bg-[var(--accent)] text-black font-bold uppercase tracking-widest text-center rounded text-xs hover:bg-white transition-colors"
                      >
                        Launch Project
                      </a>
                    )}
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-4 border border-white/10 rounded hover:bg-white/5 transition-colors flex items-center justify-center sm:w-auto w-full"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats / Tags (Collapsed) */}
        {!isExpanded && (
          <motion.div layout className="relative z-10 mt-auto pt-6 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest bg-white/[0.05] px-2 py-1 rounded-sm border border-white/[0.1]">
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && <span className="text-[8px] font-mono text-zinc-500">+{project.tags.length - 3}</span>}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] text-zinc-500 uppercase tracking-widest">Classification</span>
              <span className="font-mono text-[8px] text-[var(--accent)] uppercase tracking-widest font-bold">{project.stat}</span>
            </div>
          </motion.div>
        )}

        {/* Hover Glow */}
        <div className="absolute -inset-20 bg-[var(--accent)]/5 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};
