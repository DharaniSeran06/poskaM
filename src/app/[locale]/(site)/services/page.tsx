import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import HeroSub from "@/components/shared/hero-sub";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';

// Enable ISR with revalidation for better production performance
export const revalidate = 60; // Revalidate every 60 seconds

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Services | POSKA MANOLITO AG",
    description: "Professional construction, renovation, and building services across Switzerland. Expert craftsmanship for all your construction needs.",
  };
}

// Fetch services from Sanity with language support
async function getServices(locale: string) {
  const safeLocale = locale && ['en', 'de'].includes(locale) ? locale : 'en';
  
  try {
    // Build language-aware field selections
    const titleField = safeLocale === 'en' ? 'title.en' : `coalesce(title.${safeLocale}, title.en)`;
    const shortDescField = safeLocale === 'en' ? 'shortDescription.en' : `coalesce(shortDescription.${safeLocale}, shortDescription.en)`;
    const descField = safeLocale === 'en' ? 'description.en' : `coalesce(description.${safeLocale}, description.en)`;
    const categoryField = safeLocale === 'en' ? 'category.en' : `coalesce(category.${safeLocale}, category.en)`;

    const query = `*[
      _type == "service" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ] | order(order asc, _createdAt desc) {
      _id,
      "title": ${titleField},
      "slug": slug.current,
      "shortDescription": ${shortDescField},
      "description": ${descField},
      "thumbnail": coalesce(thumbnail.asset->url, ""),
      "heroImage": coalesce(heroImage.asset->url, ""),
      "category": ${categoryField},
      featured,
      order
    }`;

    const services = await client.fetch(query, {}, {
      cache: 'force-cache',
      next: { revalidate: 60, tags: ['services'] }
    });

    console.log(`✅ Fetched ${(services || []).length} services from Sanity (locale: ${safeLocale})`);
    return services || [];
  } catch (error) {
    console.error('❌ Error fetching services from Sanity:', error);
    return [];
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('services');
  const services = await getServices(locale);
  
  const breadcrumbLinks = [
    { href: "/", text: t('breadcrumb.home') || 'Home' },
    { href: "/services", text: t('breadcrumb.services') || 'Services' },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title={t('title') || 'Our Services'}
        description={t('description') || 'Professional construction and renovation services'}
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Services Grid Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('noServices') || 'No services found. Please check back later.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: any, index: number) => (
                <Link
                  key={service._id || service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white/95 dark:bg-darklight/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Semi-transparent gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-[#016aac]/5 dark:from-darklight/90 dark:via-darklight/95 dark:to-[#016aac]/10 rounded-xl pointer-events-none z-0"></div>
                  
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#016aac] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  
                  {/* Service Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800 z-0">
                    {service.thumbnail ? (
                      <Image
                        src={service.thumbnail}
                        alt={service.title || 'Service image'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : service.heroImage ? (
                      <Image
                        src={service.heroImage}
                        alt={service.title || 'Service image'}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <span className="text-gray-400 dark:text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#016aac]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-8 relative z-10">
                    {service.category && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-[#016aac] bg-[#016aac]/10 rounded-full mb-3">
                        {service.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-3 group-hover:text-[#016aac] transition-colors duration-300">
                      {service.title || 'Untitled Service'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {service.shortDescription || service.description || 'No description available.'}
                    </p>
                    <div className="flex items-center text-[#016aac] font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      {t('learnMore') || 'Learn More'}
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
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
              {t('cta.title') || 'Ready to Get Started?'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('cta.description') || 'Contact us today to discuss your project and get a free quote.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
            >
              {t('cta.button') || 'Contact Us'}
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
