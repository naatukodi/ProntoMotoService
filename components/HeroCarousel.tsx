import React from 'react';
import { Link } from 'react-router-dom';
import { CAROUSEL_SLIDES } from '../constants';

const HeroCarousel: React.FC = () => {
  // Grab the 4th slide (arrays start at 0, so index 3 is the 4th item)
  // Adding a fallback to index 0 just in case there are less than 4 slides
  const heroSlide = CAROUSEL_SLIDES[3] || CAROUSEL_SLIDES[0];

  return (
    <section className="relative bg-black text-white h-[80vh] sm:h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Static Background Image */}
      <div className="absolute inset-0">
        <div
          role="img"
          aria-label={heroSlide.alt}
          className="w-full h-full bg-cover bg-center animate-kenburns"
          style={{ backgroundImage: `url('${heroSlide.src}')` }}
        />
      </div>

      {/* Overlay - DARKER VERSION FOR BETTER READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider animate-fadeInDown bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Vehga Inspections Private Limited
        </h1>

        {/* Tagline */}
        <p
          className="mt-4 text-xl sm:text-2xl md:text-4xl font-semibold text-primary tracking-wide animate-fadeInUp"
          style={{ animationDelay: '0.3s' }}
        >
          Precision. Integrity. Valuation Excellence.
        </p>

        <p
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-200 animate-fadeInUp"
          style={{ animationDelay: '0.5s' }}
        >
          We deliver accurate, tech-enabled vehicle inspections and valuation reports 
          trusted by banks, NBFCs, and insurance providers across South India.
        </p>

        {/* Button */}
        <Link
          to="/contact"
          className="group mt-8 inline-flex items-center bg-primary text-white font-bold py-3 px-8 rounded-lg text-base sm:py-4 sm:px-10 sm:text-lg uppercase transition-all duration-300 transform hover:scale-105 hover:bg-primary-dark hover:shadow-2xl hover:shadow-primary/30 animate-pulsate"
          style={{ animationDelay: '0.7s' }}
        >
          Request a Valuation
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default HeroCarousel;