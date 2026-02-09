'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

/* ─────────────────────────── types ─────────────────────────── */

interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  content: string;
  image?: string;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

/* ─────────────────────────── card ──────────────────────────── */

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <div
      className="group relative break-inside-avoid mb-6
        bg-white/80 dark:bg-white/[0.07] backdrop-blur-xl rounded-2xl p-7
        shadow-[0_4px_24px_rgba(1,106,172,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-out
        lg:hover:-translate-y-1
        lg:hover:shadow-[0_8px_32px_rgba(1,106,172,0.18),0_0_0_1px_rgba(1,106,172,0.10)]
        dark:lg:hover:shadow-[0_12px_40px_rgba(1,106,172,0.3),0_0_0_1px_rgba(1,106,172,0.20)]
        active:shadow-[0_4px_20px_rgba(1,106,172,0.22)] active:scale-[0.985]
        will-change-transform"
      data-aos="fade-up"
      data-aos-delay={index * 80}
      data-aos-duration="600"
    >
      {/* Background quote icon – decorative */}
      <svg
        className="absolute top-5 right-5 w-10 h-10 text-[#016aac]/[0.06] dark:text-white/[0.06] pointer-events-none"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10z" />
      </svg>

      {/* Star rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating || 5)].map((_, i) => (
          <svg
            key={i}
            className="w-4 h-4 text-amber-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="text-[15px] leading-relaxed text-gray-700 dark:text-white/90 mb-6 italic">
        &ldquo;{testimonial.content}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-[#016aac]/10 dark:bg-white/10 mb-5" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {testimonial.image ? (
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#016aac]/15 dark:ring-white/20 flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
        ) : (
          <div className="w-11 h-11 rounded-full bg-[#016aac]/10 dark:bg-[#016aac]/40 flex items-center justify-center ring-2 ring-[#016aac]/15 dark:ring-white/20 flex-shrink-0">
            <span className="text-[#016aac] dark:text-white font-semibold text-sm">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-midnight_text dark:text-white truncate">
            {testimonial.name}
          </p>
          {testimonial.role && (
            <p className="text-xs text-gray-500 dark:text-white/50 truncate">{testimonial.role}</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── main section ─────────────────────── */

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('home.testimonials');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /* ── mobile scroll state ─────────────────────────────────── */
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials]);

  const scrollBy = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' });
  };

  /* ── masonry column distribution (desktop) ───────────────── */
  const cols: [Testimonial[], Testimonial[], Testimonial[]] = [[], [], []];
  testimonials.forEach((t, i) => cols[i % 3].push(t));

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* ── light-blue gradient background ──────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f0f7ff] via-[#e4f0fb] to-[#d6eaf8] dark:from-[#0a1628] dark:via-[#0e1f3d] dark:to-[#012a52] pointer-events-none" />
      {/* subtle radial glow for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_60%_-5%,rgba(1,106,172,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(1,106,172,0.25),transparent)] pointer-events-none" />
      {/* soft diagonal accent */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(1,106,172,0.04)_0%,transparent_50%,rgba(1,106,172,0.03)_100%)] dark:bg-none pointer-events-none" />

      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4 relative z-10">
        {/* ── section header ───────────────────────────────── */}
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#016aac] dark:text-[#4da8e0] mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-base md:text-lg text-gray-500 dark:text-white/60 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-white/50">
              {t('noTestimonials') || 'No testimonials available at the moment.'}
            </p>
          </div>
        ) : (
          <>
            {/* ── desktop / tablet: masonry columns ────────── */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cols.map((col, colIdx) => (
                <div
                  key={colIdx}
                  className={colIdx === 1 ? 'md:mt-8' : ''}
                >
                  {col.map((testimonial, cardIdx) => (
                    <TestimonialCard
                      key={testimonial._id || `${colIdx}-${cardIdx}`}
                      testimonial={testimonial}
                      index={colIdx + cardIdx * 3}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* ── mobile: horizontal swipe carousel ────────── */}
            <div className="md:hidden relative">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth
                  pb-4 -mx-4 px-4
                  scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                {testimonials.map((testimonial, idx) => (
                  <div
                    key={testimonial._id || idx}
                    className="flex-shrink-0 w-[85vw] max-w-[340px] snap-center"
                  >
                    <TestimonialCard testimonial={testimonial} index={idx} />
                  </div>
                ))}
              </div>

              {/* Scroll arrows */}
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={() => scrollBy(-1)}
                  disabled={!canScrollLeft}
                  aria-label="Scroll left"
                  className="p-2.5 rounded-full bg-[#016aac]/10 dark:bg-white/10 backdrop-blur-sm text-[#016aac] dark:text-white
                    transition-all duration-200
                    disabled:opacity-30 disabled:cursor-default
                    active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollBy(1)}
                  disabled={!canScrollRight}
                  aria-label="Scroll right"
                  className="p-2.5 rounded-full bg-[#016aac]/10 dark:bg-white/10 backdrop-blur-sm text-[#016aac] dark:text-white
                    transition-all duration-200
                    disabled:opacity-30 disabled:cursor-default
                    active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
