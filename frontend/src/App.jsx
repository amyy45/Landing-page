// App.jsx
import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Phone validation (basic - at least 10 digits)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setError('Please enter a valid phone number (at least 10 digits)');
      setIsSubmitting(false);
      return;
    }

    try {
      // Use environment variable or default to your Render backend URL
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

      // Success
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '' });
      
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              VelocityLaunch
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com" 
              className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-105"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content - Full Screen Layout */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 lg:mb-16">
              <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                <span className="text-sm font-medium text-blue-400">🚀 Next-Gen Startup Platform</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
                Build <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Faster
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl opacity-30"></span>
                </span>
                .
                <br />
                Launch <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
                    Smarter
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-30"></span>
                </span>
                .
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-5xl mx-auto mb-8 leading-relaxed">
                We help ambitious startups validate ideas, capture qualified leads, and accelerate growth with precision.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column - Features & Stats */}
              <div className="space-y-8">
                <div className="bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800/50 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Accelerate Your Growth
                      </h3>
                      <p className="text-gray-400 text-sm">Skip months of trial & error</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    Our intelligent platform helps founders validate startup ideas in days, not months, with data-driven insights and expert guidance.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { text: "Idea validation in 72 hours", icon: "⏱️", color: "from-green-500 to-emerald-500" },
                      { text: "Pre-built landing pages", icon: "🎨", color: "from-blue-500 to-cyan-500" },
                      { text: "Automated lead qualification", icon: "🤖", color: "from-purple-500 to-pink-500" },
                      { text: "Investor-ready analytics", icon: "📊", color: "from-amber-500 to-orange-500" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center group">
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <span className="text-gray-200 group-hover:text-white transition-colors duration-300">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "500+", label: "Startups", color: "border-blue-500/30", valueColor: "text-blue-400" },
                    { value: "94%", label: "Success Rate", color: "border-emerald-500/30", valueColor: "text-emerald-400" },
                    { value: "24h", label: "Response Time", color: "border-purple-500/30", valueColor: "text-purple-400" }
                  ].map((stat, index) => (
                    <div key={index} className={`bg-gray-900/40 backdrop-blur-xl rounded-2xl p-5 text-center border ${stat.color} hover:scale-105 transition-all duration-300`}>
                      <div className={`text-2xl font-bold ${stat.valueColor} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Form */}
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
                      Success! We're on it.
                    </h3>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-md mx-auto">
                      Thank you for choosing VelocityLaunch. Our team will reach out within 24 hours to discuss your project and next steps.
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
                      <h2 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Launch Your Vision Today
                      </h2>
                      <p className="text-gray-400 text-lg">
                        Join the elite 6% of startups that launch successfully. Enter your details to begin.
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

                    <form onSubmit={handleSubmit} className="space-y-7">
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
                              className="w-full px-5 py-4 bg-gray-900/60 border border-gray-700 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white placeholder-gray-500 transition-all duration-300 group-hover:border-gray-600"
                              placeholder={field.placeholder}
                            />
                            <div className="absolute inset-0 border border-transparent rounded-xl group-hover:border-gray-600/50 pointer-events-none transition-all duration-300"></div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-700 hover:via-blue-600 hover:to-cyan-600 text-white py-5 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        <span className="relative flex items-center justify-center">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                              Processing Your Request...
                            </>
                          ) : (
                            <>
                              Get Started Now
                              <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </>
                          )}
                        </span>
                      </button>
                    </form>

                    <p className="text-gray-500 text-sm mt-8 text-center">
                      By submitting, you agree to our{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Privacy Policy</a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Terms of Service</a>.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Trusted By Section */}
            <div className="mt-16 lg:mt-20">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Trusted by Visionary Founders
                </h3>
                <p className="text-gray-400 max-w-3xl mx-auto">
                  Join founders who transformed their ideas into successful ventures with our platform
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { quote: "VelocityLaunch helped us validate our AI startup in 72 hours. Game-changing platform!", author: "Sarah Chen", role: "Founder, NeuroTech AI" },
                  { quote: "The automated lead qualification saved us months of manual work. Incredible ROI.", author: "Michael Torres", role: "CEO, CloudFlow" },
                  { quote: "From idea to MVP in 30 days. This platform is what every founder needs.", author: "Alex Johnson", role: "CTO, Streamline" }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-gray-900/40 backdrop-blur-xl p-6 rounded-2xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
                    <div className="text-4xl mb-4 text-gray-600">"</div>
                    <p className="text-gray-300 mb-6 leading-relaxed">{testimonial.quote}</p>
                    <div>
                      <div className="font-semibold">{testimonial.author}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-gray-800/50 mt-12 lg:mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded"></div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  VelocityLaunch
                </span>
              </div>
              <p className="text-gray-500 text-sm">© {new Date(Date.now()).getFullYear()} VelocityLaunch. All rights reserved.</p>
            </div>
            <div className="flex space-x-8">
              {["Privacy", "Terms", "Contact", "Careers"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-105"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;