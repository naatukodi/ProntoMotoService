import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { CORE_SERVICES, VEHICLE_CATEGORIES } from '../constants';
import CallToActionBanner from '../components/CallToActionBanner';
import ScrollAnimator from '../components/ScrollAnimator';
import SkeletonCard from '../components/SkeletonCard';
import { useParallax } from '../hooks/useParallax';

const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = ((y / height) - 0.5) * -16; // Max rotation 8 degrees
      const rotateY = ((x / width) - 0.5) * 16;  // Max rotation 8 degrees
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

const ServiceCard: React.FC<{ service: typeof CORE_SERVICES[0] }> = ({ service }) => {
  const tiltRef = useTilt();
  return (
    <div 
      ref={tiltRef}
      className="card-tilt bg-white p-8 rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl flex flex-col group h-full ring-2 ring-transparent hover:ring-accent-orange"
    >
      <div className="flex flex-col flex-grow">
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-accent-orange/10 text-accent-orange transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
          <div className="w-8 h-8 transition-transform duration-300 group-hover:scale-125">
            {service.icon}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-accent-orange mb-4">{service.title}</h3>
        <p className="text-gray-600 leading-relaxed flex-grow">{service.description}</p>
      </div>
    </div>
  );
};


const ServicesPage: React.FC = () => {
  const parallaxRef = useParallax(0.4);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500); // Simulate 1.5 second load time
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); // remove #
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add a temporary highlight effect
          element.classList.add('ring-4', 'ring-accent-green', 'ring-offset-4', 'ring-offset-gray-100', 'transition-shadow', 'duration-300');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-accent-green', 'ring-offset-4', 'ring-offset-gray-100');
          }, 3000); // Highlight for 3 seconds
        }, 100); // small delay to allow rendering
      }
    }
  }, [location]);

  return (
    <div className="animate-pageFadeIn">
      {/* Hero Banner Section with Parallax Effect */}
      <section 
        ref={parallaxRef}
        className="relative text-white bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/drezjoynu/image/upload/v1762516247/5_-_OUR_SERVICES_-_MOTOR_INSURANCE_uiqh2l.jpg')"
        }}
        aria-label="Close-up of a modern vehicle's dashboard"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold animate-fadeInDown bg-gradient-to-r from-accent-orange to-orange-400 bg-clip-text text-transparent tracking-tight">
            Our Services
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 animate-fadeInUp max-w-3xl mx-auto" style={{animationDelay: '0.3s'}}>
            Comprehensive Valuation Solutions for Every Need
          </p>
        </div>
      </section>
      
      <main className="pb-20">
        {/* Core Services Section */}
        <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimator>
            <h2 className="text-3xl font-bold text-center text-primary-dark mb-12">What We Offer</h2>
          </ScrollAnimator>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => <SkeletonCard key={index} />)
              : CORE_SERVICES.map((service, index) => (
              <ScrollAnimator key={index} delay={index * 150}>
                <ServiceCard service={service} />
              </ScrollAnimator>
            ))}
          </div>
        </section>

        {/* Inspection Categories Section with Video Background */}
        <section className="relative overflow-hidden py-20">
            {/* Video Background & Overlay */}
            <div className="absolute inset-0 z-0">
                {isMobile ? (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: "url('https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
                        aria-label="Background image showing traffic on a highway"
                    />
                ) : (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        className="w-full h-full object-cover"
                        src="https://videos.pexels.com/video-files/853875/853875-hd_1920_1080_25fps.mp4"
                        aria-label="Background video showing traffic on a highway"
                    >
                      Your browser does not support the video tag.
                    </video>
                )}
                <div className="absolute inset-0 bg-primary-dark/75 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollAnimator>
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Vehicles We Inspect</h2>
                </ScrollAnimator>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {VEHICLE_CATEGORIES.map((category, index) => (
                        <ScrollAnimator key={index} delay={index * 100}>
                            <div 
                                id={category.id}
                                className="group bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-accent-green/20 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] border-2 border-transparent hover:border-accent-green/50 text-center h-full flex flex-col"
                            >
                                <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-accent-green/10 rounded-full transition-transform duration-300 group-hover:scale-110"></div>
                                    <div className="relative text-accent-green w-14 h-14 transition-transform duration-300 group-hover:scale-125">
                                        {category.icon}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-grow">
                                    <h3 className="font-bold text-gray-800 text-xl">{category.name}</h3>
                                    <p className="mt-2 text-sm text-gray-500 flex-grow">{category.description}</p>
                                </div>
                            </div>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
        </section>

        <CallToActionBanner 
          title="Have a Specific Valuation Need?"
          text="Our expert team is ready to provide tailored solutions for financing, insurance, or asset disposal. Get a precise, compliant report for any vehicle type."
          buttonText="Request a Quote"
          buttonLink="/contact"
        />
      </main>
    </div>
  );
};

export default ServicesPage;