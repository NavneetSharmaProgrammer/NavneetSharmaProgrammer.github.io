
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Send, X, Terminal, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROFILE, PROJECTS, WORK_LOG, SKILL_CATEGORIES } from './constants';

interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: Date;
}

// Flatten data for Local Search context - Updated for new Persona & Project Structure
const PORTFOLIO_CONTEXT = `
NAME: ${PROFILE.name}
ROLE: ${PROFILE.role}
FOCUS: ${PROFILE.mission}
SUMMARY: ${PROFILE.summary}
TECHNICAL STACK: ${SKILL_CATEGORIES.flatMap(c => c.skills).join(', ')}
KEY PROJECTS: ${PROJECTS.map(p => `${p.title} (${p.tags.join(', ')}): PROBLEM: ${p.brief.constraint} | SOLUTION: ${p.brief.strategy} | OUTCOME: ${p.brief.outcome}`).join('\n')}
EXPERIENCE: ${WORK_LOG.map(w => `${w.role} at ${w.inst}: ${w.log}`).join(' | ')}
CONTACT: Email: ${PROFILE.email}, GitHub: ${PROFILE.github}
`;

const AiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'system',
      text: 'READY. QUERY THE ARCHITECTURE.',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const hasApiKey = !!process.env.API_KEY;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (hasApiKey) {
        // --- GEMINI MODE (CLOUD INTELLIGENCE) ---
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemPrompt = `You are a portfolio assistant for ${PROFILE.name}, a Python Backend & Data Science Engineer. 
        Your tone is professional, concise, and data-focused. Avoid fluff.
        Use the following data context to answer questions about skills, projects, and experience.
        
        DATA CONTEXT:
        ${PORTFOLIO_CONTEXT}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: input,
          config: {
            systemInstruction: systemPrompt,
          }
        });

        const text = response.text || "Signal lost.";
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: text,
          timestamp: new Date()
        }]);

      } else {
        // --- LOCAL MODE (OFFLINE HEURISTICS) ---
        await new Promise(resolve => setTimeout(resolve, 600));
        
        let responseText = "Data point not found in local cache.";
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('skill') || lowerInput.includes('stack') || lowerInput.includes('tech')) {
           responseText = `Core Stack: ${SKILL_CATEGORIES[0].skills.slice(0, 4).join(', ')}. Focus on Python & Data Science.`;
        } else if (lowerInput.includes('project') || lowerInput.includes('work') || lowerInput.includes('built')) {
           responseText = `Flagship: ${PROJECTS[0].title}. Outcome: ${PROJECTS[0].brief.outcome}.`;
        } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire')) {
           responseText = `Signal: ${PROFILE.email}. Status: Available for deployment.`;
        } else if (lowerInput.includes('who') || lowerInput.includes('navneet')) {
           responseText = `${PROFILE.summary}`;
        } else {
           responseText = "Local Search Limit Reached. Try 'Skills', 'Projects', or 'Contact'.";
        }

        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: responseText,
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        text: 'ERROR: CONNECTION DROPPED.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/20 border border-white/10 text-white hover:bg-emerald-500 transition-colors"
      >
        <BrainCircuit size={24} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
            className="fixed bottom-24 right-6 w-[90vw] md:w-[450px] h-[600px] bg-[#050505]/95 border border-emerald-500/20 rounded-[2rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] z-50 flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
            
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02] relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-black text-white tracking-[0.3em] uppercase">Neural Interface</span>
                  <span className="font-mono text-[8px] text-emerald-500/60 uppercase tracking-widest">Session: {PROFILE.systemId}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-[11px] relative z-10 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id} 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-40">
                    <span className="text-[8px] uppercase tracking-widest">
                      {msg.role === 'user' ? 'Local_User' : 'Neural_Core'}
                    </span>
                    <span className="text-[8px]">[{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                  </div>
                  <div 
                    className={`max-w-[90%] p-4 rounded-2xl ${
                      msg.role === 'user' 
                        ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                        : msg.role === 'system' 
                          ? 'text-emerald-500/70 border border-emerald-500/20 bg-emerald-500/5 italic'
                          : 'bg-white/[0.03] text-zinc-300 border border-white/5 leading-relaxed'
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex flex-col items-start gap-2">
                  <span className="text-[8px] opacity-40 uppercase tracking-widest">Processing...</span>
                  <div className="bg-white/[0.03] p-4 rounded-2xl flex gap-1.5">
                    <motion.span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                    <motion.span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
                    <motion.span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-black/50 relative z-10">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Execute command..."
                  className="relative w-full bg-[#0A0A0A] border border-white/10 rounded-2xl pl-5 pr-12 py-4 text-[11px] text-white focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-zinc-800 font-mono"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-emerald-500 disabled:opacity-30 hover:text-emerald-400 transition-all hover:scale-110"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="mt-4 flex justify-between items-center opacity-30">
                <span className="text-[8px] font-mono uppercase tracking-widest">Auth: Verified</span>
                <span className="text-[8px] font-mono uppercase tracking-widest">Encryption: AES-256</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiChat;
