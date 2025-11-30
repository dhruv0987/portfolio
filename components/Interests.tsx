import React from 'react';

const Interests: React.FC = () => {
  return (
    <>
      {/* Sim Racing Section */}
      <section id="racing" className="py-20 bg-black relative overflow-hidden">
        {/* Decorative Track Lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%">
             <path d="M-100,50 Q400,50 600,300 T1200,400" fill="none" stroke="#FF003C" strokeWidth="50" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <h2 className="text-4xl md:text-6xl font-display font-bold italic text-white mb-6">
                 ASSETTO <span className="text-neon-red">CORSA</span>
               </h2>
               <p className="text-gray-300 text-lg mb-6">
                 Sim racing isn't just a game; it's about physics, engineering, and pushing the limits of grip. I compete in endurance leagues and focus on telemetry analysis to shave off tenths of a second.
               </p>
               <ul className="space-y-4 font-mono text-sm text-gray-400">
                 <li className="flex items-center">
                   <span className="w-2 h-2 bg-neon-red mr-3 rounded-full"></span>
                   Favorite Class: GT3
                 </li>
                 <li className="flex items-center">
                   <span className="w-2 h-2 bg-neon-red mr-3 rounded-full"></span>
                   Hardware: Direct Drive Wheelbase
                 </li>
                 <li className="flex items-center">
                   <span className="w-2 h-2 bg-neon-red mr-3 rounded-full"></span>
                   Software: Custom Shaders Patch & Sol
                 </li>
               </ul>
            </div>
            <div className="w-full md:w-1/2 bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-neon-red/20 h-64 md:h-80 flex items-center justify-center">
               <div className="text-center">
                 <svg className="w-16 h-16 text-neon-red mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                 </svg>
                 <span className="font-display font-bold text-xl">RACING STATS</span>
                 <p className="text-xs text-gray-500 mt-2">Data Viz Incoming...</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Space Section */}
      <section id="space" className="py-20 bg-space-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-12">
            ROCKETRY & <span className="text-purple-500">SPACE</span>
          </h2>
          
          <div className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-900 to-black border border-indigo-500/30">
            <div className="absolute top-0 right-0 p-4">
              <svg className="w-8 h-8 text-white opacity-50 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
              My interest goes beyond just watching launches. I actively study orbital mechanics, propulsion physics, and the engineering challenges of interplanetary travel. I'm fascinated by the reusable rocket architecture and the future of humanity as a multi-planetary species.
            </p>

            <a href="https://druvlearn.blogspot.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 hover:text-white rounded-full transition-all duration-300 font-display text-sm tracking-wider uppercase group">
              <span>Read My Research Papers</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Interests;
