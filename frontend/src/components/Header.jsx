// components/Header.jsx
import React, { useState } from 'react';

const Header = ({ activeSection, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['hero', 'features', 'process', 'contact'];

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative container mx-auto px-4 md:px-1 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-8">
          {navItems.map((section) => (
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

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => scrollToSection('contact')}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 text-sm sm:px-6 sm:py-2 sm:text-base rounded-lg font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Get Started
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-gray-800/50 rounded-b-2xl shadow-2xl z-50 mt-2">
          <div className="flex flex-col py-4 px-4">
            {navItems.map((section) => (
              <button
                key={section}
                onClick={() => handleNavClick(section)}
                className={`text-left py-3 px-4 rounded-lg transition-all duration-300 ${
                  activeSection === section
                    ? 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  {activeSection === section && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  )}
                  <span className="font-medium">
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;