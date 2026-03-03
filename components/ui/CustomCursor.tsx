import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Vibe } from '../background/NeuralBackground';

interface CursorProps {
  vibe: Vibe;
}

export const CustomCursor = ({ vibe }: CursorProps) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring for trailing effect
  const springX = useSpring(cursorX, { stiffness: 150, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 25 });

  const [variant, setVariant] = useState<'default' | 'hover'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.interactive')) {
        setVariant('hover');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Dynamic glow intensity based on vibe
  const glowIntensity =
    vibe === 'neural' ? 0.8 : vibe === 'maximal' ? 1.2 : 0.5;

  return (
    <>
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Tracking Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-emerald-500/30 rounded-full pointer-events-none z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          scale: variant === 'hover' ? 2 : 1,
          opacity: variant === 'hover' ? 1 : 0.2,
          borderWidth: variant === 'hover' ? '2px' : '1px',
          borderColor: variant === 'hover' ? '#10b981' : 'rgba(255,255,255,0.2)',
          backgroundColor:
            variant === 'hover'
              ? `rgba(16, 185, 129, 0.05)`
              : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        {/* Crosshair lines for hover state */}
        <AnimatePresence>
          {variant === 'hover' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full h-[1px] bg-emerald-500/20 absolute" />
              <div className="h-full w-[1px] bg-emerald-500/20 absolute" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};