import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { SunIcon, MoonIcon } from './icons/ThemeIcons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark focus:ring-accent-orange transition-colors duration-300"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
        <div className={`transition-transform duration-500 ease-in-out ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`}>
            <MoonIcon />
        </div>
         <div className={`absolute transition-transform duration-500 ease-in-out ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`}>
            <SunIcon />
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
