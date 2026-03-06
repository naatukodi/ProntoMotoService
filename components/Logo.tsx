import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/vehga-logo.png';

interface LogoProps {
  variant?: 'light' | 'dark';
  showText?: boolean;
  isLoader?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'dark', showText = true, isLoader = false }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (!isLoader) {
      setAnimationKey(prevKey => prevKey + 1);
    }
  }, [location.pathname, isLoader]);

  const textColorClass = variant === 'dark' ? 'text-white' : 'text-primary-dark';

  return (
    <Link
      to="/"
      className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark focus-visible:ring-accent-orange rounded-lg flex items-center space-x-3"
      aria-label="Vehga Inspections Private Limited Home"
    >
      <div className="w-12 h-12 flex-shrink-0 flex items-center">
        <img
          src={logo}
          alt="Vehga Inspections Private Limited Logo"
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {showText && (
        <div className="hidden sm:block">
          <div className="font-extrabold text-base leading-tight tracking-tight text-primary">
            VEHGA INSPECTIONS PVT LTD
          </div>
        </div>
      )}
    </Link>
  );
};

export default Logo;