import React from 'react';
import { WHY_CHOOSE_US_POINTS } from '../constants';
import ScrollAnimator from './ScrollAnimator';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden text-white">
      {/* Animated Gradient and Grid Background */}
      <div className="absolute inset-0 z-0">
         <div 
           className="absolute inset-0 bg-gradient-to-br from-primary-dark via-gray-900 to-black animate-animated-gradient"
           style={{ backgroundSize: '200% 200%' }}
         ></div>
         <div 
           className="absolute inset-0"
           style={{
             backgroundImage: `
               linear-gradient(rgba(217, 91, 0, 0.05) 1px, transparent 1px),
               linear-gradient(to right, rgba(217, 91, 0, 0.05) 1px, transparent 1px)
             `,
             backgroundSize: '2rem 2rem',
             opacity: '0.5'
           }}
         ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
            <ScrollAnimator animation="animate-fadeInUp">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose Us?
              </h2>
              <p className="text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                We combine decades of experience with modern technology to provide valuations you can trust. Our commitment to accuracy, integrity, and client satisfaction sets us apart.
              </p>
            </ScrollAnimator>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {WHY_CHOOSE_US_POINTS.map((point, index) => (
            <ScrollAnimator 
                key={point.title}
                animation="animate-fadeInUp"
                delay={150 + index * 150}
            >
                <div 
                className="flex items-start group"
                >
                <div className="flex-shrink-0 w-10 h-10 p-2 bg-accent-orange/20 text-accent-orange rounded-full mr-4 transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-[-12deg]">
                    {point.icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">{point.title}</h3>
                    <p className="mt-1 text-gray-400">{point.description}</p>
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