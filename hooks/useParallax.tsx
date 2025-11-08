import { useEffect, useRef } from 'react';

type ParallaxableElement = HTMLElement;

/**
 * A custom hook to apply a parallax scrolling effect to an element's background image.
 * @param speed - The factor by which the background will scroll relative to the page (e.g., 0.3 means it moves at 30% of the scroll speed).
 * @returns A ref to be attached to the target DOM element.
 */
export const useParallax = (speed: number) => {
  const elementRef = useRef<ParallaxableElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const yOffset = window.scrollY;
        elementRef.current.style.backgroundPositionY = `${yOffset * speed}px`;
      }
    };

    // Set initial position on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return elementRef;
};
