// components/Header.jsx
import React from 'react';

const Header = ({ activeSection, scrollToSection }) => {
  return (
    <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            OnBoardly
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {['hero', 'features', 'process', 'pricing', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                activeSection === section 
                  ? 'text-blue-400 border-b-2 border-blue-500 pb-1' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Header;