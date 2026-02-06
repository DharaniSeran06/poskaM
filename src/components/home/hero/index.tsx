"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

/**
 * Hero component for the homepage
 * IMPORTANT: All image paths MUST be absolute (start with /) to work with locale-based routing
 * Relative paths like "images/..." break because /en/page + images/x.jpg = /en/images/x.jpg (wrong!)
 */

// Absolute paths from /public directory - MUST start with /
const HERO_BG_IMAGE = "/images/services/plaster.png";
const HERO_CARD_IMAGE = "/images/services/drywall.jpg";

const Hero = () => {
  const t = useTranslations('home.hero');
  
  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background Image - absolute path required for locale routing */}
      {/* CRITICAL: pointer-events-none prevents this layer from blocking header clicks */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_BG_IMAGE}
          alt="Construction Services"
          className="w-full h-full object-cover pointer-events-none"
          loading="eager"
        />
        {/* Subtle blue overlay for text readability - also non-interactive */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#016aac]/80 via-[#016aac]/70 to-[#016aac]/80 pointer-events-none"></div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4 text-white">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[600px] lg:min-h-[700px]">
          <div
            className="flex flex-col col-span-12 lg:col-span-7 justify-center items-start pt-12 md:pt-16 lg:pt-20"
            data-aos="fade-right"
          >
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold mb-4 drop-shadow-lg whitespace-nowrap">
                {t('title')}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 font-medium mb-2 drop-shadow-md">
                {t('subtitle')}
              </p>
              <p className="text-lg text-white/90 mt-4 max-w-2xl drop-shadow-md">
                {t('description')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-colors font-semibold text-lg text-center shadow-md"
              >
                {t('contactUs')}
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white dark:bg-darklight border-2 border-[#016aac] text-[#016aac] rounded-lg hover:bg-[#016aac] hover:text-white transition-all font-semibold text-lg text-center shadow-sm"
              >
                {t('getQuote')}
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12">
              <div className="flex items-center space-x-2" data-aos="fade-up" data-aos-delay="100">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{t('rating')}</p>
                  <p className="text-sm text-white/80">{t('fromReviews')}</p>
                </div>
              </div>
              <div className="h-12 w-px bg-white/30 hidden sm:block"></div>
              <div data-aos="fade-up" data-aos-delay="200">
                <p className="text-2xl font-bold text-white">15+</p>
                <p className="text-sm text-white/80">{t('yearsExperience')}</p>
              </div>
              <div className="h-12 w-px bg-white/30 hidden sm:block"></div>
              <div data-aos="fade-up" data-aos-delay="300">
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-sm text-white/80">{t('projectsCompleted')}</p>
              </div>
            </div>
          </div>
          
          <div className="lg:block hidden col-span-12 lg:col-span-5" data-aos="fade-left">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl transform rotate-6 backdrop-blur-sm pointer-events-none"></div>
              <div className="relative bg-white/95 dark:bg-darklight/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {/* Card image - absolute path required for locale routing */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={HERO_CARD_IMAGE}
                    alt="Construction Work"
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
