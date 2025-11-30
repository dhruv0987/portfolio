import React, { useEffect, useState } from 'react';
import { useGeminiLive } from '../hooks/useGeminiLive';

const VoiceAgent: React.FC = () => {
  const { isConnect, isTalking, error, connect, disconnect, volume } = useGeminiLive();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close if disconnected
  useEffect(() => {
    if (!isConnect && isOpen && !error) {
      // Keep open if showing error, otherwise maybe close? 
      // Actually keeping it open to show the "Start" button again is better.
    }
  }, [isConnect, isOpen, error]);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Visualization calc
  // Volume is roughly 0-255. Map to scale.
  const scale = 1 + (volume / 255) * 0.5;
  const pulseColor = isTalking ? 'bg-neon-blue shadow-[0_0_30px_#00F0FF]' : 'bg-red-500 shadow-[0_0_20px_#FF003C]';
  const baseColor = isConnect ? (isTalking ? 'bg-neon-blue' : 'bg-green-500') : 'bg-slate-600';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Interface */}
      {isOpen && (
        <div className="mb-4 bg-space-800 border border-slate-700 rounded-lg p-6 w-80 shadow-2xl backdrop-blur-md bg-opacity-90">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-neon-blue font-display font-bold text-lg">DR-AI Agent</h3>
            <button onClick={toggleOpen} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>

          <div className="flex flex-col items-center justify-center h-40 bg-slate-950 rounded-md mb-4 relative overflow-hidden">
            {isConnect ? (
              <div 
                className={`w-16 h-16 rounded-full transition-all duration-100 ${isTalking ? 'bg-white' : 'bg-neon-blue'} blur-md`}
                style={{ transform: `scale(${scale})` }}
              />
            ) : (
               <div className="text-slate-500 text-sm text-center px-4">
                 Ready to chat about Dhruvesh?
               </div>
            )}
            
            {/* Status Text */}
            <div className="absolute bottom-2 text-xs text-slate-400 uppercase tracking-widest">
              {isConnect ? (isTalking ? "Speaking..." : "Listening...") : "Offline"}
            </div>
          </div>

          {error && (
            <div className="mb-4 text-xs text-red-400 bg-red-900/20 p-2 rounded border border-red-900">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            {!isConnect ? (
              <button 
                onClick={connect}
                className="flex-1 bg-neon-blue text-black font-bold py-2 rounded hover:bg-cyan-400 transition-colors uppercase text-sm tracking-wider"
              >
                Connect
              </button>
            ) : (
              <button 
                onClick={disconnect}
                className="flex-1 bg-red-600 text-white font-bold py-2 rounded hover:bg-red-500 transition-colors uppercase text-sm tracking-wider"
              >
                Disconnect
              </button>
            )}
          </div>
          <p className="mt-3 text-[10px] text-slate-500 text-center">
            Powered by Gemini 2.5 Flash Native Audio
          </p>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 ${isOpen ? 'bg-slate-700 text-white' : 'bg-neon-blue text-black'}`}
      >
        {!isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default VoiceAgent;
