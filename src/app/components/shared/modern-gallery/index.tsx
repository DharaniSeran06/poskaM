'use client';

import React from 'react';
import Image from 'next/image';

export interface GalleryItem {
  image: string;
  title: string;
  alt?: string;
}

interface ModernGalleryProps {
  items: GalleryItem[];
  title?: string;
  description?: string;
  className?: string;
}

const ModernGallery: React.FC<ModernGalleryProps> = ({
  items,
  title = 'GALLERY',
  description,
  className = '',
}) => {
  // Ensure we have at least 6 items for the 2x3 grid, pad with empty items if needed
  const displayItems = items.length >= 6 ? items.slice(0, 6) : items;

  return (
    <section className={`py-16 lg:py-24 bg-[#f5f3ef] dark:bg-darkmode ${className}`}>
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        {/* Header with line and title */}
        <div className="mb-12 lg:mb-16" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#016aac] dark:bg-[#016aac]"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white tracking-tight">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-2xl">
              {description}
            </p>
          )}
        </div>

        {/* Gallery Grid - 2 rows, 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-4">
          {displayItems.map((item, index) => (
            <div
              key={index}
              className="group relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.alt || item.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              
              {/* Hover Overlay - semi-transparent */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              
              {/* Title at bottom-left - always visible with gradient background */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 md:p-5 lg:p-6">
                <p className="text-white text-sm md:text-base font-medium drop-shadow-lg">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if less than 6 items */}
        {items.length < 6 && items.length > 0 && (
          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            {items.length} {items.length === 1 ? 'image' : 'images'} displayed
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No gallery images available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernGallery;
