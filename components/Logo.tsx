import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  isLoader?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', showText = true, className = '' }) => {
  const textColorClass = 'text-accent-orange';

  return (
    <Link
      to="/"
      className={`group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-accent-orange rounded-lg flex items-center ${className}`}
      aria-label="Vehga Inspections Private Limited Home"
    >
      <div className="h-20 flex-shrink-0 flex items-center overflow-visible">
        <img 
          src="https://res.cloudinary.com/drezjoynu/image/upload/v1774347886/1000133484-removebg-preview_oetjlc.png" 
          alt="Vehga Inspections Logo" 
          className="h-24 w-auto object-contain max-w-none transform translate-y-2"
          referrerPolicy="no-referrer"
        />
      </div>
    </Link>
  );
};

export default Logo;