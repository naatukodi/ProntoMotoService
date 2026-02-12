import React from 'react';
import KeyPillarsSection from '../components/KeyPillarsSection';
import CallToActionBanner from '../components/CallToActionBanner';
import ScrollAnimator from '../components/ScrollAnimator';
import AnimatedCounter from '../components/AnimatedCounter';
import { COMPANY_STATS } from '../constants';
import { MissionIcon, VisionIcon } from '../components/icons/FeatureIcons';
import { useParallax } from '../hooks/useParallax';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutPage: React.FC = () => {
  const parallaxRef = useParallax(0.3);
  const { ref: scanlineRef, isVisible: isScanlineVisible } = useScrollAnimation({ threshold: 0.5 });

  return (
    <div className="bg-gray-50 animate-pageFadeIn">
      <header 
        ref={parallaxRef}
        className="py-20 text-white text-center relative overflow-hidden bg-cover bg-center"
        style={{backgroundImage: "url('https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"}}
      >
        <div className="absolute inset-0 bg-primary-dark/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold animate-fadeInDown tracking-tight">
            About Vehga Inspections Private Limited
          </h1>
          <p className="mt-4 text-lg text-gray-300 animate-fadeInUp max-w-3xl mx-auto" style={{animationDelay: '0.3s'}}>
            Delivering Precision, Integrity, and Excellence in Every Valuation
          </p>
        </div>
      </header>

      <main>
        <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Detailed Narrative Section */}
          <section className="grid md:grid-cols-2 items-center gap-16">
            
            <ScrollAnimator animation="animate-slideInLeft">
              <div ref={scanlineRef} className="relative group p-4 sm:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/20 to-accent-red/20 rounded-2xl transform -rotate-3 transition-all duration-500 ease-in-out group-hover:rotate-0 group-hover:scale-105 shadow-lg"></div>
                
                <div className={`relative scanline-reveal-container ${isScanlineVisible ? 'revealed' : ''} rounded-xl shadow-2xl border-4 border-white`}>
                  <img 
                    src="https://res.cloudinary.com/drezjoynu/image/upload/v1762516108/8_-_ABOUT_US_uyfjoy.jpg"
                    alt="Vehga Inspections Private Limited leadership team"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </div>
            </ScrollAnimator>

            <ScrollAnimator animation="animate-slideInRight" delay={200}>
              <div>
                <h2 className="text-3xl font-bold text-primary-dark mb-4">
                  Our Journey of Professional Excellence
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Vehga Inspections Private Limited is a tech-enabled vehicle inspection and valuation firm built on over 60 years of combined industry expertise.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We are trusted by leading banks, NBFCs, and insurance providers for delivering accurate, compliant, and timely valuation reports across multiple vehicle categories. Our commitment to precision, transparency, and technology-driven processes ensures dependable results every time.
                </p>
              </div>
            </ScrollAnimator>

          </section>

          {/* Mission & Vision Section */}
          <section className="mt-24">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

              <ScrollAnimator animation="animate-fadeInUp">
                <div className="bg-white p-8 rounded-lg shadow-lg h-full group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-orange/10 text-accent-orange mr-4 transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                      <div className="w-7 h-7 transition-transform duration-300 group-hover:scale-125">
                        <MissionIcon />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-dark">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    To deliver accurate, transparent, and technology-driven vehicle valuation services that empower financial institutions, businesses, and individuals to make confident, risk-mitigated decisions.
                  </p>
                </div>
              </ScrollAnimator>

              <ScrollAnimator animation="animate-fadeInUp" delay={200}>
                <div className="bg-white p-8 rounded-lg shadow-lg h-full group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-orange/10 text-accent-orange mr-4 transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
                      <div className="w-7 h-7 transition-transform duration-300 group-hover:scale-125">
                        <VisionIcon />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-primary-dark">Our Vision</h3>
                  </div>
                  <p className="text-gray-600">
                    To become a leading benchmark in vehicle inspection and valuation services across India, setting new standards in speed, precision, and professional integrity.
                  </p>
                </div>
              </ScrollAnimator>

            </div>
          </section>
        </div>

        {/* By the Numbers Section */}
        <section className="py-20 bg-primary-dark text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimator>
              <h2 className="text-3xl font-bold text-center mb-12">
                Our Impact by the Numbers
              </h2>
            </ScrollAnimator>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {COMPANY_STATS.map((stat, index) => (
                <ScrollAnimator key={index} delay={index * 150}>
                  <div className="p-4">
                    <div className="text-5xl font-extrabold text-accent-orange">
                      <AnimatedCounter end={stat.value} />{stat.suffix}
                    </div>
                    <p className="mt-2 text-gray-300 font-semibold">{stat.label}</p>
                  </div>
                </ScrollAnimator>
              ))}
            </div>
          </div>
        </section>

        <div className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
          
          <KeyPillarsSection 
            title="The Foundation of Our Excellence"
            subtitle="These core strengths define our professional standards and commitment to superior service."
            className="!py-0"
          />

          <CallToActionBanner 
            title="Partner With Vehga Inspections Today"
            text="Experience precise, compliant, and technology-driven vehicle valuations backed by decades of expertise."
            buttonText="Contact Us Today"
            buttonLink="/contact"
          />

        </div>
      </main>
    </div>
  );
};

export default AboutPage;
