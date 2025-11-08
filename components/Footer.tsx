import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { SOCIAL_LINKS, FOOTER_QUICK_LINKS, FOOTER_SERVICES_LINKS, FOOTER_CONTACT_INFO } from '../constants';
import Logo from './Logo';
import { PhoneIcon, EnvelopeIcon, MapPinIcon, SendIcon } from './icons/FeatureIcons';
import { WhatsAppIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter subscription for:', email);
      // Here you would typically handle the API call
      alert(`Thank you for subscribing, ${email}!`);
      setEmail('');
    }
  };

  const phoneNumber = FOOTER_CONTACT_INFO.phone1.replace(/[\s+-]/g, '');
  const message = encodeURIComponent("Hello! I'm interested in your vehicle valuation services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const mailtoSubject = encodeURIComponent("Inquiry via Pronto Moto Services Website");
  const mailtoBody = encodeURIComponent("Hello Pronto Moto Services team,\n\nI'm reaching out to inquire about...\n\nBest regards,");
  const mailtoUrl = `mailto:${FOOTER_CONTACT_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <footer className="bg-primary-dark text-white relative z-10 border-t-4 border-accent-orange" style={{backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre-v2.png')"}}>
      <div className="absolute inset-0 bg-primary-dark/95"></div>
      <div className="relative container mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company, Newsletter, Social */}
          <div className="space-y-6">
            <Logo />
            <p className="text-gray-400 text-sm leading-relaxed">
              Tech-enabled vehicle inspection and valuation firm trusted by banks, NBFCs, and insurance providers.
            </p>
            <div>
              <h3 className="text-lg font-bold tracking-wider uppercase mb-4">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-3">Subscribe to our newsletter for the latest industry insights.</p>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full bg-gray-700/50 border-2 border-gray-600 rounded-l-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-accent-orange transition-colors"
                  required
                />
                <button type="submit" aria-label="Subscribe to newsletter" className="bg-accent-orange text-white p-3 rounded-r-lg hover:bg-orange-600 transition-colors">
                  <div className="w-5 h-5"><SendIcon /></div>
                </button>
              </form>
            </div>
            <div className="flex space-x-2 pt-2">
              {SOCIAL_LINKS.map((item) => {
                const isPlaceholder = item.href === '#';
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={isPlaceholder ? (e) => e.preventDefault() : undefined}
                    target={isPlaceholder ? undefined : '_blank'}
                    rel={isPlaceholder ? undefined : 'noopener noreferrer'}
                    className={`text-gray-400 hover:text-white hover:bg-accent-orange transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-full ${isPlaceholder ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={item.name}
                    title={isPlaceholder ? `${item.name} (Coming Soon)` : `Follow us on ${item.name}`}
                  >
                    {item.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {FOOTER_QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-accent-orange transition-all duration-300 flex items-center group"
                  >
                     <span className="w-2 h-px bg-gray-500 group-hover:bg-accent-orange mr-3 transition-colors"></span>
                     <span className="group-hover:translate-x-1 transition-transform transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-bold tracking-wider uppercase mb-4">Services</h3>
            <ul className="space-y-3">
              {FOOTER_SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-accent-orange transition-all duration-300 flex items-center group"
                  >
                     <span className="w-2 h-px bg-gray-500 group-hover:bg-accent-orange mr-3 transition-colors"></span>
                     <span className="group-hover:translate-x-1 transition-transform transform">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold tracking-wider uppercase mb-4">Contact Info</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <div className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-accent-orange"><MapPinIcon /></div>
                <span className="text-sm">{FOOTER_CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-accent-orange"><PhoneIcon /></div>
                <div>
                  <a href={`tel:${FOOTER_CONTACT_INFO.phone1.replace(/[\s+-]/g, '')}`} className="hover:text-accent-orange hover:underline transition-colors">{FOOTER_CONTACT_INFO.phone1}</a><br/>
                  <a href={`tel:${FOOTER_CONTACT_INFO.phone2.replace(/[\s+-]/g, '')}`} className="hover:text-accent-orange hover:underline transition-colors">{FOOTER_CONTACT_INFO.phone2}</a>
                </div>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-accent-orange"><EnvelopeIcon /></div>
                <a href={mailtoUrl} className="hover:text-accent-orange hover:underline transition-colors break-all">{FOOTER_CONTACT_INFO.email}</a>
              </li>
              <li className="flex items-start">
                <div className="w-5 h-5 mt-1 mr-4 flex-shrink-0 text-[#25D366]"><WhatsAppIcon /></div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent-orange hover:underline transition-colors">Chat on WhatsApp</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div className="relative border-t border-gray-700/50">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-sm">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-center">
            <span className="text-gray-400">Copyright © 2025 Pronto Moto Services. All rights reserved.</span>
            <div className="flex items-center gap-4">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white hover:underline transition-colors duration-300">Privacy Policy</Link>
                <span className="text-gray-500">|</span>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white hover:underline transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;