import { useEffect, useRef, useState } from 'react';

export default function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(currentRef);
        }
      },
      { threshold }
    );

    observer.observe(currentRef);

    return () => {
      // Clean up by unobserving
      try {
        observer.unobserve(currentRef);
      } catch (e) {
        // Safe fail if already unobserved or detached
      }
    };
  }, [threshold]);

  return [ref, isVisible];
}
