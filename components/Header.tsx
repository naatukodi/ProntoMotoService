
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, CORE_SERVICES } from '../constants';
import { HamburgerIcon, CloseIcon } from './icons/MenuIcons';
import Logo from './Logo';

const ShimmerButton: React.FC<{ to: string, children: React.ReactNode, className?: string, style?: React.CSSProperties, onClick?: () => void }> = ({ to, children, className = '', style, onClick }) => {
  return (
    <Link
      to={to}
      style={style}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden transition-all duration-300 group ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-white/20 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></span>
    </Link>
  )
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const servicesMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close menus on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle body scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  // Handle header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // check on initial render
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleServicesMenuEnter = () => {
    if (servicesMenuTimer.current) clearTimeout(servicesMenuTimer.current);
    setIsServicesMenuOpen(true);
  };

  const handleServicesMenuLeave = () => {
    servicesMenuTimer.current = setTimeout(() => {
      setIsServicesMenuOpen(false);
    }, 200);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3 py-2 rounded-md text-sm font-bold transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:bg-accent-orange after:transition-all after:duration-300 hover:after:w-full text-gray-300 hover:text-white ${
      isActive ? 'after:w-full text-white' : 'after:w-0'
    }`;

  const headerClasses = `sticky top-0 z-40 transition-all duration-300 ${isScrolled
    ? 'bg-primary-dark/85 backdrop-blur-lg shadow-2xl border-b border-white/10'
    : 'bg-primary-dark'}`;
  
  const iconClasses = 'text-gray-300 hover:text-white';

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-2">
              {NAV_LINKS.map((link) => (
                link.to === '/services' ? (
                  <div 
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleServicesMenuEnter}
                    onMouseLeave={handleServicesMenuLeave}
                  >
                    <NavLink to={link.to} className={getLinkClass} aria-haspopup="true" aria-expanded={isServicesMenuOpen}>
                      {link.label}
                    </NavLink>
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 transition-all duration-300 ease-in-out ${isServicesMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
                    >
                      <div className="bg-primary-dark/95 backdrop-blur-xl rounded-lg shadow-2xl border border-white/10 w-96 p-6">
                        <div className="space-y-4">
                          {CORE_SERVICES.map(service => (
                            <Link 
                              key={service.title} 
                              to="/services" 
                              onClick={() => setIsServicesMenuOpen(false)}
                              className="group flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors"
                            >
                              <div className="flex-shrink-0 w-8 h-8 text-accent-orange mr-4 mt-1 transition-transform duration-300 group-hover:scale-110">
                                {service.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-white group-hover:text-accent-orange transition-colors">{service.title}</h4>
                                <p className="text-sm text-gray-400 line-clamp-2">{service.description}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink key={link.label} to={link.to} className={getLinkClass}>
                    {link.label}
                  </NavLink>
                )
              ))}
              <ShimmerButton
                to="/contact"
                className="ml-4 bg-accent-orange text-white font-bold py-2 px-5 rounded-lg text-sm uppercase transform hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/30"
              >
                Get a Quote
              </ShimmerButton>
            </nav>
            {/* Mobile Menu Button */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                type="button"
                className={`bg-transparent inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange transition-all ml-2 ${iconClasses}`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={`fixed inset-0 z-[60] md:hidden ${!isMenuOpen && 'pointer-events-none'}`}
      >
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-out ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div 
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-full max-w-xs bg-primary-dark shadow-xl transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                type="button"
                className={`bg-transparent inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-orange ${iconClasses}`}
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon />
              </button>
            </div>
            <nav className="flex flex-col space-y-2">
              <span id="mobile-menu-title" className="sr-only">Main Menu</span>
              {NAV_LINKS.map((link, index) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-lg font-medium transition-all duration-500 ease-out ${
                      isActive ? 'bg-accent-orange text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`
                  }
                  style={{ transitionDelay: `${150 + index * 60}ms` }}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto border-t border-gray-700 pt-6 space-y-6">
                <ShimmerButton
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full text-center bg-accent-orange text-white font-bold py-3 px-5 rounded-lg text-lg uppercase transform hover:scale-105 hover:shadow-lg hover:shadow-accent-orange/30 transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                    style={{ transitionDelay: `${150 + NAV_LINKS.length * 60}ms` }}
                >
                    Get a Quote
                </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;