
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Linkedin, MessageSquare, Download, 
  ExternalLink, BrainCircuit, Send, Terminal, 
  ShieldCheck, Activity, User, Briefcase, GraduationCap,
  Award, Mail, Phone, Globe, Github
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { PROFILE, PROJECTS, WORK_LOG, SKILL_CATEGORIES, CERTIFICATIONS } from '../../constants';
import { TiltCard } from '../ui/TiltCard';

const CareerCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin' | 'interview'>('resume');

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-mono text-sm text-emerald-500 uppercase tracking-[0.5em] mb-4 block">/// RECRUITMENT_NODE_INITIALIZED ///</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter">Career<br/><span className="text-glow text-emerald-500">Command Center.</span></h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex bg-white/[0.03] border border-white/10 p-1.5 rounded-2xl backdrop-blur-md">
          {[
            { id: 'resume', icon: FileText, label: 'ATS Resume' },
            { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
            { id: 'interview', icon: MessageSquare, label: 'Interview Sim' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]' 
                  : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeTab === 'resume' && <ResumeView key="resume" />}
        {activeTab === 'linkedin' && <LinkedInView key="linkedin" />}
        {activeTab === 'interview' && <InterviewSimulator key="interview" />}
      </AnimatePresence>
    </div>
  );
};

