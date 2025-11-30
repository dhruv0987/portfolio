import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Interests from './components/Interests';
import VoiceAgent from './components/VoiceAgent';
import Rocket from './components/Rocket';
import IntroOverlay from './components/IntroOverlay';
import IntroSequence from './components/IntroSequence';

type AppState = 'initial' | 'sequence' | 'main';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('initial');
  const launchAudioRef = useRef<HTMLAudioElement | null>(null);
  const landingAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleStart = () => {
    setAppState('sequence');
    
    // Play Launch Audio immediately
    if (launchAudioRef.current) {
      launchAudioRef.current.volume = 1.0;
      launchAudioRef.current.play().catch(e => {
        console.error("Launch audio playback failed:", e);
        // Fallback if audio fails: auto transition after 20s
        setTimeout(() => setAppState('main'), 20000);
      });
    }
  };

  const handleAudioEnd = () => {
    setAppState('main');
  };

  // Handle Main State Entry (Landing Audio)
  useEffect(() => {
    if (appState === 'main' && landingAudioRef.current) {
      landingAudioRef.current.volume = 1.0;
      landingAudioRef.current.play().catch(e => console.error("Landing audio failed:", e));
    }
  }, [appState]);

  return (
    <>
      {/* Background Audio 1 - NASA Apollo 11 Countdown */}
      <audio 
        ref={launchAudioRef} 
        crossOrigin="anonymous"
        onEnded={handleAudioEnd}
      >
          <source src="https://www.nasa.gov/wp-content/uploads/2015/01/590320main_ringtone_apollo11_countdown.mp3" type="audio/mpeg" />
      </audio>

      {/* Background Audio 2 - Eagle Has Landed */}
      <audio 
        ref={landingAudioRef} 
        crossOrigin="anonymous"
      >
          <source src="https://www.nasa.gov/wp-content/uploads/2015/01/569462main_eagle_has_landed.mp3" type="audio/mpeg" />
      </audio>

      {/* Stage 1: Click to Start */}
      {appState === 'initial' && <IntroOverlay onStart={handleStart} />}

      {/* Stage 2: Intro Animation (Synced to Audio) */}
      {appState === 'sequence' && <IntroSequence />}
      
      {/* Stage 3: Main Website */}
      <div className={`min-h-screen bg-space-900 text-white selection:bg-neon-blue selection:text-black transition-opacity duration-1000 ${appState === 'main' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        <Navbar />
        <Rocket />
        <main className="relative z-10">
          <Hero />
          <Interests />
        </main>
        
        <footer className="bg-black py-8 border-t border-gray-900 relative z-10">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Dhruvesh Raj. All systems nominal.</p>
            <div className="flex justify-center space-x-6 mt-4">
               <a href="https://github.com/dhruv0987" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">GitHub</a>
               <a href="https://youtube.com/@DhruveshAri" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">YouTube</a>
               <a href="https://druvlearn.blogspot.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neon-blue transition-colors">Blog</a>
            </div>
          </div>
        </footer>

        {/* The AI Assistant Overlay */}
        <VoiceAgent />
      </div>
    </>
  );
};

export default App;