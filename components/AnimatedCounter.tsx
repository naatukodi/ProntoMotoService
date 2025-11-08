import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ end, duration = 2000 }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.5, triggerOnce: true });
  const count = useCounter(isVisible ? end : 0, duration);

  return <span ref={ref}>{Math.round(count)}</span>;
};

export default AnimatedCounter;