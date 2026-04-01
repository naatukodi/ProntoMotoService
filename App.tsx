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
import CareersPage from "./pages/CareersPage";


const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
      <HashRouter>
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
              <Route path="/careers" element={<CareersPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
        <ChatbotFAB onOpen={() => setIsChatOpen(true)} />
        <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        <ScrollToTopButton />
      </HashRouter>
  );
};

export default App;
