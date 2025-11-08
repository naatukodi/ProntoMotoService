import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TESTIMONIALS } from '../constants';
import TestimonialCard from './TestimonialCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons/NavigationIcons';
import ScrollAnimator from './ScrollAnimator';

const TestimonialsSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const itemsPerPage = isMobile ? 1 : 2;

  const pages = useMemo(() => {
    const p = [];
    if (TESTIMONIALS.length > 0) {
      for (let i = 0; i < TESTIMONIALS.length; i += itemsPerPage) {
        p.push(TESTIMONIALS.slice(i, i + itemsPerPage));
      }
    }
    return p;
  }, [itemsPerPage]);

  const totalPages = pages.length;

  const loopedPages = useMemo(() => {
    if (totalPages > 1) {
      const firstPage = pages[0];
      const lastPage = pages[totalPages - 1];
      return [lastPage, ...pages, firstPage];
    }
    return pages;
  }, [pages, totalPages]);

  const [currentPage, setCurrentPage] = useState(totalPages > 1 ? 1 : 0);
  const [transitionDuration, setTransitionDuration] = useState(700);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const goToNextPage = () => {
    if (currentPage >= totalPages + 1) return;
    setCurrentPage(prevPage => prevPage + 1);
  };
  
  const goToPrevPage = () => {
    if (currentPage <= 0) return;
    setCurrentPage(prevPage => prevPage - 1);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Reset to first page if layout changes to prevent being out of bounds
    setCurrentPage(totalPages > 1 ? 1 : 0);
  }, [itemsPerPage, totalPages]);

  // Effect for auto-play
  useEffect(() => {
    resetTimeout();
    if (totalPages > 1) {
      timeoutRef.current = setTimeout(goToNextPage, 7000);
    }
    return () => resetTimeout();
  }, [currentPage, totalPages]);

  // Effect for seamless looping
  useEffect(() => {
    if (totalPages <= 1) return;

    // Loop to the beginning
    if (currentPage > totalPages) {
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        setCurrentPage(1);
      }, 700);
      return () => clearTimeout(timer);
    }

    // Loop to the end
    if (currentPage < 1) {
      const timer = setTimeout(() => {
        setTransitionDuration(0);
        setCurrentPage(totalPages);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentPage, totalPages]);

  // Effect to re-enable transition after an instant jump
  useEffect(() => {
    if (transitionDuration === 0) {
      const timer = setTimeout(() => {
        setTransitionDuration(700);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [transitionDuration]);

  const handleDotClick = (index: number) => {
    setCurrentPage(index + 1);
  };

  const activeDot = currentPage === 0 ? totalPages - 1 : currentPage === totalPages + 1 ? 0 : currentPage - 1;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent-orange mb-2">Testimonials</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-dark">
              What Our Clients Say
            </h3>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We are proud to be a trusted partner for industry leaders. Here's what they think about our services.
            </p>
          </div>
        </ScrollAnimator>

        <div className="relative max-w-5xl mx-auto" onMouseEnter={resetTimeout}>
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
                transition: `transform ${transitionDuration}ms ease-in-out`,
              }}
            >
              {loopedPages.map((page, pageIndex) => (
                <div key={pageIndex} className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-8 px-1">
                  {page.map((testimonial) => (
                    <TestimonialCard key={testimonial.author} testimonial={testimonial} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrevPage}
                className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-20 p-3 bg-white/60 hover:bg-white rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-orange"
                aria-label="Previous testimonial"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={goToNextPage}
                className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-20 p-3 bg-white/60 hover:bg-white rounded-full shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-accent-orange"
                aria-label="Next testimonial"
              >
                <ChevronRightIcon />
              </button>
            </>
          )}

          {/* Navigation Dots */}
          {totalPages > 1 && (
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeDot === index ? 'bg-accent-orange scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial page ${index + 1}`}
                  aria-current={activeDot === index}
                ></button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;