import React from 'react';

const AnimatedCheckmark: React.FC = () => {
  return (
    <svg
      className="w-20 h-20 mx-auto mb-4"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 65 65"
      aria-hidden="true"
    >
      <circle
        className="stroke-accent-green animate-drawCircle"
        cx="32.5"
        cy="32.5"
        r="30"
        fill="none"
        strokeWidth="5"
        strokeDasharray="190"
        strokeDashoffset="190"
        transform="rotate(-90 32.5 32.5)"
      />
      <path
        className="stroke-accent-green animate-drawCheck"
        style={{ animationDelay: '0.6s' }}
        d="M20 32.5l8 8 16-16"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="35"
        strokeDashoffset="35"
      />
    </svg>
  );
};

export default AnimatedCheckmark;
