import React, { useEffect } from 'react';

const StaticFavicon: React.FC = () => {
  useEffect(() => {
    // A static, simplified version of the SVG from Logo.tsx for the favicon
    const svgString = `
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#2D3748" />
        
        {/* Right Frame of circle */}
        <path d="M50,20 A22,22 0 0,1 72,42 A22,22 0 0,1 50,64 V60 A18,18 0 0,0 68,42 A18,18 0 0,0 50,24 V20 Z" fill="#E41E26"/>
        {/* The M shape */}
        <path d="M 71 47 L 71 54 L 78.5 31 V 82 H 85.5 V 23 H 78.5 L 71 47 Z" fill="#E41E26" />
        
        {/* Green P-shape */}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M 16 82 V 23 H 24 L 34.4 26.4 A 22 22 0 0 0 34.4 57.5 L 24 61 V 82 H 16 Z M 24 37 L 28.8 36.3 A 18 18 0 0 0 28.8 47.7 L 24 47 Z"
          fill="#009E4D"
        />
        
        {/* Handle */}
        <path d="M 46 64 V 82 H 54 V 64 Z" fill="#E41E26"/>

        {/* Lens */}
        <circle cx="50" cy="42" r="18" fill="white" />
        
        {/* Glare */}
        <path d="M37 31 Q 50 35, 63 56" stroke="rgba(255,255,255,0.6)" strokeWidth="3" strokeLinecap="round" />

        {/* Car group - static version */}
        <g transform="translate(0, -8)">
          {/* Wheels */}
          <g>
            <circle cx="44" cy="56" r="3.5" fill="#2D3748" />
            <circle cx="56" cy="56" r="3.5" fill="#2D3748" />
            <circle cx="44" cy="56" r="2" fill="#4A5568" />
            <circle cx="56" cy="56" r="2" fill="#4A5568" />
            <circle cx="44" cy="56" r="1" fill="#DCDCDC" />
            <circle cx="56" cy="56" r="1" fill="#DCDCDC" />
          </g>
          {/* Car Body */}
          <g>
            <path d="M38,56 V52 C40,50.5, 50,50.5, 52,51 L60,51 C62,51, 63,52, 63,54 V56 Z" fill="#D95B00" />
            <path d="M43,51 C42,48, 45,46, 48,46 H54 C57,46, 58,48, 57,51 Z" fill="#D95B00" />
            <path d="M45,50.5 L48,47.5 H53 L55.5,50.5 Z" fill="#A0E9FF" opacity="0.8"/>
            <path d="M38,52 C39,52, 39.5,52.5, 39.5,53 L38,53 Z" fill="white" opacity="0.9" />
            <path d="M63,54 C62,54, 61.5,53.5, 61.5,52.5 L63,52.5 Z" fill="#FF4136" opacity="0.9" />
          </g>
        </g>
      </svg>
    `;

    // Encode SVG for use in data URL
    const faviconUrl = `data:image/svg+xml;base64,${btoa(svgString.trim())}`;
    
    const link = document.getElementById('favicon') as HTMLLinkElement;
    if (link) {
      link.href = faviconUrl;
      link.type = "image/svg+xml";
    }
  }, []); // Run only once on component mount

  return null; // This component does not render anything to the DOM
};

export default StaticFavicon;
