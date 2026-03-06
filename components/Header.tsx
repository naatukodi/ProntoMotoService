import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { NAV_LINKS, CORE_SERVICES } from '../constants';
import { HamburgerIcon, CloseIcon } from './icons/MenuIcons';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesMenuOpen, setIsServicesMenuOpen] = useState(false);

  const servicesMenuTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
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

  // UPDATED: Text colors changed to dark gray, hover/active to primary (Teal)
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 rounded-md text-sm font-semibold tracking-wide transition-all duration-300 
     after:content-[''] after:absolute after:left-0 after:bottom-0 
     after:h-[2px] after:bg-primary after:transition-all after:duration-300 
     hover:after:w-full text-gray-700 hover:text-primary ${
      isActive ? 'after:w-full text-primary' : 'after:w-0'
    }`;

  // UPDATED: Background changed to white, shadow added for scroll
  const headerClasses = `sticky top-0 z-40 transition-all duration-300 ${
    isScrolled
      ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100'
      : 'bg-white'
  }`;

  // UPDATED: Icons changed to dark gray
  const iconClasses = 'text-gray-700 hover:text-primary';

  return (
    <>
      <header className={headerClasses}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-4">
              {NAV_LINKS.map((link) =>
                link.to === '/services' ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={handleServicesMenuEnter}
                    onMouseLeave={handleServicesMenuLeave}
                  >
                    <NavLink to={link.to} className={getLinkClass}>
                      {link.label}
                    </NavLink>

                    {/* Services Dropdown */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 transition-all duration-300 ${
                        isServicesMenuOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 -translate-y-4 pointer-events-none'
                      }`}
                    >
                      {/* UPDATED: Dropdown bg to white, text to dark */}
                      <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-100 w-96 p-6">
                        <div className="space-y-4">
                          {CORE_SERVICES.map((service) => (
                            <Link
                              key={service.title}
                              to="/services"
                              onClick={() => setIsServicesMenuOpen(false)}
                              className="group flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              {/* UPDATED: Icon color */}
                              <div className="flex-shrink-0 w-8 h-8 text-primary mr-4 mt-1 transition-transform duration-300 group-hover:scale-110">
                                {service.icon}
                              </div>
                              <div>
                                {/* UPDATED: Title text color */}
                                <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                                  {service.title}
                                </h4>
                                {/* UPDATED: Description text color */}
                                <p className="text-sm text-gray-500 line-clamp-2">
                                  {service.description}
                                </p>
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
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${iconClasses}`}
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${
          !isMenuOpen && 'pointer-events-none'
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        {/* UPDATED: Mobile Menu bg to white */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-xs bg-white shadow-xl transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <Logo />
              <button
                onClick={() => setIsMenuOpen(false)}
                className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${iconClasses}`}
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-lg font-medium transition-all ${
                      isActive
                        ? 'bg-primary-light/10 text-primary' /* Active state: Light teal bg, teal text */
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;