import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Vibe } from '../background/NeuralBackground';

interface CursorProps {
  vibe: Vibe;
}

export const CustomCursor = ({ vibe }: CursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { stiffness: 400, damping: 30, mass: 0.8 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
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

      {/* Coordinate Display */}
      <AnimatePresence>
        {!isHovering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-10 left-10 font-mono text-[8px] text-emerald-500/50 whitespace-nowrap pointer-events-none"
          >
            X: {coords.x.toFixed(0)}<br/>
            Y: {coords.y.toFixed(0)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crosshair Lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-px bg-emerald-500/20 absolute" />
        <div className="h-full w-px bg-emerald-500/20 absolute" />
      </div>
    </motion.div>
  );
};
