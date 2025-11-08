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
      className={`fixed bottom-5 right-5 z-40 group block transform transition-all duration-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      aria-label="Open AI Chat Assistant"
    >
      <div
        className={`relative flex items-center gap-3 bg-white rounded-full shadow-2xl p-2 pr-5 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-accent-orange/30 border-2 border-transparent group-hover:border-accent-orange ${isAnimating ? 'animate-fab-tada' : ''}`}
      >
        {/* Pulsing Avatar */}
        <div className="relative">
            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-accent-orange to-orange-500 text-white rounded-full transition-transform duration-300 group-hover:rotate-12">
                <div className="w-8 h-8">
                    <ChatIcon />
                </div>
            </div>
            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full animate-ai-pulse border-2 border-accent-orange"></div>
        </div>
        
        {/* Text content */}
        <div className="text-left">
            <p className="font-bold text-primary-dark leading-tight">AI Assistant</p>
            <p className="text-sm text-gray-500 leading-tight">Ask me anything!</p>
        </div>
      </div>
    </button>
  );
};

export default ChatbotFAB;