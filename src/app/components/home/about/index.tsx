"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function About() {
  const t = useTranslations('home.about');
  
  return (
    <section className="py-20 lg:py-28 bg-section dark:bg-darkmode">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="order-2 lg:order-1"
            data-aos="fade-right"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#016aac]/10 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white dark:bg-darklight rounded-2xl p-8 shadow-xl overflow-hidden">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/services/Customer bricklayer.png"
                    alt="About POSKA MANOLITO AG"
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
              
              {/* Experience Badge */}
              <div className="absolute -bottom-6 -right-6 bg-[#016aac] text-white p-6 rounded-xl shadow-2xl" data-aos="fade-up" data-aos-delay="200">
                <p className="text-sm text-white/80 mb-1">{t('yearsExperience')}</p>
                <p className="text-5xl font-bold">15+</p>
              </div>
            </div>
          </div>
          
          <div
            className="order-1 lg:order-2"
            data-aos="fade-left"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {t('description1')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {t('description2')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {t('description3')}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac]">
                <p className="text-3xl font-bold text-[#016aac] mb-2">500+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('projectsCompleted')}</p>
              </div>
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac]">
                <p className="text-3xl font-bold text-[#016aac] mb-2">98%</p>
                <p className="text-gray-600 dark:text-gray-400">{t('clientSatisfaction')}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-block px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-colors font-semibold text-lg shadow-md text-center"
              >
                {t('learnMore')}
              </Link>
              <Link
                href="/about/our-story"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#016aac] text-[#016aac] bg-white dark:bg-darklight rounded-lg hover:bg-[#016aac] hover:text-white transition-all duration-300 font-semibold text-lg shadow-md"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('watchStory')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
