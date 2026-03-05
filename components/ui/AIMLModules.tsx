
import React, { useState, useEffect } from 'react';
import 'katex/dist/katex.min.css';
// @ts-ignore
import { InlineMath, BlockMath } from 'react-katex';
import { motion } from 'framer-motion';

export const AlgorithmicCore: React.FC = () => {
  return (
    <div className="bg-black/40 border border-emerald-500/10 rounded-xl p-6 font-mono text-[10px] space-y-4">
      <div className="flex items-center gap-2 text-emerald-500/60 uppercase tracking-[0.2em] mb-2">
        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
        <span>/// ALGORITHMIC_CORE // SEMANTIC_RETRIEVAL ///</span>
      </div>
      
      <div className="space-y-2">
        <p className="text-zinc-400">Vector Distance Metric: <span className="text-white">Cosine Similarity</span></p>
        <p className="text-zinc-500 leading-relaxed">Utilized for high-dimensional embedding comparison in RAG pipelines.</p>
      </div>

      <div className="py-4 bg-emerald-500/5 rounded-lg border border-emerald-500/5 flex justify-center overflow-x-auto custom-scrollbar">
        <div className="text-emerald-500 scale-110">
          <BlockMath math="\text{similarity} = \cos(\theta) = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|} = \frac{\sum_{i=1}^{n} A_i B_i}{\sqrt{\sum_{i=1}^{n} A_i^2} \sqrt{\sum_{i=1}^{n} B_i^2}}" />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <span className="text-zinc-500 uppercase tracking-widest">Status:</span>
        <span className="text-emerald-500">Optimized for evaluating lexical and semantic similarity across unstructured data vectors.</span>
      </div>
    </div>
  );
};

export const ClassificationReport: React.FC = () => {
  return (
    <div className="bg-black/60 border border-emerald-500/10 rounded-lg p-4 font-mono text-[9px] leading-tight overflow-x-auto custom-scrollbar">
      <div className="text-emerald-500/60 mb-3 uppercase tracking-widest">/// CLASSIFICATION_REPORT // PIPELINE: HOTEL_PREDICTOR ///</div>
      <pre className="text-zinc-400">
{`              precision    recall  f1-score   support

Class 0 (Stay)     0.94      0.96      0.95     85200
Class 1 (Cancel)   0.89      0.85      0.87     33800

    accuracy                           0.92    119000
   macro avg       0.91      0.90      0.91    119000
weighted avg       0.92      0.92      0.92    119000`}
      </pre>
      <div className="mt-3 text-emerald-500/40 italic">[LOG] Confusion Matrix stabilized. False Positives minimized to acceptable business thresholds.</div>
    </div>
  );
};

