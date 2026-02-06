'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface ServiceGalleryProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  serviceTitle?: string;
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  serviceTitle = 'Service',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // Default to 1 for mobile-first SSR, will update on client
  const [visibleCards, setVisibleCards] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [images.length, isAnimating]);

  // Calculate visible cards based on screen size - runs after hydration
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1); // Mobile: single card
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3); // Tablet: 3 cards
      } else {
        setVisibleCards(5); // Desktop: 5 cards
      }
    };

    // Update immediately on mount
    updateVisibleCards();
    setIsMounted(true);
    
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images.length]);

  const handleCardClick = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [currentIndex, isAnimating]);

  // Touch swipe handlers
  const handleDragEnd = useCallback((event: any, info: PanInfo) => {
    const threshold = 50;
    const dragDistance = info.offset.x;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  }, [handleNext, handlePrev]);

  // Get visible card indices
  const getVisibleIndices = () => {
    const totalCards = Math.min(visibleCards, images.length);
    const half = Math.floor(totalCards / 2);
    const indices: number[] = [];
    
    for (let i = -half; i <= half; i++) {
      let index = currentIndex + i;
      if (index < 0) index = images.length + index;
      if (index >= images.length) index = index - images.length;
      indices.push(index);
    }
    
    return indices;
  };

  // Calculate card position and styles
  const getCardStyle = (index: number) => {
    const offset = index - currentIndex;
    let normalizedOffset = offset;
    
    // Handle wrapping
    if (normalizedOffset > Math.floor(visibleCards / 2)) {
      normalizedOffset = normalizedOffset - images.length;
    } else if (normalizedOffset < -Math.floor(visibleCards / 2)) {
      normalizedOffset = normalizedOffset + images.length;
    }
    
    const isActive = normalizedOffset === 0;
    const absOffset = Math.abs(normalizedOffset);
    
    return {
      scale: isActive ? 1 : 0.9 - absOffset * 0.02,
      opacity: isActive ? 1 : 0.6 - absOffset * 0.1,
      x: normalizedOffset * (visibleCards === 1 ? 0 : 120),
      zIndex: visibleCards - absOffset,
      boxShadow: isActive 
        ? '0 20px 40px -12px rgba(0, 0, 0, 0.25)' 
        : `0 ${10 - absOffset * 2}px ${20 - absOffset * 4}px -8px rgba(0, 0, 0, ${0.15 - absOffset * 0.02})`,
    };
  };

  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const visibleIndices = getVisibleIndices();

  return (
    <motion.div
      className="w-full py-8"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Gallery Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {visibleIndices.map((imageIndex) => {
            const style = getCardStyle(imageIndex);
            const isActive = style.zIndex === visibleCards;

            return (
              <motion.div
                key={`${imageIndex}-${currentIndex}`}
                className="absolute"
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{
                  x: style.x,
                  scale: style.scale,
                  opacity: Math.max(0, style.opacity),
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.8, x: style.x * 1.5 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                style={{ zIndex: style.zIndex }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                dragElastic={0.2}
                whileDrag={{ scale: 0.95 }}
              >
                <motion.div
                  className="relative w-[280px] md:w-[350px] lg:w-[420px] h-[350px] md:h-[450px] lg:h-[550px] rounded-3xl overflow-hidden cursor-pointer"
                  style={{
                    boxShadow: style.boxShadow,
                  }}
                  whileHover={isActive ? { y: -8, scale: 1.02 } : {}}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={() => handleCardClick(imageIndex)}
                >
                  <Image
                    src={images[imageIndex]}
                    alt={`${serviceTitle} image ${imageIndex + 1}`}
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 350px, 420px"
                    className="object-cover"
                    priority={isActive}
                    loading={isActive ? 'eager' : 'lazy'}
                  />
                  
                  {/* Subtle overlay on inactive cards - pointer-events-none to not block interactions */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full bg-white dark:bg-darklight border border-gray-200 dark:border-dark_border shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#016aac] focus:ring-offset-2"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-[#016aac]'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="w-12 h-12 rounded-full bg-white dark:bg-darklight border border-gray-200 dark:border-dark_border shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#016aac] focus:ring-offset-2"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceGallery;
