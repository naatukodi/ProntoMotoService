import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CAROUSEL_SLIDES } from '../constants';

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSlideChange((currentIndex + 1) % CAROUSEL_SLIDES.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleSlideChange = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsAnimating(false);
    }, 1000);
  };

  const goToSlide = (slideIndex: number) => {
    if (slideIndex !== currentIndex) {
      handleSlideChange(slideIndex);
    }
  };

  return (
    <section className="relative bg-primary-dark text-white h-[80vh] sm:h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      {/* Slides */}
      <div className="absolute inset-0">
        {CAROUSEL_SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentIndex}
          >
            <div
              role="img"
              aria-label={slide.alt}
              className={`w-full h-full bg-cover bg-center ${
                index === currentIndex ? 'animate-kenburns' : ''
              }`}
              style={{ backgroundImage: `url('${slide.src}')` }}
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/70 to-transparent"></div>

      {/* Content */}
      <div className={`relative z-10 transition-opacity duration-700 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-wider animate-fadeInDown bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Vehga Inspections Private Limited
        </h1>

        <p
          className="mt-4 text-xl sm:text-2xl md:text-4xl font-semibold text-accent-orange tracking-wide animate-fadeInUp"
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

        <Link
          to="/contact"
          className="group mt-8 inline-flex items-center bg-accent-orange text-white font-bold py-3 px-8 rounded-lg text-base sm:py-4 sm:px-10 sm:text-lg uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-orange/30 animate-pulsate"
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

      {/* Navigation Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {CAROUSEL_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'bg-accent-orange scale-125'
                : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
