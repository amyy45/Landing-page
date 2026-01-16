import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('hero');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits)');
      setIsSubmitting(false);
      return;
    }

    try {
      const BACKEND_API = import.meta.env.VITE_BACKEND_API || 'http://localhost:5050/leads';
      
      const response = await fetch(BACKEND_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed. Please try again.');
      }

      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header Component */}
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen min-w-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
              <span className="text-lg font-medium text-blue-400">🚀 The All-in-One Startup Launch Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Launch Your Startup
              <br />
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  In Days, Not Months
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl opacity-30"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto mb-12 leading-relaxed">
              From idea validation to investor meetings, OnBoardly provides everything you need to launch and scale your startup successfully.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white py-5 px-10 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                Start Free Trial
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="bg-gray-900/60 border border-gray-700 text-white py-5 px-10 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A comprehensive suite of tools designed specifically for modern startups
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: "🚀",
                  title: "Idea Validation",
                  description: "Test your startup idea with real users in 72 hours using our validation framework.",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: "📊",
                  title: "Market Analytics",
                  description: "Access real-time market data and competitor analysis to make informed decisions.",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: "🤖",
                  title: "AI Assistant",
                  description: "Get personalized recommendations and insights from our AI startup advisor.",
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  icon: "🎯",
                  title: "Lead Generation",
                  description: "Automatically capture and qualify leads with smart forms and scoring.",
                  gradient: "from-orange-500 to-amber-500"
                },
                {
                  icon: "📈",
                  title: "Growth Tracking",
                  description: "Monitor your startup's progress with detailed analytics and KPIs.",
                  gradient: "from-indigo-500 to-blue-500"
                },
                {
                  icon: "🤝",
                  title: "Investor Network",
                  description: "Connect with pre-vetted investors ready to fund promising startups.",
                  gradient: "from-rose-500 to-pink-500"
                }
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                How OnBoardly Works
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A streamlined process that takes you from idea to launch in record time
              </p>
            </div>
            
            <div className="relative">
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 -translate-y-1/2"></div>
              
              <div className="grid lg:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Idea Submission", desc: "Share your startup idea with our platform" },
                  { step: "02", title: "Validation", desc: "Get real user feedback within 72 hours" },
                  { step: "03", title: "Development", desc: "Access tools to build and test your MVP" },
                  { step: "04", title: "Launch & Scale", desc: "Go to market with confidence and support" }
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Form Section */}
      <section id="contact" className="relative py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Ready to Launch?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Join thousands of successful founders who trusted OnBoardly with their startup journey. Get started with a 14-day free trial.
                </p>
                
                <div className="space-y-6">
                  {[
                    { icon: "✅", text: "No credit card required" },
                    { icon: "🚀", text: "Full platform access" },
                    { icon: "🤝", text: "Dedicated support" },
                    { icon: "📊", text: "Analytics dashboard" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <span className="text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Form Card */}
              <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-800/50 shadow-2xl">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="relative w-28 h-28 mx-auto mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-xl opacity-50"></div>
                      <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                        <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      You're On Board!
                    </h3>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                      Welcome to OnBoardly! Check your email for next steps. Our team will contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      Submit Another Response
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Start Your Free Trial
                      </h3>
                      <p className="text-gray-400">
                        Enter your details to begin your 14-day free trial
                      </p>
                    </div>

                    {error && (
                      <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl mb-8 backdrop-blur-sm">
                        <div className="flex items-center">
                          <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{error}</span>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {[
                        { id: "name", label: "Full Name", placeholder: "Alex Johnson", type: "text" },
                        { id: "email", label: "Work Email", placeholder: "alex@startup.com", type: "email" },
                        { id: "phone", label: "Phone Number", placeholder: "(123) 456-7890", type: "tel" }
                      ].map((field) => (
                        <div key={field.id} className="group">
                          <label htmlFor={field.id} className="block text-sm font-medium text-gray-300 mb-3">
                            {field.label} *
                          </label>
                          <div className="relative">
                            <input
                              type={field.type}
                              id={field.id}
                              name={field.id}
                              required
                              value={formData[field.id]}
                              onChange={handleChange}
                              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all duration-300"
                              placeholder={field.placeholder}
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white py-5 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Processing...
                            </>
                          ) : (
                            'Start Free Trial'
                          )}
                        </span>
                      </button>
                    </form>

                    <p className="text-gray-500 text-sm mt-8 text-center">
                      By signing up, you agree to our{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms</a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;