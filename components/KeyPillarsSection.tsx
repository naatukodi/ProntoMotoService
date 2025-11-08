import React, { useRef, useEffect } from 'react';
import { KEY_PILLARS } from '../constants';
import ScrollAnimator from './ScrollAnimator';
import SkeletonCard from './SkeletonCard';

interface KeyPillarsSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
  loading?: boolean;
}

const useTilt = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const rotateX = ((y / height) - 0.5) * -20; // Max rotation 10 degrees
      const rotateY = ((x / width) - 0.5) * 20; // Max rotation 10 degrees
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
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


const PillarCard: React.FC<{ pillar: typeof KEY_PILLARS[0] }> = ({ pillar }) => {
  const tiltRef = useTilt();
  return (
      <div 
        ref={tiltRef}
        className="card-tilt bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl group h-full"
      >
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-accent-orange/10 text-accent-orange transition-all duration-300 group-hover:bg-accent-orange group-hover:text-white group-hover:scale-110 group-hover:rotate-12">
          <div className="w-8 h-8 transition-transform duration-300 group-hover:scale-125">
            {pillar.icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-primary-dark mb-3">{pillar.title}</h3>
        <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
      </div>
  )
}

const KeyPillarsSection: React.FC<KeyPillarsSectionProps> = ({ 
  title, 
  subtitle, 
  className = '',
  loading = false,
}) => {
  return (
    <section className={`py-20 bg-gray-50/50 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
            <div className="text-center mb-16">
              <ScrollAnimator>
                <h2 className="text-3xl font-extrabold text-primary-dark tracking-tight sm:text-4xl">
                    {title}
                </h2>
              </ScrollAnimator>
              {subtitle && 
                <ScrollAnimator delay={150}>
                  <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                      {subtitle}
                  </p>
                </ScrollAnimator>
              }
            </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading 
            ? Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)
            : KEY_PILLARS.map((pillar, index) => (
                <ScrollAnimator key={index} delay={index * 150}>
                  <PillarCard pillar={pillar} />
                </ScrollAnimator>
              ))}
        </div>
      </div>
    </section>
  );
};

export default KeyPillarsSection;