const ResumeView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      {/* Controls */}
      <div className="lg:col-span-12 flex justify-end gap-4">
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all group"
        >
          <Download size={14} className="group-hover:scale-110 transition-transform" />
          Print PDF
        </button>
        <a 
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-black rounded-xl font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-all"
        >
          <ExternalLink size={14} />
          Original Dossier
        </a>
      </div>

      {/* Resume Paper */}
      <div className="lg:col-span-12 bg-[#0A0A0A] text-zinc-300 p-8 md:p-16 rounded-[2.5rem] border border-white/5 shadow-2xl max-w-5xl mx-auto w-full font-sans relative overflow-hidden group/resume print:bg-white print:text-black print:p-0 print:shadow-none print:rounded-none print:border-none">
        {/* Digital Accents */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover/resume:opacity-20 transition-opacity">
          <Terminal size={200} />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.4em] font-bold">Dossier // Verified</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 text-white">{PROFILE.name}</h1>
            <p className="text-xl font-mono font-bold text-emerald-500 uppercase tracking-widest">{PROFILE.role}</p>
          </div>
          <div className="text-right font-mono text-xs space-y-2 text-zinc-500">
            <p className="flex items-center justify-end gap-3 hover:text-white transition-colors cursor-default"><Mail size={14} className="text-emerald-500" /> {PROFILE.email}</p>
            <p className="flex items-center justify-end gap-3 hover:text-white transition-colors cursor-default"><Phone size={14} className="text-emerald-500" /> {PROFILE.phone}</p>
            <p className="flex items-center justify-end gap-3 hover:text-white transition-colors cursor-default"><Globe size={14} className="text-emerald-500" /> {PROFILE.location}</p>
          </div>
        </div>

        {/* Summary */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-600">01 // Professional_Summary</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <p className="text-xl leading-relaxed text-zinc-400 font-light max-w-4xl">
            {PROFILE.about}
          </p>
        </section>

        {/* Experience */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-600">02 // Experience_Log</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="space-y-12">
            {WORK_LOG.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-emerald-500/20 group/exp">
                <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-zinc-800 group-hover/exp:bg-emerald-500 transition-colors" />
                <div className="flex justify-between items-baseline mb-3">
                  <h4 className="text-2xl font-display font-bold text-white group-hover/exp:text-emerald-400 transition-colors">{exp.role}</h4>
                  <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{exp.date}</span>
                </div>
                <p className="text-sm font-mono font-bold text-emerald-500/60 mb-4 uppercase tracking-widest">{exp.inst}</p>
                <p className="text-zinc-500 leading-relaxed max-w-3xl font-light">{exp.log}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-600">03 // Technical_Deployments</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((proj, i) => (
              <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-emerald-500/30 transition-all group/proj">
                <h4 className="text-lg font-display font-bold mb-2 text-white group-hover/proj:text-emerald-400 transition-colors">{proj.title}</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest border border-white/5 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  <strong className="text-emerald-500/50 font-mono text-[10px] uppercase block mb-1">Outcome:</strong> {proj.brief.outcome}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-zinc-600">04 // Neural_Matrix</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {SKILL_CATEGORIES.slice(0, 8).map((cat, i) => (
              <div key={i}>
                <h4 className="text-[10px] font-mono font-black uppercase mb-4 text-emerald-500/50 tracking-widest">{cat.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="text-[10px] font-mono text-zinc-500">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className="pt-12 border-t border-white/5 flex justify-between items-center font-mono text-[8px] text-zinc-700 uppercase tracking-[0.5em]">
          <span>[ END_OF_DOSSIER ]</span>
          <span>{PROFILE.systemId}</span>
        </div>
      </div>
    </motion.div>
  );
};

const LinkedInView = () => {
  const headline = `AI/ML Developer | Python Backend Engineer | RAG Pipeline Architect | BCA Graduate`;
  const about = `Passionate AI/ML Developer and Python Backend Engineer with a strong focus on building scalable, intelligent systems. Specialized in RAG (Retrieval-Augmented Generation) pipelines, Large Language Models (LLMs), and high-performance backend architectures.

With a 92.5% model accuracy track record and successful deployment of AI-driven solutions like VidSnapAI and RAG Teaching Assistants, I bridge the gap between complex data science and production-ready software.

🚀 Technical Expertise:
• Languages: Python (Advanced), SQL, Node.js
• AI/ML: LangChain, ChromaDB, Scikit-Learn, PyTorch, Whisper
• Data: Pandas, NumPy, Power BI (DAX), Advanced Excel
• Backend: Flask, REST APIs, FFmpeg

Seeking my first full-time deployment to contribute to cutting-edge AI initiatives and data-driven engineering teams.`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <TiltCard className="p-8 glass-card border-emerald-500/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-emerald-500" />
            <h3 className="font-display font-bold text-sm uppercase tracking-widest">Optimized Headline</h3>
          </div>
          <button onClick={() => copyToClipboard(headline)} className="text-xs font-mono text-emerald-500 hover:text-white transition-colors">COPY_STRING</button>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-sm text-zinc-300 leading-relaxed">
          {headline}
        </div>
        <p className="mt-4 text-xs text-zinc-500 font-mono italic">
          // Designed for maximum visibility in recruiter searches for AI and Backend roles.
        </p>
      </TiltCard>

      <TiltCard className="p-8 glass-card border-emerald-500/20">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Terminal size={18} className="text-emerald-500" />
            <h3 className="font-display font-bold text-sm uppercase tracking-widest">About Section</h3>
          </div>
          <button onClick={() => copyToClipboard(about)} className="text-xs font-mono text-emerald-500 hover:text-white transition-colors">COPY_STRING</button>
        </div>
        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 font-mono text-xs text-zinc-300 leading-relaxed h-[300px] overflow-y-auto custom-scrollbar">
          {about}
        </div>
        <p className="mt-4 text-xs text-zinc-500 font-mono italic">
          // High-fidelity narrative focusing on RAG pipelines and production-ready AI.
        </p>
      </TiltCard>
    </motion.div>
  );
};

const InterviewSimulator = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: 'model', text: 'INITIALIZING INTERVIEW_SIM_v1.0. I am your technical interviewer. We will focus on RAG pipelines, Scikit-Learn scaling, and your specific projects. Ready to begin?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemPrompt = `You are a Senior Technical Interviewer at a top-tier AI lab. 
      You are interviewing ${PROFILE.name} for an AI/ML Developer role.
      Focus on:
      1. RAG Vectorization (ChromaDB, embeddings)
      2. Scikit-Learn Pipeline Scaling
      3. Project-specific deep dives (VidSnapAI, RAG TA)
      
      Be rigorous but professional. Ask one question at a time. Provide feedback if the answer is weak.
      
      CANDIDATE DOSSIER:
      ${JSON.stringify(PROFILE)}
      PROJECTS: ${JSON.stringify(PROJECTS)}
      SKILLS: ${JSON.stringify(SKILL_CATEGORIES)}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection lost." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "ERROR: NEURAL_LINK_FAILURE. Please check API configuration." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-4xl mx-auto h-[600px] bg-[#050505]/80 border border-emerald-500/20 rounded-[2.5rem] flex flex-col overflow-hidden backdrop-blur-xl relative shadow-[0_0_50px_rgba(16,185,129,0.1)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
      <div className="grid-bg opacity-20" />
      
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02] relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Activity size={18} className="text-emerald-500 animate-pulse" />
            <div className="absolute inset-0 bg-emerald-500/20 blur-md animate-pulse" />
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold text-emerald-500">Interview_Inference_Live</span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => (
            <motion.div 
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar relative z-10">
        {messages.map((msg, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">
              {msg.role === 'user' ? 'Candidate' : 'Interviewer_AI'}
            </span>
            <div className={`max-w-[85%] p-5 rounded-2xl font-mono text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-emerald-500 text-black font-bold shadow-[0_0_30px_rgba(16,185,129,0.2)]' 
                : 'bg-white/[0.03] border border-white/5 text-zinc-300'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-emerald-500/50 font-mono text-xs">
            <Activity size={12} className="animate-spin" /> Analyzing response...
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/5 bg-black/40 relative z-10">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-emerald-500/20 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Transmit technical response..."
            className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 font-mono text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-white transition-colors disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CareerCenter;
