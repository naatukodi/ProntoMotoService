import React, { useState, useEffect } from 'react';
import { FOOTER_CONTACT_INFO } from '../constants';
import { WhatsAppIcon } from './icons/SocialIcons';

const WhatsAppButton: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Trigger intro animation on mount
  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 1000); // Delay for page load
    return () => clearTimeout(mountTimer);
  }, []);

  const phoneNumber = FOOTER_CONTACT_INFO.phone1.replace(/[\s+-]/g, '');
  const message = encodeURIComponent("Hello! I saw your website and I'm interested in your services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-8 left-8 z-40 w-14 h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-2xl transition-all duration-500 ease-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-400/50 ${
        isMounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      } animate-whatsapp-pulse`}
      aria-label="Chat on WhatsApp"
    >
      <div className="w-7 h-7">
        <WhatsAppIcon />
      </div>
    </a>
  );
};

export default WhatsAppButton;