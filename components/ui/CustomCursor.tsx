import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Vibe } from '../background/NeuralBackground';

interface CursorProps {
  vibe: Vibe;
}

export const CustomCursor = ({ vibe }: CursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 400, damping: 30, mass: 0.8 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('h1') || 
        target.closest('.interactive-node') ||
        target.closest('.tilt-card') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Dynamic glow intensity based on vibe
  const glowOpacity = vibe === 'neural' ? 0.4 : vibe === 'maximal' ? 0.6 : 0.2;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovering ? 80 : 32,
        height: isHovering ? 80 : 32,
        borderRadius: isHovering ? '4px' : '50%',
        backgroundColor: isHovering ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 1)',
        boxShadow: isHovering 
          ? `0 0 50px rgba(16, 185, 129, ${glowOpacity + 0.2})` 
          : `0 0 20px rgba(16, 185, 129, ${glowOpacity})`,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
    >
      {/* Inner dot/block for precision */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="bg-black"
          animate={{
            width: isHovering ? 4 : 2,
            height: isHovering ? 16 : 2,
            borderRadius: isHovering ? '0px' : '50%',
          }}
        />
      </div>
    </motion.div>
  );
};
