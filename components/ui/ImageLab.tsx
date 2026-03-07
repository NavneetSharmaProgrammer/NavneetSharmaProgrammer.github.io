import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Image as ImageIcon, Download, RefreshCw, Wand2, X, Maximize2, Activity } from 'lucide-react';
import { TiltCard } from './TiltCard';

const ImageLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '9:16'>('1:1');

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: "1K"
          },
        },
      });

      let imageData = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageData) {
        setGeneratedImage(imageData);
      } else {
        throw new Error("No image data received from the model.");
      }
    } catch (err: any) {
      console.error("Image generation error:", err);
      setError(err.message || "Failed to generate image. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    link.click();
  };

  return (
    <TiltCard className="p-8 sm:p-12 glass-card border-emerald-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <ImageIcon size={160} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <Sparkles className="text-emerald-500" size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl uppercase tracking-tight">Neural Image Lab</h3>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Powered by Gemini 3.1 Flash Image</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">Prompt Engineering</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the visual concept... (e.g., 'A futuristic cyberpunk city with neon lights and floating vehicles, cinematic lighting')"
                className="w-full h-40 bg-white/[0.03] border border-white/10 rounded-3xl p-6 text-zinc-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all resize-none font-sans text-lg"
              />
            </div>

            <div className="space-y-4">
              <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">Aspect Ratio</label>
              <div className="flex gap-4">
                {(['1:1', '16:9', '9:16'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-6 py-3 rounded-2xl font-mono text-xs uppercase tracking-widest transition-all border ${
                      aspectRatio === ratio 
                        ? 'bg-emerald-500 text-black border-emerald-500 font-bold' 
                        : 'bg-white/5 text-zinc-500 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateImage}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-5 bg-emerald-500 text-black font-black font-mono text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex justify-center items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  Synthesizing...
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Generate Vision
                </>
              )}
            </button>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 text-sm font-mono"
              >
                {error}
              </motion.div>
            )}
          </div>

          {/* Preview */}
          <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] bg-black/40 rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center group">
            {/* Scanning Effect Overlay */}
            {isGenerating && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <motion.div 
                  className="w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{ position: 'absolute' }}
                />
                <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
              </div>
            )}

            <AnimatePresence mode="wait">
              {generatedImage ? (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="relative w-full h-full"
                >
                  <img 
                    src={generatedImage} 
                    alt="Generated concept" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Digital HUD Overlay on Image */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-emerald-500/50 uppercase tracking-widest pointer-events-none">
                    [ SYNTHESIS_COMPLETE ]<br/>
                    [ RESOLUTION: 1024x1024 ]<br/>
                    [ SOURCE: GEMINI_3.1_FLASH ]
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button 
                      onClick={downloadImage}
                      className="p-4 bg-emerald-500 text-black rounded-full hover:scale-110 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      title="Download Image"
                    >
                      <Download size={24} />
                    </button>
                    <button 
                      onClick={() => setGeneratedImage(null)}
                      className="p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors border border-white/10"
                      title="Clear"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-6 text-zinc-600 p-12 text-center"
                >
                  {isGenerating ? (
                    <div className="space-y-6 flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Activity size={32} className="text-emerald-500 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-mono text-xs text-emerald-500 uppercase tracking-[0.3em] animate-flicker">Synthesizing Neural Weights...</p>
                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-emerald-500"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <ImageIcon size={80} className="opacity-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Wand2 size={32} className="opacity-20 animate-pulse" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="font-mono text-xs uppercase tracking-[0.2em]">Awaiting Visual Input...</p>
                        <p className="text-[10px] text-zinc-700 uppercase tracking-widest max-w-[200px]">Enter a prompt to initialize the neural synthesis engine</p>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/10 rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/10 rounded-br-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

export default ImageLab;
