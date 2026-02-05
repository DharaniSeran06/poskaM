'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Optimized lazy-loading image component
 * - Only loads when in viewport
 * - Supports blur placeholder
 * - Automatic WebP/AVIF conversion
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const imageProps = {
    src,
    alt,
    className: `${className} transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`,
    onLoad: () => setIsLoaded(true),
    priority,
    quality,
    sizes,
    ...(fill ? { fill: true } : { width, height }),
    ...(placeholder === 'blur' && blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {}),
  };

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && placeholder === 'blur' && blurDataURL && (
        <Image
          src={blurDataURL}
          alt=""
          fill={fill}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          className={`${className} blur-sm scale-110`}
          aria-hidden="true"
        />
      )}
      <Image {...imageProps} loading={priority ? undefined : 'lazy'} />
    </div>
  );
};

export default LazyImage;
