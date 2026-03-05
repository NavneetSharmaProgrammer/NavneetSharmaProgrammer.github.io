
import React, { useState, useEffect, useCallback } from 'react';

interface HackerTextProps {
  text: string;
  className?: string;
  trigger?: 'hover' | 'auto';
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export const HackerText: React.FC<HackerTextProps> = ({ text, className = '', trigger = 'hover' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split('').map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        }).join('')
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      
      iteration += 1 / 3;
    }, 30);
  }, [text, isAnimating]);

  useEffect(() => {
    if (trigger === 'auto') {
      scramble();
    }
  }, [trigger, scramble]);

  return (
    <span 
      className={className}
      onMouseEnter={() => trigger === 'hover' && scramble()}
    >
      {displayText}
    </span>
  );
};
