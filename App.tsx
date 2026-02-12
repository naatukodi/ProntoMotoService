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
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-labelledby="logoTitle"
            >
              <title id="logoTitle">
                Vehga Inspections Private Limited Icon
              </title>

              <rect width="100" height="100" rx="20" fill="transparent" />

              {/* Right Frame */}
              <path
                d="M50,20 A22,22 0 0,1 72,42 A22,22 0 0,1 50,64 V60 A18,18 0 0,0 68,42 A18,18 0 0,0 50,24 V20 Z"
                fill="#E41E26"
              />

              {/* Letter Shape */}
              <path
                d="M 71 47 L 71 54 L 78.5 31 V 82 H 85.5 V 23 H 78.5 L 71 47 Z"
                fill="#E41E26"
              />

              <g>
                <circle
                  cx="50"
                  cy="42"
                  r="25"
                  fill="black"
                  opacity="0.1"
                  transform="translate(2, 2)"
                  filter="url(#blur-filter)"
                />

                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M 16 82 V 23 H 24 L 34.4 26.4 A 22 22 0 0 0 34.4 57.5 L 24 61 V 82 H 16 Z"
                  fill="#009E4D"
                />

                <path d="M 46 64 V 82 H 54 V 64 Z" fill="#E41E26" />

                <circle cx="50" cy="42" r="18" fill="white" />

                <g
                  transform="translate(0, -8)"
                  className="transform-gpu transform-origin-center animate-loader-car-spin-and-lift animate-loader-car-glow"
                >
                  <ellipse
                    cx="50"
                    cy="60"
                    rx="12"
                    ry="2"
                    fill="#2D3748"
                    opacity="0.25"
                  />

                  <g>
                    <circle cx="44" cy="56" r="3.5" fill="#2D3748" />
                    <circle cx="56" cy="56" r="3.5" fill="#2D3748" />
                  </g>

                  <path
                    d="M38,56 V52 C40,50.5, 50,50.5, 52,51 L60,51 C62,51, 63,52, 63,54 V56 Z"
                    fill="#D95B00"
                  />
                </g>
              </g>

              <defs>
                <filter id="blur-filter">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                </filter>
              </defs>
            </svg>
          </div>

          {/* Updated Company Name */}
          <div className="text-center mt-4">
            <div className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight tracking-tight text-primary-dark">
              <span className="text-accent-green">VEHGA </span>
              <span className="text-accent-red">INSPECTIONS </span>
              <span className="text-accent-orange">
                PRIVATE LIMITED
              </span>
            </div>

            <p className="mt-2 text-base font-semibold text-gray-500 tracking-wider">
              Delivering Accurate & Reliable Inspection Services
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
                <Route
                  path="/privacy-policy"
                  element={<PrivacyPolicyPage />}
                />
                <Route
                  path="/terms-of-service"
                  element={<TermsOfServicePage />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
          <WhatsAppButton />
          <ChatbotFAB onOpen={() => setIsChatOpen(true)} />
          <Chatbot
            isOpen={isChatOpen}
            onClose={() => setIsChatOpen(false)}
          />
          <ScrollToTopButton />
        </>
      )}
    </HashRouter>
  );
};

export default App;