export const APIInference: React.FC = () => {
  return (
    <div className="bg-black/60 border border-emerald-500/10 rounded-lg p-4 font-mono text-[9px] leading-tight">
      <div className="text-emerald-500/60 mb-3 uppercase tracking-widest">/// REST_API // INFERENCE_NODE_ACTIVE ///</div>
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-blue-400">POST /api/v1/agent/query</span>
            <span className="text-zinc-600">Content-Type: application/json</span>
          </div>
          <pre className="text-zinc-500">
{`{
  "user_id": "sys_admin_99",
  "query": "Explain transformer attention mechanisms.",
  "context_window": "lecture_04_embeddings.mp4",
  "temperature": 0.2
}`}
          </pre>
        </div>
        
        <div className="space-y-1 border-t border-white/5 pt-2">
          <div className="text-emerald-500">&gt;&gt;&gt; RESPONDING... 200 OK</div>
          <pre className="text-zinc-400">
{`{
  "status": "success",
  "retrieved_vectors": 4,
  "confidence_score": 0.98,
  "response": "Self-attention allows the model to weigh the importance of different words in a sequence..."
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export const ETLPipeline: React.FC = () => {
  return (
    <div className="bg-black/40 border border-emerald-500/10 rounded-xl p-6 font-mono text-[10px] space-y-6">
      <div className="flex items-center gap-2 text-emerald-500/60 uppercase tracking-[0.2em]">
        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
        <span>/// DATA_PIPELINE_ARCHITECTURE (ETL/ELT) ///</span>
      </div>

      <div className="space-y-4 pl-4 border-l border-emerald-500/10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white bg-white/5 px-2 py-0.5 rounded">[ RAW DATA ]</span>
            <span className="text-emerald-500/50">&gt;&gt; Ingestion</span>
          </div>
          <div className="pl-4 text-zinc-500">|-- 119k+ Unstructured Rows (CSV/SQL)</div>
          <div className="pl-4 text-emerald-500/30">v</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white bg-white/5 px-2 py-0.5 rounded">[ PANDAS WRANGLER ]</span>
            <span className="text-emerald-500/50">&gt;&gt; Processing</span>
          </div>
          <div className="pl-4 text-zinc-500 space-y-1">
            <div>|-- Handling Missing Values (Imputation)</div>
            <div>|-- Temporal Feature Engineering</div>
            <div>|-- Outlier Normalization</div>
          </div>
          <div className="pl-4 text-emerald-500/30">v</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white bg-white/5 px-2 py-0.5 rounded">[ SCIKIT-LEARN ]</span>
            <span className="text-emerald-500/50">&gt;&gt; Transformation</span>
          </div>
          <div className="pl-4 text-zinc-500 space-y-1">
            <div>|-- StandardScaler / MinMax</div>
            <div>|-- Categorical Encoding</div>
          </div>
          <div className="pl-4 text-emerald-500/30">v</div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">[ TENSOR/DATAFRAME ]</span>
            <span className="text-emerald-500/50">&gt;&gt; Ready for Model Training</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const InteractiveInferenceNode: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'executing' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const handleExecute = () => {
    if (status !== 'idle') return;
    setStatus('executing');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('complete');
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  return (
    <div className="bg-black/80 border border-emerald-500/20 rounded-xl p-6 font-mono text-[10px] space-y-4 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
      <div className="flex items-center justify-between text-emerald-500/60 uppercase tracking-[0.2em] mb-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <span>/// LIVE_INFERENCE_TEST ///</span>
        </div>
        <span className="text-[8px] opacity-50">NODE_ID: INF_092</span>
      </div>

      <div className="space-y-3">
        <div className="text-zinc-500">Target: <span className="text-blue-400">/api/v1/predict_booking_cancellation</span></div>
        
        <div className="space-y-1">
          <div className="text-zinc-600">&gt; INPUT PARAMS:</div>
          <pre className="text-zinc-400 bg-white/5 p-3 rounded-lg border border-white/5">
{`{ 
  "lead_time": 45, 
  "previous_cancellations": 1, 
  "deposit_type": "No Deposit" 
}`}
          </pre>
        </div>

        {status === 'idle' && (
          <button 
            onClick={handleExecute}
            className="w-full py-2 border border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 transition-all uppercase tracking-widest text-[9px]"
          >
            [ EXECUTE_INFERENCE ]
          </button>
        )}

        {status === 'executing' && (
          <div className="space-y-2">
            <div className="text-emerald-500 animate-pulse">&gt; EXECUTING PREDICTION MODEL...</div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-[8px] text-zinc-600">{progress}%</div>
          </div>
        )}

        {status === 'complete' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <div className="text-emerald-500">&gt; RESPONSE: 200 OK</div>
            <pre className="text-zinc-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
{`{
   "prediction": "CANCEL",
   "confidence_score": 0.89,
   "risk_factor": "HIGH",
   "recommended_action": "Flag for manual confirmation call."
}`}
            </pre>
            <button 
              onClick={() => setStatus('idle')}
              className="text-[8px] text-zinc-600 hover:text-zinc-400 underline uppercase tracking-widest"
            >
              Reset Node
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const IncidentReports: React.FC = () => {
  return (
    <div className="bg-black/40 border border-red-500/10 rounded-xl p-6 font-mono text-[10px] space-y-6">
      <div className="flex items-center gap-2 text-red-500/60 uppercase tracking-[0.2em]">
        <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
        <span>/// SYSTEM_INCIDENT_REPORTS // POST-MORTEM LOGS ///</span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg space-y-3">
          <div className="text-red-400 font-bold">[ INCIDENT #042: ChromaDB Memory Leak in RAG Pipeline ]</div>
          <div className="space-y-2">
            <p className="text-zinc-400"><span className="text-red-500/60">ERROR:</span> Vector embeddings exceeding RAM allocation during batch ingestion of 10+ hour video transcripts.</p>
            <p className="text-zinc-400"><span className="text-red-500/60">DIAGNOSIS:</span> Whisper API output was being held in memory before chunking, causing out-of-memory (OOM) crashes on the local Flask server.</p>
            <p className="text-zinc-400"><span className="text-red-500/60">RESOLUTION:</span> Implemented asynchronous chunking using LangChain's RecursiveCharacterTextSplitter and batched the vector upserts to ChromaDB in increments of 500 documents.</p>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-zinc-500 uppercase tracking-widest">STATUS:</span>
            <span className="text-emerald-500 font-bold">PATCHED. Pipeline uptime restored to 99.9%.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ExternalRegistries: React.FC = () => {
  return (
    <div className="bg-black/40 border border-white/5 rounded-xl p-6 font-mono text-[10px] space-y-6">
      <div className="flex items-center gap-2 text-zinc-500 uppercase tracking-[0.2em]">
        <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
        <span>/// EXTERNAL_MODEL_REGISTRIES ///</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="https://huggingface.co" target="_blank" rel="noopener noreferrer" className="group p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-white font-bold group-hover:text-emerald-500 transition-colors">[ Hugging Face Hub ]</span>
            <span className="text-emerald-500 text-[8px] animate-pulse">Connected</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">Focus: Tracking open-source LLM weights, fine-tuning scripts, and transformer architectures.</p>
        </a>

        <a href="https://kaggle.com" target="_blank" rel="noopener noreferrer" className="group p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start mb-3">
            <span className="text-white font-bold group-hover:text-emerald-500 transition-colors">[ Kaggle Datasets ]</span>
            <span className="text-emerald-500 text-[8px] animate-pulse">Active</span>
          </div>
          <p className="text-zinc-500 leading-relaxed">Focus: Exploratory Data Analysis (EDA), Feature Engineering, and competitive classification modeling.</p>
        </a>
      </div>
    </div>
  );
};

export const SystemTopology: React.FC = () => {
  return (
    <div className="bg-black/40 border border-emerald-500/10 rounded-xl p-6 font-mono text-[10px] space-y-6 overflow-x-auto custom-scrollbar">
      <div className="flex items-center gap-2 text-emerald-500/60 uppercase tracking-[0.2em]">
        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        <span>/// SYSTEM_TOPOLOGY_MAP // ETL_TO_INFERENCE ///</span>
      </div>

      <pre className="text-emerald-500/80 leading-tight">
{`[ RAW DATA: Unstructured Video/Audio ]
       │
       ▼ (FFmpeg Extraction)
[ PROCESSING NODE ] ──► (OpenAI Whisper) ──► [ TRANSCRIPT TXT ]
       │                                            │
       ▼ (LangChain Text Splitter)                  ▼
[ VECTORIZATION ] ◄── (Embedding Model) ◄── [ CHUNKED DATA ]
       │
       ▼ (Upsert)
[( DATABASE: ChromaDB Vector Store )]
       │
       ▼ (Semantic Similarity Search)
[ LLM INFERENCE ENGINE (Flask API) ] ──► [ FINAL USER OUTPUT ]`}
      </pre>
    </div>
  );
};
