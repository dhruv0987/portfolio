import React from 'react';
import { playHoverSound } from '../utils/audio';

const Hero: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-900">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-neon-blue font-display tracking-wider text-sm md:text-base mb-4 animate-pulse">
          SYSTEM ONLINE // WELCOME
        </h2>
        <h1 className="text-5xl md:text-8xl font-bold font-display text-white mb-6 tracking-tight">
          DHRUVESH RAJ
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 font-sans leading-relaxed">
          Python Developer | Sim Racer | Space Enthusiast
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://github.com/dhruv0987" 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={playHoverSound}
            className="px-8 py-3 rounded bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 font-bold font-display uppercase tracking-widest text-sm"
          >
            View Work
          </a>
          <a 
            href="https://youtube.com/@DhruveshAri" 
            target="_blank" 
            rel="noopener noreferrer" 
            onMouseEnter={playHoverSound}
            className="px-8 py-3 rounded bg-red-600 text-white hover:bg-red-700 transition-all duration-300 font-bold font-display uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <span>Watch</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
