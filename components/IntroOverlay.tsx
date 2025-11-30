import React from 'react';

interface IntroOverlayProps {
  onStart: () => void;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-space-800 via-black to-black opacity-80"></div>
      
      <div className="relative z-10 text-center space-y-8">
        <div className="w-24 h-24 mx-auto rounded-full border-2 border-neon-red flex items-center justify-center animate-spin-slow">
            <div className="w-20 h-20 rounded-full border border-neon-blue animate-ping"></div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-widest uppercase">
          Dhruvesh Raj
        </h1>
        <p className="text-neon-blue font-mono text-sm md:text-base animate-pulse">
          INITIALIZING PORTFOLIO PROTOCOLS...
        </p>

        <button
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-display font-medium text-white transition-all duration-300 bg-transparent border-2 border-white rounded-none hover:bg-white hover:text-black focus:outline-none"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
          <span className="relative flex items-center gap-3">
             ENTER SYSTEM
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
               <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
             </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default IntroOverlay;
