import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../constants';
import ScrollAnimator from './ScrollAnimator';

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent-orange mb-2">Our Process</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-primary-dark">
              Getting a Valuation is Easy
            </h3>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              We've streamlined our process to be as simple and efficient as possible for our clients.
            </p>
          </div>
        </ScrollAnimator>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-y-20 md:gap-y-0 md:gap-x-12">
            {/* Connecting Line - drawn with pseudo elements on each card */}
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <ScrollAnimator key={index} delay={index * 200}>
                <div className={`relative text-center p-6 pt-12 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col items-center h-full group
                                
                                after:content-[''] after:absolute after:left-1/2 after:-bottom-10 after:h-10 after:w-px after:bg-gray-300
                                ${index === HOW_IT_WORKS_STEPS.length - 1 ? 'after:hidden' : 'after:md:hidden'}

                                before:hidden before:md:block before:content-[''] before:absolute before:top-9 before:-right-1/2 before:w-full before:h-px before:border-t-2 before:border-dashed before:border-gray-300
                                ${index === HOW_IT_WORKS_STEPS.length - 1 ? 'before:hidden' : ''}
                `}>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 w-14 h-14 bg-accent-orange text-white font-bold text-xl rounded-full flex items-center justify-center border-4 border-gray-100 transition-transform duration-300 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  <div className="mb-4 mt-4 w-16 h-16 p-3 text-accent-orange bg-accent-orange/10 rounded-full transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-bold text-primary-dark mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow">{step.description}</p>
                </div>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;