"use client";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import dynamic from 'next/dynamic';

/**
 * Hero component for the homepage
 * Clean, corporate layout with Threads WebGL animation background
 */

// Lazy-load the WebGL Threads component (SSR disabled – it needs <canvas>)
const Threads = dynamic(() => import('./Threads'), { ssr: false });

const Hero = () => {
  const t = useTranslations('home.hero');

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-white dark:bg-darkmode flex items-center"
      style={{ zIndex: 1 }}
    >
      {/* ═══════════════════════════════════════════════════
          LAYER 1 — Threads WebGL Animation (background)
          ═══════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-30 dark:opacity-20">
        <Threads
          color={[0.01, 0.41, 0.67]}
          amplitude={1}
          distance={0}
          enableMouseInteraction
        />
      </div>

      {/* ═══════════════════════════════════════════════════
          LAYER 2 — Hero Content
          ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-6 md:px-10 py-32 lg:py-40">
        <div className="flex flex-col items-start">

          {/* Founded badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full
              bg-primary/5 dark:bg-primary/10 border border-primary/15 dark:border-primary/25
              text-primary dark:text-cyan text-sm font-medium tracking-wide"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <svg
              className="w-3.5 h-3.5 opacity-70"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Founded in 2003
          </div>

          {/* Title: POSKA MANOLITO AG */}
          <h1
            className="whitespace-nowrap text-[clamp(2rem,7vw,6.5rem)]
              font-bold leading-[1] tracking-tight
              text-midnight_text dark:text-white mb-6"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            POSKA MANOLITO <span className="text-primary">AG</span>
          </h1>

          {/* Accent line */}
          <div
            className="w-16 h-[3px] rounded-full bg-primary mb-8"
            aria-hidden="true"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="600"
          />

          {/* Services */}
          <p
            className="max-w-3xl text-base md:text-lg tracking-[0.15em] uppercase font-medium
              text-gray dark:text-gray mb-12"
            data-aos="fade-right"
            data-aos-delay="300"
            data-aos-duration="600"
          >
            Plastering
            <span className="mx-3 text-primary/40">|</span>
            Facades
            <span className="mx-3 text-primary/40">|</span>
            Painting
          </p>

          {/* Contact button */}
          <div data-aos="fade-up" data-aos-delay="400" data-aos-duration="600">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-4
                bg-primary text-white rounded-lg
                hover:bg-primaryDark active:scale-[0.97]
                transition-all duration-300
                font-semibold text-base tracking-wide shadow-lg shadow-primary/20"
            >
              {t('contactUs')}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 mt-20 pt-10
              border-t border-border dark:border-dark_border"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="600"
          >
            <div className="flex items-center space-x-2.5">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                  </svg>
                ))}
              </div>
              <div>
                <p className="text-base font-semibold text-midnight_text dark:text-white">{t('rating')}</p>
                <p className="text-xs text-gray dark:text-gray">{t('fromReviews')}</p>
              </div>
            </div>

            <div className="h-10 w-px bg-border dark:bg-dark_border hidden sm:block" />

            <div>
              <p className="text-2xl font-bold text-midnight_text dark:text-white">15+</p>
              <p className="text-xs text-gray dark:text-gray">{t('yearsExperience')}</p>
            </div>

            <div className="h-10 w-px bg-border dark:bg-dark_border hidden sm:block" />

            <div>
              <p className="text-2xl font-bold text-midnight_text dark:text-white">500+</p>
              <p className="text-xs text-gray dark:text-gray">{t('projectsCompleted')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
