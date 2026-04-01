import React from 'react';
import { Link } from 'react-router-dom';
import ScrollAnimator from './ScrollAnimator';

interface CallToActionBannerProps {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
}

const CallToActionBanner: React.FC<CallToActionBannerProps> = ({
  title,
  text,
  buttonText,
  buttonLink,
}) => {
  return (
    <ScrollAnimator>
      <section className="mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-teal-600 to-teal-800 text-white rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-48 h-48 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-white/10 rounded-full"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
              <div>
                <h2 className="text-3xl font-bold">{title}</h2>
                <p className="mt-2 text-teal-50 max-w-2xl">{text}</p>
              </div>
              <div className="flex-shrink-0">
                <Link
                  to={buttonLink}
                  className="inline-block bg-white text-teal-700 font-bold py-3 px-8 rounded-lg text-lg uppercase transition-transform transform hover:scale-105 animate-pulsate"
                >
                  {buttonText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimator>
  );
};

export default CallToActionBanner;