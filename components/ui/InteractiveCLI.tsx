
import React, { useState, useRef, useEffect } from 'react';
import { PROFILE } from '../../constants';

interface CommandResponse {
  command: string;
  output: string | React.ReactNode;
}

export const InteractiveCLI: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandResponse[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'whoami':
        output = PROFILE.summary;
        break;
      case 'cat skills.txt':
        output = "Python, SQL, LangChain, ChromaDB, Flask, PyTorch, Scikit-Learn, Pandas, NumPy, Docker, AWS, Git";
        break;
      case 'ping navneet':
        output = "Connection Established. Ready for deployment.";
        break;
      case 'sudo hire navneet':
        output = "Access Granted. Initializing interview protocols. Initializing connection to " + PROFILE.email;
        break;
      case 'help':
        output = "Available commands: whoami, cat skills.txt, ping navneet, sudo hire navneet, clear";
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { command: input, output }]);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div 
      className="bg-black/90 border border-emerald-500/30 rounded-xl p-6 font-mono text-xs h-64 flex flex-col shadow-2xl shadow-emerald-500/5"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-emerald-500/50 uppercase tracking-widest text-[10px]">System_Terminal_v4.0.2</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-4">
        <div className="text-emerald-500/40">Welcome to Navneet's System. Type 'help' to begin.</div>
        {history.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex gap-2">
              <span className="text-emerald-500">guest@navneet:~$</span>
              <span className="text-white">{item.command}</span>
            </div>
            <div className="text-zinc-400 pl-4">{item.output}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleCommand} className="flex gap-2">
        <span className="text-emerald-500">guest@navneet:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0"
          autoFocus
        />
      </form>
    </div>
  );
};
