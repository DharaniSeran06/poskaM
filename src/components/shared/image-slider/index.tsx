'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showProgress?: boolean;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  showProgress = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate slider width on mount and resize
  const calculateSliderWidth = useCallback(() => {
    if (containerRef.current) {
      setSliderWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    calculateSliderWidth();
    window.addEventListener('resize', calculateSliderWidth);
    return () => {
      window.removeEventListener('resize', calculateSliderWidth);
    };
  }, [calculateSliderWidth]);

  // Calculate translateX value - single source of truth
  const translateX = -currentIndex * sliderWidth;

  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition flag after animation
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  }, [currentIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
      
      return () => {
        if (autoPlayTimerRef.current) {
          clearInterval(autoPlayTimerRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, images.length, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (autoPlay && images.length > 1) {
      autoPlayTimerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  }, [autoPlay, autoPlayInterval, images.length, nextSlide]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Slider Container - Single transform source */}
      <div
        ref={sliderRef}
        className="flex"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          willChange: 'transform',
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-full"
            style={{ width: `${sliderWidth}px` }}
          >
            <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800">
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Progress Track - Moves with slider using same transform */}
      {showProgress && images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div
            className="h-full bg-[#016aac]"
            style={{
              width: `${(1 / images.length) * 100}%`,
              transform: `translateX(${currentIndex * 100}%)`,
              transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              willChange: 'transform',
            }}
          />
        </div>
      )}

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#016aac] w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
