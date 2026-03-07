
import React, { useState, useEffect, useRef } from 'react';

const LOG_MESSAGES = [
  "[INFO] Initializing LangChain Agent... OK",
  "[WARN] ChromaDB Vector Search: Latency 12ms",
  "[INFO] /api/v1/generate_video - POST Request 200 OK",
  "[SYSLOG] Model inference complete. Confidence: 0.98",
  "[DEBUG] Embedding dimension: 1536",
  "[INFO] RAG Pipeline: Context retrieved from namespace 'prod'",
  "[WARN] API Gateway: Rate limit threshold at 85%",
  "[INFO] Database: Connection pool optimized",
  "[SYSLOG] Neural weights synchronized across nodes",
  "[INFO] Flask: Server listening on port 5000",
  "[DEBUG] Token usage: 452 prompt, 128 completion",
  "[INFO] System: All nodes nominal"
];

export const TerminalConsole: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => {
        const next = [...prev, LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]];
        if (next.length > 50) return next.slice(1);
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-black/80 border border-emerald-500/20 rounded-lg p-4 font-mono text-[10px] max-h-[250px] h-[250px] overflow-hidden relative group">
      <div className="absolute top-2 right-2 flex gap-1 z-10">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
      </div>
      <div ref={scrollRef} className="h-full overflow-y-auto custom-scrollbar space-y-1">
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-emerald-500/30">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
            <span className={log.includes('WARN') ? 'text-yellow-500/70' : log.includes('SYSLOG') ? 'text-blue-400/70' : 'text-emerald-500/70'}>
              {log}
            </span>
          </div>
        ))}
        {logs.length === 0 && <div className="text-emerald-500/20">Initializing system logs...</div>}
      </div>
    </div>
  );
};
