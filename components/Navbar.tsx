import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed w-full z-40 bg-space-900/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="font-display font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">
              DR
            </span>
          </div>
          {/* Links and Mobile Menu removed as requested */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
