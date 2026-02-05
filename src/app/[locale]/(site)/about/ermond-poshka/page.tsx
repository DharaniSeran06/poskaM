import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

// Use ISR for instant navigation
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('company.ermondPoshka');
  return {
    title: t('title') + " - " + t('subtitle') + " | POSKA MANOLITO AG",
    description: "Learn about Ermond Poshka, Managing Director of POSKA MANOLITO AG, and the company's history, mission, and values.",
  };
}

export default async function ErmondPoshkaPage() {
  const t = await getTranslations('company.ermondPoshka');
  const tNav = await getTranslations('navbar');
  
  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/about", text: tNav('submenu.aboutUs') },
    { href: "/about/ermond-poshka", text: t('title') },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="text-center bg-cover pt-36 pb-20 relative bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden">
        <h2 className="text-midnight_text text-[50px] leading-[1.2] relative font-bold dark:text-white capitalize">
          {t('title')}
        </h2>
        <p className="text-lg text-gray font-normal max-w-md w-full mx-auto mt-7 mb-12 sm:px-0 px-4">
          {t('subtitle')}
        </p>
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
      </section>

      {/* Section 1: Why Poska Manolito S.A.? */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-8" data-aos="fade-up">
              {t('whyPoskaManolito')}
            </h2>
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('whyPoskaManolito1')}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('whyPoskaManolito2')}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('whyPoskaManolito3')}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('whyPoskaManolito4')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Company Timeline */}
      <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Timeline Content */}
            <div className="order-2 lg:order-1" data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-12">
                {t('companyTimeline')}
              </h2>
              
              <div className="space-y-10 relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#016aac]/20 dark:bg-[#016aac]/30"></div>
                
                {/* 2003 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="100">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t('timeline2003')}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">{t('timeline2003')}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('timeline2003Text')}
                    </p>
                  </div>
                </div>

                {/* 2009 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="200">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t('timeline2009')}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">{t('timeline2009')}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('timeline2009Text')}
                    </p>
                  </div>
                </div>

                {/* 2012 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="300">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t('timeline2012')}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">{t('timeline2012')}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('timeline2012Text')}
                    </p>
                  </div>
                </div>

                {/* 2020 */}
                <div className="relative pl-16" data-aos="fade-up" data-aos-delay="400">
                  <div className="absolute left-0 top-2 w-12 h-12 bg-[#016aac] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{t('timeline2020')}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-[#016aac] mb-3">{t('timeline2020')}</h3>
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                      {t('timeline2020Text')}
                    </p>
                  </div>
                </div>

                {/* Final Note */}
                <div className="relative pl-16 pt-4" data-aos="fade-up" data-aos-delay="500">
                  <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    {t('timelineNote')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Owner Image */}
            <div className="order-1 lg:order-2" data-aos="fade-left">
              <div className="sticky top-24">
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="/images/owner-picture.jpeg"
                      alt="Ermond Poshka - Managing Director"
                      fill
                      className="object-contain rounded-2xl"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Mission Statement */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-12 text-center" data-aos="fade-up">
              {t('missionStatement')}
            </h2>
            
            <div className="space-y-6" data-aos="fade-up" data-aos-delay="100">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission1')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission2')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission3')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission4')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission5')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission6')}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('mission7')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
