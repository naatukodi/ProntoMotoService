import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTop from './components/ScrollToTop';
import AnimatedFavicon from './components/AnimatedFavicon';
import Chatbot from './components/Chatbot';
import ChatbotFAB from './components/ChatbotFAB';
import WhatsAppButton from './components/WhatsAppButton';


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);


  useEffect(() => {
    // Hide the loader after 5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <HashRouter>
        {isLoading ? (
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white animate-fadeIn p-4">
            <div className="w-32 sm:w-40 md:w-48">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logoTitle">
                <title id="logoTitle">Pronto Moto Services Icon</title>
                
                <rect width="100" height="100" rx="20" fill="transparent" />

                {/* --- STATIC PARTS --- */}
                {/* Right Frame of circle */}
                <path d="M50,20 A22,22 0 0,1 72,42 A22,22 0 0,1 50,64 V60 A18,18 0 0,0 68,42 A18,18 0 0,0 50,24 V20 Z" fill="#E41E26"/>
                {/* The M shape */}
                <path d="M 71 47 L 71 54 L 78.5 31 V 82 H 85.5 V 23 H 78.5 L 71 47 Z" fill="#E41E26" />
                
                {/* --- MOVING PARTS GROUP --- */}
                <g>
                  {/* Shadow */}
                  <circle cx="50" cy="42" r="25" fill="black" opacity="0.1" transform="translate(2, 2)" filter="url(#blur-filter)" />
                  
                  {/* Merged green P-shape for seamless appearance */}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M 16 82 V 23 H 24 L 34.4 26.4 A 22 22 0 0 0 34.4 57.5 L 24 61 V 82 H 16 Z M 24 37 L 28.8 36.3 A 18 18 0 0 0 28.8 47.7 L 24 47 Z"
                    fill="#009E4D"
                  />
                  
                  {/* Handle */}
                  <path d="M 46 64 V 82 H 54 V 64 Z" fill="#E41E26"/>

                  {/* Lens (radius adjusted) */}
                  <circle cx="50" cy="42" r="18" fill="white" />
                  
                  {/* Glare */}
                  <path d="M37 31 Q 50 35, 63 56" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />

                  {/* Car group with loader animation */}
                  <g 
                    transform="translate(0, -8)" 
                    className="transform-gpu transform-origin-center animate-loader-car-spin-and-lift animate-loader-car-glow"
                  >
                    {/* Ground Shadow */}
                    <ellipse cx="50" cy="60" rx="12" ry="2" fill="#2D3748" opacity="0.25" />
                    {/* Wheels (more detail) */}
                    <g>
                      <circle cx="44" cy="56" r="3.5" fill="#2D3748" />
                      <circle cx="56" cy="56" r="3.5" fill="#2D3748" />
                      <circle cx="44" cy="56" r="2" fill="#4A5568" />
                      <circle cx="56" cy="56" r="2" fill="#4A5568" />
                      <circle cx="44" cy="56" r="1" fill="#DCDCDC" />
                      <circle cx="56" cy="56" r="1" fill="#DCDCDC" />
                    </g>
                    {/* Car Body (sleeker design) */}
                    <g>
                      {/* Main Body */}
                      <path d="M38,56 V52 C40,50.5, 50,50.5, 52,51 L60,51 C62,51, 63,52, 63,54 V56 Z" fill="#D95B00" />
                      {/* Roof/Cabin */}
                      <path d="M43,51 C42,48, 45,46, 48,46 H54 C57,46, 58,48, 57,51 Z" fill="#D95B00" />
                      {/* Windows */}
                      <path d="M45,50.5 L48,47.5 H53 L55.5,50.5 Z" fill="#A0E9FF" opacity="0.8"/>
                      {/* Headlight */}
                      <path d="M38,52 C39,52, 39.5,52.5, 39.5,53 L38,53 Z" fill="white" opacity="0.9" />
                      {/* Taillight */}
                      <path d="M63,54 C62,54, 61.5,53.5, 61.5,52.5 L63,52.5 Z" fill="#FF4136" opacity="0.9" />
                    </g>
                  </g>
                </g>

                <defs>
                  <filter id="blur-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>
                </defs>
              </svg>
            </div>
            <div className="text-center mt-4">
              <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tighter text-primary-dark">
                <span className="text-accent-green">PRONTO </span>
                <span className="text-accent-red">MOTO </span>
                <span className="text-accent-orange">SERVICES</span>
              </div>
              <p className="mt-2 text-base font-semibold text-gray-500 tracking-wider">
                We measure precise values
              </p>
            </div>
          </div>
        ) : (
          <>
            <AnimatedFavicon />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen text-gray-800 font-sans animate-pageFadeIn">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <WhatsAppButton />
            <ChatbotFAB onOpen={() => setIsChatOpen(true)} />
            <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <ScrollToTopButton />
          </>
        )}
      </HashRouter>
  );
};

export default App;
