import { useEffect, useRef } from 'react';

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Small timeout ensures the element is painted before we observe,
    // so elements already in the viewport still get triggered correctly.
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            observer.disconnect(); // only need to fire once
          }
        },
        { threshold: 0, rootMargin: '0px 0px -20px 0px' }
      );
      observer.observe(el);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return ref;
}
