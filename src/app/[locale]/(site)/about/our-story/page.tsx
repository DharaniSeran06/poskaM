"use client";
import React, { useEffect, useRef, useState } from "react";
import HeroSub from "@/components/shared/hero-sub";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function OurStoryPage() {
  const t = useTranslations('home.about');
  const tNav = useTranslations('navbar');
  const videoRef = useRef<HTMLDivElement>(null);
  // Start visible to prevent blank content on mobile first render
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(true); // Start true to show video immediately

  useEffect(() => {
    // Video section animation enhancement (optional - content is already visible)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasAnimated(true);
          }
        });
      },
      {
        threshold: 0.1, // Lower threshold for earlier trigger
        rootMargin: "50px 0px 0px 0px",
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/about", text: tNav('company') },
    { href: "/about/our-story", text: t('watchStory') },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section 
        className="pt-36 pb-20 text-center bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
        }}
      >
        <h2 className="text-midnight_text text-[50px] leading-[1.2] relative font-bold dark:text-white capitalize mb-4">
          {t('ourStoryTitle')}
        </h2>
        <p className="text-lg text-gray font-normal max-w-md w-full mx-auto mt-7 sm:px-0 px-4">
          {t('ourStorySubtitle')}
        </p>
        <div className="mt-8">
          <nav className="flex justify-center" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              {breadcrumbLinks.map((link, index) => (
                <li key={index} className="inline-flex items-center">
                  {index > 0 && (
                    <svg className="w-6 h-6 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <Link
                    href={link.href}
                    className={`text-sm font-medium ${
                      index === breadcrumbLinks.length - 1
                        ? 'text-[#016aac] dark:text-[#016aac]'
                        : 'text-gray-500 hover:text-[#016aac] dark:text-gray-400 dark:hover:text-[#016aac]'
                    }`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-5xl mx-auto">
            <div
              ref={videoRef}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900 dark:bg-gray-800"
              style={{
                opacity: hasAnimated ? 1 : 0,
                transform: hasAnimated ? 'scale(1)' : 'scale(0.95)',
                boxShadow: hasAnimated 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(1, 106, 172, 0.1)' 
                  : '0 0 0 0 rgba(0, 0, 0, 0)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out, box-shadow 0.8s ease-out',
              }}
            >
              {/* Video Container */}
              <div className="relative aspect-video w-full group">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  style={{
                    transform: 'scale(1)',
                    transition: 'transform 0.3s ease-out',
                  }}
                  onMouseEnter={(e) => {
                    if (window.innerWidth > 768) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <source src="/images/PoskaIntroA.mp4" type="video/mp4" />
                  {t('videoNotSupported')}
                </video>
                
                {/* Subtle overlay for cinematic effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Video Description */}
            <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="400">
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('videoDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
