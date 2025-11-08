import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ScrollAnimatorProps {
    children: React.ReactNode;
    className?: string;
    animation?: string;
    delay?: number; // delay in ms
    threshold?: number;
}

const ScrollAnimator: React.FC<ScrollAnimatorProps> = ({
    children,
    className = '',
    animation = 'animate-fadeInUp',
    delay = 0,
    threshold = 0.1
}) => {
    const { ref, isVisible } = useScrollAnimation({ threshold, triggerOnce: true });

    return (
        <div
            ref={ref}
            className={`${className} opacity-0 ${isVisible ? animation : ''}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollAnimator;
