// components/Footer.jsx
import React from 'react';

const Footer = ({ scrollToSection }) => {
  const handleInternalLink = (e, sectionId) => {
    e.preventDefault();
    if (scrollToSection) {
      scrollToSection(sectionId);
    } else {
      // Fallback: scroll to section manually
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative border-t border-gray-800/50 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                OnBoardly
              </span>
            </div>
            <p className="text-gray-500 text-sm sm:text-base">
              The complete platform for launching and scaling startups.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleInternalLink(e, 'features')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleInternalLink(e, 'pricing')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleInternalLink(e, 'process')}
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Process
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Blog coming soon!');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Documentation coming soon!');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Careers page coming soon!');
                  }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://twitter.com/onboardly" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/company/onboardly" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="mailto:support@onboardly.com" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800/50 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} OnBoardly. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <a 
                href="#" 
                onClick={(e) => {
                    e.preventDefault();
                    alert('Terms of Service coming soon!');
                }}
                className="text-gray-500 hover:text-gray-400 text-xs sm:text-sm transition-colors"
            >
              Terms of Service
            </a>
            <a 
                href="#" 
                onClick={(e) => {
                    e.preventDefault();
                    alert('Privacy Policy coming soon!');
                }}
                className="text-gray-500 hover:text-gray-400 text-xs sm:text-sm transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;