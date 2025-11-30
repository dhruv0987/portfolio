import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-space-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            <span className="text-neon-blue">Python</span> Protocols
          </h2>
          <div className="h-1 w-20 bg-neon-blue"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <div key={index} className="bg-space-900 border border-gray-800 p-6 rounded-lg hover:border-neon-blue transition-colors duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-gray-800 rounded group-hover:bg-neon-blue/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 h-20 overflow-hidden">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 text-xs font-mono text-neon-blue border border-neon-blue/30 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
