'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const t = useTranslations('home.testimonials');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate how many pairs we can show
  const maxPairs = Math.ceil(testimonials.length / 2);
  const currentPair = Math.floor(currentIndex / 2);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 2;
      // If we've reached the end, loop back to start
      if (nextIndex >= testimonials.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 2;
      // If we go before the start, loop to the last pair
      if (prevIndex < 0) {
        const lastPairStart = Math.floor((testimonials.length - 1) / 2) * 2;
        return lastPairStart;
      }
      return prevIndex;
    });
  };

  return (
    <section className="px-4 md:px-0 py-20 lg:py-28 bg-section dark:bg-darkmode">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('noTestimonials') || 'No testimonials available at the moment.'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => {
                // Calculate actual index for animation delay
                const actualIndex = currentIndex + index;
                return (
                <div
                  key={testimonial._id || actualIndex}
                  className="bg-white dark:bg-darklight rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                      </svg>
                    ))}
                  </div>
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-[#016aac]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10z"/>
                    </svg>
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-dark_border pt-4 flex items-center gap-4">
                    {testimonial.image && (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="text-xl font-bold text-midnight_text dark:text-white">
                        {testimonial.name}
                      </p>
                      {testimonial.role && (
                        <p className="text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </>
        )}

        {/* Slider Controls - Only show if there are more than 2 testimonials */}
        {testimonials.length > 2 && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white dark:bg-darklight border border-gray-200 dark:border-dark_border rounded-lg hover:bg-[#016aac] hover:text-white hover:border-[#016aac] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: maxPairs }).map((_, pairIndex) => {
                const pairStartIndex = pairIndex * 2;
                const isActive = Math.floor(currentIndex / 2) === pairIndex;
                return (
                  <button
                    key={pairIndex}
                    onClick={() => setCurrentIndex(pairStartIndex)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#016aac] w-8"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    aria-label={`Go to testimonial pair ${pairIndex + 1}`}
                  />
                );
              })}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white dark:bg-darklight border border-gray-200 dark:border-dark_border rounded-lg hover:bg-[#016aac] hover:text-white hover:border-[#016aac] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
