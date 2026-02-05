"use client";
import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SpotlightCardProps {
  children?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  href?: string;
}

/**
 * SpotlightCard Component
 * 
 * Provides a spotlight hover effect that works on both desktop (mouse) and mobile (touch).
 * Based on ReactBits Spotlight Card design with enhanced touch support.
 * 
 * Desktop: Radial gradient spotlight follows mouse cursor
 * Mobile: Same effect follows touch position
 */
const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  imageSrc,
  imageAlt = "Image",
  className = "",
  imageClassName = "",
  onClick,
  href,
}) => {
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  /**
   * Calculate spotlight position from event coordinates
   * Converts event coordinates to percentage relative to card element
   */
  const updateSpotlightPosition = useCallback((clientX: number, clientY: number) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    setSpotlightPosition({ x, y });
  }, []);

  /**
   * Mouse event handlers for desktop
   */
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setSpotlightPosition({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isHovering) {
      updateSpotlightPosition(e.clientX, e.clientY);
    }
  };

  /**
   * Touch event handlers for mobile devices
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsTouching(true);
    setIsHovering(true);
    const touch = e.touches[0];
    if (touch) {
      updateSpotlightPosition(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTouching) {
      const touch = e.touches[0];
      if (touch) {
        updateSpotlightPosition(touch.clientX, touch.clientY);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    setIsHovering(false);
    setSpotlightPosition({ x: 0, y: 0 });
  };

  // Determine if spotlight should be active
  const isSpotlightActive = isHovering || isTouching;

  // Spotlight gradient style
  const spotlightStyle: React.CSSProperties = {
    background: isSpotlightActive
      ? `radial-gradient(600px circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, rgba(1, 106, 172, 0.15), transparent 40%)`
      : 'transparent',
    opacity: isSpotlightActive ? 1 : 0,
    transition: isTouching ? 'none' : 'opacity 0.3s ease',
  };

  const cardContent = (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={{ cursor: onClick || href ? 'pointer' : 'default' }}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={spotlightStyle}
      />

      {/* Border highlight effect */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-xl"
        style={{
          background: isSpotlightActive
            ? `radial-gradient(600px circle at ${spotlightPosition.x}% ${spotlightPosition.y}%, rgba(1, 106, 172, 0.1), transparent 40%)`
            : 'transparent',
          opacity: isSpotlightActive ? 1 : 0,
          transition: isTouching ? 'none' : 'opacity 0.3s ease',
          border: isSpotlightActive ? '1px solid rgba(1, 106, 172, 0.2)' : '1px solid transparent',
        }}
      />

      {/* Image or children content */}
      {imageSrc ? (
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className={`object-cover ${imageClassName}`}
          />
        </div>
      ) : (
        children
      )}
    </div>
  );

  // Wrap in Link if href is provided
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default SpotlightCard;
