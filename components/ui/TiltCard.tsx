import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

// Premium physics: Heavier, more "expensive" feel
const PHYSICS = {
  spring: { stiffness: 150, damping: 20, mass: 1.2 },
  hover: { scale: 1.02 }
};

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  noTilt?: boolean; // Option to disable tilt for performance/preference
}

export const TiltCard = ({ children, className = "", onClick, noTilt = false }: TiltCardProps) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation output based on mouse position
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), PHYSICS.spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), PHYSICS.spring);
  const scale = useSpring(1, PHYSICS.spring);

  // Map scale to opacity for the glow effect
  const glowOpacity = useTransform(scale, [1, 1.02], [0, 1]);
  
  // Dynamic gradient angle based on tilt
  const gradientAngle = useTransform(rotateX, (val) => val * 15 + 135); // Offset to move light source
  const gradientBg = useMotionTemplate`linear-gradient(${gradientAngle}deg, rgba(16,185,129,0.05), transparent)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noTilt) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (!noTilt) scale.set(PHYSICS.hover.scale);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      style={{ 
        rotateX: noTilt ? 0 : rotateX, 
        rotateY: noTilt ? 0 : rotateY, 
        scale 
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`tilt-card perspective-1000 group relative ${className}`}
    >
      {/* Dynamic Depth Gradient */}
      <motion.div 
         className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
         style={{ background: gradientBg }}
      />

      {/* Layered ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] pointer-events-none"
        style={{ 
          boxShadow: "inset 0 0 40px rgba(16, 185, 129, 0.15)",
          opacity: glowOpacity
        }}
      />

      {/* Depth Layer */}
      <div 
        style={{ transform: "translateZ(20px)" }} 
        className="relative z-10 h-full flex flex-col"
      >
        {children}
      </div>

      {/* Optional Edge Highlight */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none group-hover:border-emerald-500/20 transition-colors" />
    </motion.div>
  );
};