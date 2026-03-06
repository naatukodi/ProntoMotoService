import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../constants';
import ScrollAnimator from './ScrollAnimator';

const WhyChooseUs: React.FC = () => {
  return (
    // UPDATED: Background is white
    <section className="relative py-20 overflow-hidden bg-white">
      
      {/* Background Pattern - Subtle grey grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div 
           className="absolute inset-0 bg-white"
         ></div>
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: `
               linear-gradient(rgba(31, 167, 166, 0.05) 1px, transparent 1px),
               linear-gradient(to right, rgba(31, 167, 166, 0.05) 1px, transparent 1px)
             `,
             backgroundSize: '2rem 2rem',
           }}
         ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <ScrollAnimator animation="animate-fadeInUp">
              {/* UPDATED: Title in TEAL (primary) */}
              <h2 className="text-3xl md:text-4xl font-black text-primary mb-4 uppercase tracking-wide">
                Why Choose Us?
              </h2>
              {/* UPDATED: Description in Dark Grey/Teal-Dark for readability */}
              <p className="text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
                We combine decades of experience with modern technology to provide valuations you can trust. Our commitment to accuracy, integrity, and client satisfaction sets us apart.
              </p>
            </ScrollAnimator>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {WHY_CHOOSE_US_POINTS.map((point, index) => (
            <ScrollAnimator 
                key={point.title}
                animation="animate-fadeInUp"
                delay={150 + index * 150}
            >
                <div 
                className="flex items-start group p-6 rounded-2xl transition-all duration-300 hover:bg-primary-light/30 border border-transparent hover:border-primary/20"
                >
                {/* UPDATED: Icon container - Teal Background, White Icon */}
                <div className="flex-shrink-0 w-12 h-12 p-2.5 bg-primary text-white rounded-lg shadow-lg shadow-primary/30 mr-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-6deg]">
                    {point.icon}
                </div>
                <div>
                    {/* UPDATED: Title in TEAL */}
                    <h3 className="text-xl font-bold text-primary mb-2">{point.title}</h3>
                    {/* UPDATED: Description in Dark Grey */}
                    <p className="text-gray-600 leading-relaxed">{point.description}</p>
                </div>
                </div>
            </ScrollAnimator>
            ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;