'use client';

import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

interface ServiceCardProps {
  service: {
    _id: string;
    slug: string;
    title: string;
    shortDescription?: string;
    description?: string;
    thumbnail?: string;
    heroImage?: string;
  };
  index: number;
  learnMoreText: string;
}

/**
 * Service card component
 */
export default function ServiceCard({ service, index, learnMoreText }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group bg-white/95 dark:bg-darklight/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Semi-transparent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-[#016aac]/5 dark:from-darklight/90 dark:via-darklight/95 dark:to-[#016aac]/10 rounded-xl pointer-events-none z-0"></div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#016aac] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 z-0">
        {service.thumbnail ? (
          <Image
            src={service.thumbnail}
            alt={service.title || 'Service image'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        ) : service.heroImage ? (
          <Image
            src={service.heroImage}
            alt={service.title || 'Service image'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <span className="text-gray-400 dark:text-gray-500">No Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#016aac]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      
      <div className="p-8 relative z-10">
        <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4 group-hover:text-[#016aac] transition-colors">
          {service.title || 'Untitled Service'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 line-clamp-3">
          {service.shortDescription || service.description || 'No description available.'}
        </p>
        <div className="flex items-center text-[#016aac] font-semibold group-hover:translate-x-2 transition-transform duration-300">
          <span>{learnMoreText}</span>
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
