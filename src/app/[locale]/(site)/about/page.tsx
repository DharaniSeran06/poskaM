import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import HeroSub from "@/components/shared/hero-sub";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

// Use ISR for instant navigation - pages are pre-rendered and cached
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us | POSKA MANOLITO AG",
    description: "Learn about POSKA MANOLITO AG - a trusted construction company with over 15 years of experience in construction, plastering, facades, painting, and renovation across Switzerland.",
  };
}

export default async function AboutPage() {
  const t = await getTranslations('company');
  const tNav = await getTranslations('navbar');
  
  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/about", text: t('title') },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title={t('title')}
        description={t('heroDescription')}
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Company History Section */}
      <section className="py-12 lg:py-20 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 relative z-20" data-aos="fade-right">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-midnight_text dark:text-white mb-3 leading-[1.1]">
                {t('companyHistory')}
              </h2>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-6 leading-tight">
                {t('howWeBecame')}
              </h3>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
                {t('historyText1')}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
                {t('historyText2')}
              </p>
              <div className="flex justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="200">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-8 py-3.5 border-2 border-[#016aac] text-[#016aac] bg-white dark:bg-darklight rounded-lg hover:bg-[#016aac] hover:text-white transition-all duration-300 font-semibold text-base"
                >
                  {t('moreDetails')}
                </Link>
              </div>
            </div>

            {/* Right Side - Owner Card and Experience Card */}
            <div className="order-1 lg:order-2 relative space-y-8 z-10" data-aos="fade-left" data-aos-delay="100">
              {/* Owner Card */}
              <div className="bg-white dark:bg-darklight rounded-2xl shadow-xl overflow-hidden relative z-10" data-aos="fade-up" data-aos-delay="150">
                <div className="relative rounded-t-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex justify-center items-center">
                  <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto">
                    <Image
                      src="/images/owner-picture.jpeg"
                      alt="Ermond Poshka - Managing Director"
                      fill
                      className="object-contain rounded-t-2xl"
                      priority
                    />
                  </div>
                </div>
                <div className="p-6 text-center">
                  <p className="text-xl font-bold text-midnight_text dark:text-white mb-2">
                    Ermond Poshka
                  </p>
                  <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                    {t('managingDirector')}
                  </p>
                  <Link
                    href="/about/ermond-poshka"
                    className="inline-flex items-center px-6 py-3 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-sm"
                  >
                    {t('learnMore')}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Experience Card */}
              <div className="relative">
                <div className="bg-herobg dark:bg-darklight rounded-2xl p-10 lg:p-14 min-h-[400px] flex items-center justify-center">
                  <div className="bg-white dark:bg-darkmode rounded-xl p-10 lg:p-12 w-full max-w-sm border-[3px] border-[#016aac] shadow-lg relative" data-aos="zoom-in" data-aos-delay="300">
                    <h3 className="text-lg md:text-xl font-bold text-midnight_text dark:text-white uppercase mb-8 tracking-wider leading-tight">
                      {t('bestConstructionCompany')}
                    </h3>
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-shrink-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-normal">{t('yearsExperience')}</p>
                        <p className="text-7xl md:text-8xl font-bold text-[#016aac] leading-none">15+</p>
                      </div>
                      <div className="relative flex-shrink-0 flex items-center justify-center">
                        <div className="relative w-28 h-28 md:w-36 md:h-36">
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="60" cy="60" r="55" fill="#016aac" fillOpacity="0.25" />
                            <path d="M35 25 L35 95 L60 95 Q85 95 85 60 Q85 25 60 25 Z" fill="#016aac" fillOpacity="0.65" />
                            <path d="M35 25 L60 25 Q85 25 85 60 Q85 95 60 95 L35 95 Z" fill="#016aac" fillOpacity="0.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16" data-aos="fade-up">
              <div className="relative">
                <div className="absolute inset-0 bg-[#016aac]/10 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white dark:bg-darklight rounded-2xl p-8 shadow-xl overflow-hidden">
                  <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                      src="/images/services/Customer%20bricklayer.png"
                      alt="About POSKA MANOLITO AG"
                      fill
                      className="object-cover rounded-xl"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#016aac] text-white p-6 rounded-xl shadow-2xl" data-aos="fade-up" data-aos-delay="200">
                  <p className="text-sm text-white/80 mb-1">{t('yearsExperience')}</p>
                  <p className="text-5xl font-bold">15+</p>
                </div>
              </div>

              <div data-aos="fade-left">
                <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6">
                  {t('whoWeAre')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('whoWeAreText1')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('whoWeAreText2')}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('whoWeAreText3')}
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16" data-aos="fade-up">
              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg border-t-4 border-[#016aac]">
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('ourMission')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('missionText')}
                </p>
              </div>
              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg border-t-4 border-[#016aac]">
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('ourVision')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('visionText')}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up">
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac] text-center">
                <p className="text-3xl font-bold text-[#016aac] mb-2">500+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('projectsCompleted')}</p>
              </div>
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac] text-center">
                <p className="text-3xl font-bold text-[#016aac] mb-2">15+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('yearsExperience')}</p>
              </div>
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac] text-center">
                <p className="text-3xl font-bold text-[#016aac] mb-2">98%</p>
                <p className="text-gray-600 dark:text-gray-400">{t('clientSatisfaction')}</p>
              </div>
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg border-t-4 border-[#016aac] text-center">
                <p className="text-3xl font-bold text-[#016aac] mb-2">100+</p>
                <p className="text-gray-600 dark:text-gray-400">{t('expertWorkers')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
                {t('whyChooseUsTitle')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('whyChooseUsDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="100">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('qualityMaterials')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('qualityMaterialsText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="200">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('skilledWorkers')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('skilledWorkersText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="300">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('onTimeDelivery')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('onTimeDeliveryText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg" data-aos="fade-up" data-aos-delay="400">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('safetyStandards')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t('safetyStandardsText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-8 rounded-xl shadow-lg md:col-span-2" data-aos="fade-up" data-aos-delay="500">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                      {t('customerSatisfaction')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('customerSatisfactionText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
                {t('ourValues')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('ourValuesDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-dark_border" data-aos="fade-up" data-aos-delay="100">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                  {t('integrity')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('integrityText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-dark_border" data-aos="fade-up" data-aos-delay="200">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                  {t('reliability')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('reliabilityText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-dark_border" data-aos="fade-up" data-aos-delay="300">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                  {t('transparency')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('transparencyText')}
                </p>
              </div>

              <div className="bg-white dark:bg-darklight p-6 rounded-xl shadow-lg text-center border border-gray-200 dark:border-dark_border" data-aos="fade-up" data-aos-delay="400">
                <div className="bg-[#016aac]/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3">
                  {t('excellence')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t('excellenceText')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 lg:py-24 bg-[#016aac]">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('ctaTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('ctaDescription')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#016aac] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:scale-105"
            >
              {t('ctaButton')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
