"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs');
  
  const features = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: t('features.experience.title'),
      description: t('features.experience.description')
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: t('features.trust.title'),
      description: t('features.trust.description')
    }
  ];
  // Start visible to prevent blank content on mobile first render
  const [isVisible, setIsVisible] = useState(true);
  const [cardScale, setCardScale] = useState(1);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Only run animation once after hydration
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    // Start subtle scale animation after component is visible
    const startAnimation = () => {
      let isZoomingIn = true;
      const zoomInterval = setInterval(() => {
        setCardScale(prev => {
          if (isZoomingIn) {
            if (prev >= 1.03) {
              isZoomingIn = false;
              return 1.03;
            }
            return prev + 0.003;
          } else {
            if (prev <= 1) {
              isZoomingIn = true;
              return 1;
            }
            return prev - 0.003;
          }
        });
      }, 60);

      return () => clearInterval(zoomInterval);
    };

    // Delay animation start to prioritize content rendering
    const timeoutId = setTimeout(startAnimation, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-darkmode overflow-hidden relative">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Background Image with Featured Card */}
          <div className="relative h-[600px] lg:h-[700px] order-2 lg:order-1" data-aos="fade-right">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/services/Service%20performance.png"
                alt="Construction Services"
                fill
                className="object-cover"
                unoptimized
              />
              {/* White vertical lines overlay pattern - decorative only */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 48px,
                    white 48px,
                    white 50px
                  )`,
                }}
              />
              {/* Gradient overlay - decorative only */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#016aac]/20 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Featured Project Card */}
            <div 
              className="absolute bottom-8 left-8 right-8 lg:right-auto lg:w-[400px] bg-white dark:bg-darklight rounded-xl shadow-2xl overflow-hidden"
              style={{
                transform: `scale(${cardScale})`,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.8s ease-in, transform 2s ease-in-out'
              }}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/leranmore services/general/gallery/img-01.jpg"
                  alt="Featured Project"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-md hover:bg-white transition-colors">
                    <svg className="w-5 h-5 text-[#016aac]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-midnight_text dark:text-white">$250,000</span>
                  <span className="bg-[#016aac]/10 text-[#016aac] px-4 py-1.5 rounded-lg text-sm font-semibold">
                    Construction
                  </span>
                </div>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-2">
                  Modern Residential Complex
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Complete construction of a modern residential complex with 50 units
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Why Choose Us Content */}
          <div className="order-1 lg:order-2" data-aos="fade-left">
            <h2 className="text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-12">
              {t('title')}
            </h2>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="flex items-start gap-6 group"
                  data-aos="fade-left"
                  data-aos-delay={index * 100}
                >
                  {/* Icon Circle */}
                  <div className="flex-shrink-0 bg-[#016aac]/20 dark:bg-[#016aac]/30 p-4 rounded-full border-2 border-[#016aac]/30 group-hover:bg-[#016aac]/30 group-hover:scale-110 transition-all duration-300">
                    <div className="text-[#016aac]">
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-3 group-hover:text-[#016aac] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
