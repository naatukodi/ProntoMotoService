import { useState, useEffect, useRef } from 'react';

interface AnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export const useScrollAnimation = (options?: AnimationOptions) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Default to triggerOnce=true
                    if (options?.triggerOnce !== false) {
                        observer.unobserve(element);
                    }
                }
            },
            {
                threshold: options?.threshold || 0.1,
                rootMargin: options?.rootMargin || '0px',
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return { ref: elementRef, isVisible };
};
