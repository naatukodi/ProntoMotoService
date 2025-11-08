import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  isLoader?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', showText = true, isLoader = false }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Increment key on route change to re-trigger the animation
    if (!isLoader) { // Only re-trigger for non-loader logos
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [location.pathname, isLoader]);

  const textColorClass = variant === 'dark' ? 'text-white' : 'text-primary-dark';

  return (
    <Link
      to="/"
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark focus-visible:ring-accent-orange rounded-lg flex items-center space-x-3"
      aria-label="Pronto Moto Services Home"
    >
      <div className="w-12 h-12 flex-shrink-0">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logoTitle">
          <title id="logoTitle">Pronto Moto Services Icon</title>
          
          <rect width="100" height="100" rx="20" fill="transparent" />

          {/* --- STATIC PARTS --- */}
          {/* Right Frame of circle */}
          <path d="M50,20 A22,22 0 0,1 72,42 A22,22 0 0,1 50,64 V60 A18,18 0 0,0 68,42 A18,18 0 0,0 50,24 V20 Z" fill="#E41E26"/>
          {/* The M shape */}
          <path d="M 71 47 L 71 54 L 78.5 31 V 82 H 85.5 V 23 H 78.5 L 71 47 Z" fill="#E41E26" />
          
          {/* --- MOVING PARTS GROUP --- */}
          <g className="transition-transform duration-500 ease-in-out origin-bottom transform-gpu group-hover:rotate-[-4deg]">
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

            {/* Car group with hover and load animation */}
            <g 
              key={animationKey}
              transform="translate(0, -8)" 
              className={`transition-all duration-500 ease-in-out transform-gpu transform-origin-center group-hover:scale-[1.4] ${isLoader ? 'animate-loader-car-spin-and-lift animate-loader-car-glow' : 'animate-car-intro-lift animate-car-intro-glow'} group-hover:drop-shadow-[0_4px_8px_rgba(249,115,22,0.6)]`}
            >
              {/* Ground Shadow */}
              <ellipse cx="50" cy="60" rx="12" ry="2" fill="#2D3748" opacity="0.25" className="transition-all duration-300 ease-out group-hover:rx-16 group-hover:opacity-15"/>
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
                <path d="M38,56 V52 C40,50.5, 50,50.5, 52,51 L60,51 C62,51, 63,52, 63,54 V56 Z" fill="#D95B00" className="transition-colors duration-300 group-hover:fill-orange-500" />
                {/* Roof/Cabin */}
                <path d="M43,51 C42,48, 45,46, 48,46 H54 C57,46, 58,48, 57,51 Z" fill="#D95B00" className="transition-colors duration-300 group-hover:fill-orange-500" />
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
      {showText && (
        <div className={`${textColorClass} hidden sm:block`}>
          <div className="font-extrabold text-base leading-tight tracking-tighter">
            <span className="text-accent-green">PRONTO </span>
            <span className="text-accent-red">MOTO </span>
            <span className="text-accent-orange">SERVICES</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default Logo;