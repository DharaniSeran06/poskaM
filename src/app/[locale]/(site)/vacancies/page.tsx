import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/components/shared/hero-sub";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Careers & Vacancies | POSKA MANOLITO AG",
    description: "Join our team! Explore career opportunities and job vacancies at POSKA MANOLITO AG. We're looking for talented professionals to join our construction and renovation team.",
  };
}

// Fetch vacancies from Sanity with language support
async function getVacancies(locale: string) {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'jobTitle.en' : `coalesce(jobTitle.${locale}, jobTitle.en)`;
    const descField = locale === 'en' ? 'jobDescription.en' : `coalesce(jobDescription.${locale}, jobDescription.en)`;

    const query = `*[
      _type == "vacancy" &&
      !(_id in path("drafts.**")) &&
      isActive == true
    ] | order(order asc, publishedDate desc) {
      _id,
      "title": ${titleField},
      "description": ${descField},
      location,
      jobType,
      experienceLevel,
      applyLink,
      publishedDate,
      order
    }`;

    const vacancies = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`✅ Vacancies: Fetched ${vacancies.length} vacancies from Sanity (locale: ${locale})`);
    console.log('📋 Vacancies data:', vacancies);
    return vacancies || [];
  } catch (error) {
    console.error('❌ Vacancies: Error fetching vacancies from Sanity:', error);
    return [];
  }
}

// Format date for display
function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Format job type for display
function formatJobType(jobType: string): string {
  const types: Record<string, string> = {
    'full-time': 'Full-time',
    'part-time': 'Part-time',
    'contract': 'Contract',
    'internship': 'Internship',
    'temporary': 'Temporary',
  };
  return types[jobType] || jobType;
}

export default async function VacanciesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('vacancies');
  const tNav = await getTranslations('navbar');
  const vacancies = await getVacancies(locale);

  const breadcrumbLinks = [
    { href: "/", text: tNav('home') },
    { href: "/about", text: tNav('company') },
    { href: "/vacancies", text: t('title') },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title={t('title')}
        description={t('description')}
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Vacancies Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          {vacancies.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('noVacancies')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {t('noVacanciesDescription')}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {vacancies.map((vacancy: any, index: number) => (
                <div
                  key={vacancy._id}
                  className="bg-white dark:bg-darklight border border-gray-200 dark:border-dark_border rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    {/* Left: Job Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-midnight_text dark:text-white mb-4">
                        {vacancy.title || 'Untitled Position'}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="font-medium">{vacancy.location || 'Location TBD'}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{formatJobType(vacancy.jobType || 'full-time')}</span>
                        </div>

                        {vacancy.experienceLevel && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            <span className="font-medium capitalize">{vacancy.experienceLevel}</span>
                          </div>
                        )}

                        {vacancy.publishedDate && (
                          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                            <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{formatDate(vacancy.publishedDate)}</span>
                          </div>
                        )}
                      </div>

                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                          {vacancy.description || 'No description available.'}
                        </p>
                      </div>
                    </div>

                    {/* Right: Apply Button */}
                    <div className="md:flex-shrink-0 md:ml-6">
                      {vacancy.applyLink && vacancy.applyLink.startsWith('http') ? (
                        <a
                          href={vacancy.applyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105 whitespace-nowrap"
                        >
                          {t('applyNow')}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      ) : (
                        <Link
                          href={`/company/careers/apply?position=${encodeURIComponent(vacancy.title || '')}`}
                          className="inline-flex items-center justify-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105 whitespace-nowrap"
                        >
                          {t('applyNow')}
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
          <div className="max-w-2xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('cta.description')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
            >
              {t('cta.button')}
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
