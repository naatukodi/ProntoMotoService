import React from 'react';
import { QuoteIcon } from './icons/FeatureIcons';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="w-10 h-10 text-accent-orange/30 mb-4">
        <QuoteIcon />
      </div>
      <blockquote className="text-gray-600 italic flex-grow">
        "{testimonial.quote}"
      </blockquote>
      <footer className="mt-6 pt-6 border-t border-gray-200 flex items-center">
        <img
          className="h-12 w-12 rounded-full object-cover mr-4"
          src={testimonial.avatarUrl}
          alt={`Photo of ${testimonial.author}`}
        />
        <div>
          <p className="font-bold text-primary-dark">{testimonial.author}</p>
          <p className="text-sm text-gray-500">{testimonial.title}</p>
        </div>
      </footer>
    </div>
  );
};

export default TestimonialCard;