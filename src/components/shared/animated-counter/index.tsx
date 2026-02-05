'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showSuffix, setShowSuffix] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const animateCounter = () => {
      const startTime = performance.now();
      const startValue = 0;

      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        const currentValue = startValue + (end - startValue) * easedProgress;
        
        if (decimals > 0) {
          setCount(parseFloat(currentValue.toFixed(decimals)));
        } else {
          setCount(Math.floor(currentValue));
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(updateCounter);
          // Show suffix when animation is 95% complete for smooth appearance
          if (progress >= 0.95) {
            setShowSuffix(true);
          }
        } else {
          // Ensure final value is exact
          if (decimals > 0) {
            setCount(parseFloat(end.toFixed(decimals)));
          } else {
            setCount(end);
          }
          setShowSuffix(true);
        }
      };

      animationFrameRef.current = requestAnimationFrame(updateCounter);
    };

    // Intersection Observer to trigger animation when element enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            // Small delay to ensure smooth start
            setTimeout(() => {
              animateCounter();
            }, 100);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px', // Start animation slightly before element is fully visible
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasAnimated, end, duration, decimals]);

  const formatNumber = (num: number): string => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toString();
  };

  return (
    <span ref={counterRef} className={className} style={{ display: 'inline-block' }}>
      {prefix}
      {formatNumber(count)}
      {suffix && showSuffix && suffix}
    </span>
  );
};

export default AnimatedCounter;
