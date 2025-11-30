import React from 'react';

const Rocket: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* The Rocket Container */}
      <div className="absolute animate-rocket-fly">
        <div className="relative transform rotate-45">
          {/* Rocket Body */}
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
          >
             <path
              d="M12.97 3.056c-1.35-1.428-3.59-1.428-4.94 0l-.82.868c-.67.71-1.02 1.66-.96 2.63l.18 2.82c-.68.25-1.34.58-1.95 1.01l-.22.15c-.94.67-1.33 1.88-.93 2.96l.8 2.16c.39 1.06 1.56 1.63 2.64 1.28l.21-.07c1.37-.44 2.85-.44 4.22 0l.21.07c1.08.35 2.25-.22 2.64-1.28l.8-2.16c.4-1.08.01-2.29-.93-2.96l-.22-.15a8.96 8.96 0 0 0-1.95-1.01l.18-2.82c.06-.97-.29-1.92-.96-2.63l-.82-.868z"
              fill="currentColor"
            />
             <path
              d="M12 16v4m0 0v2m0-2h-2m2 0h2"
              stroke="#FF003C"
              strokeWidth="2"
              strokeLinecap="round"
             />
          </svg>
          
          {/* Engine Flame Animation */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-4 h-12 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent blur-[2px] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Rocket;
