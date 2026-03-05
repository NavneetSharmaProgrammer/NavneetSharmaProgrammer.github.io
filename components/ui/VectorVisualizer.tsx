
import React from 'react';
import { motion } from 'framer-motion';

export const VectorVisualizer: React.FC = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all duration-500" />
      
      {/* Vector Node Graph */}
      <svg width="120" height="120" viewBox="0 0 120 120" className="relative z-10">
        <defs>
          <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Connections */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        >
          {[
            [30, 30, 90, 90],
            [90, 30, 30, 90],
            [60, 20, 60, 100],
            [20, 60, 100, 60],
            [40, 20, 80, 100],
            [80, 20, 40, 100]
          ].map((coords, i) => (
            <motion.line
              key={i}
              x1={coords[0]} y1={coords[1]} x2={coords[2]} y2={coords[3]}
              stroke="rgba(16,185,129,0.1)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))}
          
          {/* Nodes */}
          {[
            { x: 60, y: 60, r: 4 },
            { x: 30, y: 30, r: 2 },
            { x: 90, y: 90, r: 2 },
            { x: 90, y: 30, r: 2 },
            { x: 30, y: 90, r: 2 },
            { x: 60, y: 20, r: 2 },
            { x: 60, y: 100, r: 2 },
            { x: 20, y: 60, r: 2 },
            { x: 100, y: 60, r: 2 },
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x} cy={node.y} r={node.r}
              fill="url(#nodeGradient)"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.g>

        {/* Orbiting Particles */}
        <motion.circle
          cx="60" cy="60" r="45"
          fill="none"
          stroke="rgba(16,185,129,0.05)"
          strokeWidth="1"
          strokeDasharray="4 4"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ originX: "60px", originY: "60px" }}
        />
      </svg>

      {/* Label */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="font-mono text-[8px] text-emerald-500/40 uppercase tracking-widest">Vector_Space.exe</span>
      </div>
    </div>
  );
};
