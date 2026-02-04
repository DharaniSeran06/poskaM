"use client";
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

/**
 * BeforeAfterSlider Component
 * 
 * A draggable before/after image comparison slider.
 * Works on both desktop (mouse drag) and mobile (touch swipe).
 * 
 * Features:
 * - Draggable handle to reveal before/after images
 * - Smooth real-time animation
 * - Responsive design
 * - Touch support for mobile devices
 * - Professional styling with #016aac theme color
 */
const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // Start at 50% (middle)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Calculate slider position from event coordinates
   * Converts mouse/touch position to percentage (0-100)
   */
  const calculatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    return percentage;
  }, []);

  /**
   * Update slider position
   */
  const updatePosition = useCallback((clientX: number) => {
    const position = calculatePosition(clientX);
    setSliderPosition(position);
  }, [calculatePosition]);

  /**
   * Mouse event handlers for desktop
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**
   * Touch event handlers for mobile
   */
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    if (touch) {
      updatePosition(touch.clientX);
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX);
      }
    }
  }, [isDragging, updatePosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  /**
   * Set up global event listeners for mouse/touch
   */
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 ${className}`}
      style={{ touchAction: 'none', userSelect: 'none' }}
    >
      {/* Container for both images */}
      <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
        {/* After Image (Full Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Before Image (Clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <Image
            src={beforeImage}
            alt={beforeLabel}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#016aac] cursor-ew-resize z-20 transition-all duration-150"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            boxShadow: isDragging 
              ? '0 0 20px rgba(1, 106, 172, 0.6), 0 0 40px rgba(1, 106, 172, 0.4)' 
              : '0 0 10px rgba(1, 106, 172, 0.3)',
          }}
        >
          {/* Handle Circle - Clickable/Touchable Area */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#016aac] rounded-full border-4 border-white shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-[#015a94] active:scale-95 touch-none"
            style={{
              boxShadow: isDragging
                ? '0 4px 20px rgba(1, 106, 172, 0.6), 0 0 0 4px rgba(255, 255, 255, 0.8)'
                : '0 2px 10px rgba(0, 0, 0, 0.3)',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Arrow Icons */}
            <div className="flex items-center gap-1 pointer-events-none">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-semibold z-10">
          {afterLabel}
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
