import React, { useState, useEffect } from 'react';
import { ChatIcon } from './icons/FeatureIcons';

interface ChatbotFABProps {
  onOpen: () => void;
}

const ChatbotFAB: React.FC<ChatbotFABProps> = ({ onOpen }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger intro animation on mount
  useEffect(() => {
    const mountTimer = setTimeout(() => setIsMounted(true), 500); // Delay for page load
    return () => clearTimeout(mountTimer);
  }, []);
  
  // Trigger periodic attention-grabbing animation
  useEffect(() => {
    if (!isMounted) return; // Don't start until mounted
    const animationInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000); // Animation duration
    }, 8000); // Trigger every 8 seconds

    return () => clearInterval(animationInterval);
  }, [isMounted]);

  return (
    <button
      onClick={onOpen}
      className={`fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 group block transform transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      aria-label="Open AI Chat Assistant"
    >
      <div
        className={`relative flex items-center gap-2 sm:gap-3 bg-white rounded-full shadow-2xl p-1.5 pr-4 sm:p-2 sm:pr-5 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-teal-700/30 ${isAnimating ? 'animate-fab-tada' : ''}`}
      >
        {/* Pulsing Avatar */}
        <div className="relative">
            <div className="flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-teal-600 to-teal-800 text-white rounded-full transition-transform duration-300 group-hover:rotate-12">
                <div className="w-6 h-6 sm:w-8 sm:h-8">
                    <ChatIcon />
                </div>
            </div>
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full animate-ai-pulse border-2 border-teal-700/50"></div>
        </div>
        
        {/* Text content */}
        <div className="text-left">
            <p className="font-bold text-gray-800 leading-tight text-sm sm:text-base">AI Assistant</p>
            <p className="text-xs text-gray-500 leading-tight">Ask me anything!</p>
        </div>
      </div>
    </button>
  );
};

export default ChatbotFAB;