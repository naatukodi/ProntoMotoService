import React, { useState, useEffect } from 'react';
import ClientTicker from '../components/ClientTicker';
import KeyPillarsSection from '../components/KeyPillarsSection';
import HeroCarousel from '../components/HeroCarousel';
import WhyChooseUs from '../components/WhyChooseUs';
import ScrollAnimator from '../components/ScrollAnimator';
import { TechnologyIcon, PrecisionIcon, KnowledgeIcon } from '../components/icons/FeatureIcons';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';

const AnimatedTechIcon: React.FC<{icon: React.ReactNode, positionClasses: string, delay: string}> = ({ icon, positionClasses, delay }) => (
    <div 
      className={`absolute ${positionClasses} w-12 h-12 p-2 bg-black/10 backdrop-blur-sm rounded-full shadow-lg z-10 animate-float md:hidden`}
      style={{ animationDelay: delay }}
    >
      <div className="text-accent-orange w-full h-full">
        {icon}
      </div>
    </div>
  );

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { ref: deviceMockupRef, isVisible: isDeviceMockupVisible } = useScrollAnimation({ threshold: 0.4, triggerOnce: true });
  const [startIdleAnimation, setStartIdleAnimation] = useState(false);

  useEffect(() => {
    if (isDeviceMockupVisible) {
      const timer = setTimeout(() => {
        setStartIdleAnimation(true);
      }, 1200); // Corresponds to animation duration (1s) + delay (0.2s)
      return () => clearTimeout(timer);
    }
  }, [isDeviceMockupVisible]);

  useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500); // Simulate 1.5 second load time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-pageFadeIn">
      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* Client Ticker Section */}
      <ScrollAnimator>
        <ClientTicker />
      </ScrollAnimator>

      {/* Key Pillars Section */}
      <KeyPillarsSection 
        loading={isLoading}
        title="Our Core Strengths"
        subtitle="The cornerstones of our service excellence."
      />

      {/* Why Choose Us Section */}
      <WhyChooseUs />
      
      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Innovative Products Section */}
      <section className="py-20 bg-white text-gray-800 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-orange/10 via-accent-orange/5 to-transparent rounded-full z-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Column */}
            <ScrollAnimator animation="animate-slideInLeft">
              <div className="relative group [perspective:1000px] flex justify-center">
                
                {/* Mobile-only Animated Icons */}
                <AnimatedTechIcon icon={<TechnologyIcon />} positionClasses="top-10 -left-4 sm:-left-8" delay="0s" />
                <AnimatedTechIcon icon={<PrecisionIcon />} positionClasses="bottom-20 -right-4 sm:-right-8" delay="1s" />
                <AnimatedTechIcon icon={<KnowledgeIcon />} positionClasses="top-1/2 -right-6 sm:-right-10" delay="0.5s" />


                {/* Decorative Blobs */}
                <div className="absolute -top-10 -left-10 w-24 h-24 lg:w-32 lg:h-32 bg-accent-orange/20 rounded-full blur-lg transition-all duration-500 group-hover:scale-125 group-hover:-translate-x-4 animate-float md:animate-none" style={{ animationDuration: '6s' }}></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 lg:w-40 lg:h-40 bg-accent-red/10 rounded-full blur-xl transition-all duration-500 group-hover:scale-110 group-hover:translate-x-4 animate-float md:animate-none" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>

                {/* Wrapper for device animations */}
                <div 
                  ref={deviceMockupRef}
                  className={`${isDeviceMockupVisible ? 'animate-device-pop-in' : 'opacity-0'} ${startIdleAnimation ? 'animate-subtle-float-rotate' : ''}`}
                  style={{transformStyle: 'preserve-3d'}}
                >
                  {/* Device Mockups Wrapper with hover effect */}
                  <div className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-15deg)_rotateX(5deg)_translateZ(25px)]">
                    
                    {/* Phone Mockup (Mobile) */}
                    <div className="block md:hidden relative w-full max-w-[260px] h-[530px] sm:max-w-xs sm:h-[550px] bg-gray-900 rounded-[40px] border-4 border-gray-700 p-2 shadow-2xl">
                      <div className="w-full h-full rounded-[32px] overflow-hidden relative [transform-style:preserve-3d]">
                        <img 
                          src="https://www.mindinventory.com/blog/wp-content/uploads/2018/12/benefits-of-mobile-app-for-business.webp" 
                          alt="Smartphone screen showing a business benefits dashboard"
                          className="w-full h-full object-cover animate-image-float-out"
                          style={{ transform: 'translateZ(0px)' }}
                        />
                         {/* Screen Glare */}
                         <div className="absolute inset-0 w-full h-full rounded-[32px] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
                      </div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-800 rounded-b-lg"></div>
                    </div>

                    {/* Tablet Mockup (Tablet) */}
                    <div className="hidden md:block lg:hidden relative w-full max-w-[450px] h-[600px] bg-gray-900 rounded-[28px] border-4 border-gray-700 p-2.5 shadow-2xl">
                      <div className="w-full h-full rounded-[20px] overflow-hidden relative [transform-style:preserve-3d]">
                        <img 
                          src="https://www.mindinventory.com/blog/wp-content/uploads/2018/12/benefits-of-mobile-app-for-business.webp" 
                          alt="Tablet screen showing a business benefits dashboard"
                          className="w-full h-full object-cover animate-image-float-out"
                          style={{ transform: 'translateZ(0px)' }}
                        />
                         {/* Screen Glare */}
                        <div className="absolute inset-0 w-full h-full rounded-[20px] bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>
                      </div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-700 border-2 border-gray-600 rounded-full"></div>
                    </div>
                    
                    {/* Laptop Mockup (Desktop) */}
                    <div className="hidden lg:block w-full max-w-[700px]">
                      <div className="relative bg-gray-900 rounded-t-xl border-x-8 border-t-8 border-gray-700 p-1.5 pt-4 shadow-2xl">
                        <div className="w-full h-[400px] rounded-t-md overflow-hidden bg-black relative [transform-style:preserve-3d]">
                          <img 
                            src="https://www.mindinventory.com/blog/wp-content/uploads/2018/12/benefits-of-mobile-app-for-business.webp" 
                            alt="Laptop screen showing a business benefits dashboard"
                            className="w-full h-full object-cover animate-image-float-out"
                            style={{ transform: 'translateZ(0px)' }}
                          />
                          {/* Screen Glare */}
                          <div className="absolute inset-0 w-full h-full rounded-t-md bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90 pointer-events-none"></div>
                        </div>
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gray-700 rounded-full"></div>
                      </div>
                      <div className="relative h-5 bg-gray-800 rounded-b-xl border-x-2 border-b-2 border-gray-600">
                        <div className="absolute left-1/2 -translate-x-1/2 top-1 w-24 h-1 bg-gray-600 rounded-sm"></div>
                      </div>
                    </div>

                    {/* Realistic Floor Shadow */}
                    <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/35 rounded-[50%] blur-3xl -z-10
                                   md:bottom-[-30px] lg:bottom-[-40px] lg:w-full
                                   transition-all duration-500 
                                   group-hover:bottom-[-30px] group-hover:scale-110 group-hover:opacity-60 group-hover:blur-4xl
                                   md:group-hover:bottom-[-40px] lg:group-hover:bottom-[-55px]"></div>

                  </div>
                </div>
              </div>
            </ScrollAnimator>
            
            {/* Content Column */}
            <ScrollAnimator animation="animate-slideInRight" delay={200}>
              <div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-accent-orange mb-2">Our Technology</h2>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-dark mb-6">
                  App-Based Motor Valuations
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our state-of-the-art, app-based valuation platform is designed to cater to the needs of our external stakeholders. It ensures compliance with TATs and meets the highest quality standards through seamless technological integration, delivering precision at your fingertips.
                </p>
                <div className="flex items-start bg-gray-100 p-6 rounded-lg">
                   <div className="flex-shrink-0 w-8 h-8 text-accent-orange mr-4 mt-1">
                      <TechnologyIcon />
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-primary-dark">Seamless Integration</h4>
                      <p className="text-gray-500 text-sm">Our application integrates smoothly with your existing systems, providing a hassle-free experience for fast and accurate reporting.</p>
                   </div>
                </div>
                <Link
                  to="/services"
                  className="group mt-8 inline-flex items-center bg-accent-orange text-white font-bold py-3 px-8 rounded-lg text-lg uppercase transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-accent-orange/30"
                >
                  Explore Our Tech
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;