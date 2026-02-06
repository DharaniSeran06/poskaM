import { unstable_noStore as noStore } from 'next/cache';
import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';
import ServiceGallery from "@/components/services/service-gallery";
import { ServiceBeforeAfter } from "@/components/services/ServiceDetailClient";

// ===========================================
// ROUTE SEGMENT CONFIG
// ===========================================
// Force dynamic rendering - prevents static generation completely
export const dynamic = 'force-dynamic';

// ===========================================
// DATA FETCHING
// ===========================================

async function getServiceBySlug(slug: string, locale: string) {
  if (!slug) return null;
  
  const safeLocale = ['en', 'de'].includes(locale) ? locale : 'en';

  try {
    const titleField = safeLocale === 'en' ? 'title.en' : `coalesce(title.${safeLocale}, title.en)`;
    const descField = safeLocale === 'en' ? 'description.en' : `coalesce(description.${safeLocale}, description.en)`;
    const shortDescField = safeLocale === 'en' ? 'shortDescription.en' : `coalesce(shortDescription.${safeLocale}, shortDescription.en)`;
    const categoryField = safeLocale === 'en' ? 'category.en' : `coalesce(category.${safeLocale}, category.en)`;
    const metaDescField = safeLocale === 'en' ? 'metaDescription.en' : `coalesce(metaDescription.${safeLocale}, metaDescription.en)`;

    const query = `*[
      _type == "service" &&
      !(_id in path("drafts.**")) &&
      slug.current == $slug
    ][0] {
      _id,
      "title": ${titleField},
      "slug": slug.current,
      "description": ${descField},
      "shortDescription": ${shortDescField},
      "thumbnail": coalesce(thumbnail.asset->url, ""),
      "heroImage": coalesce(heroImage.asset->url, ""),
      "galleryImages": galleryImages[].asset->url,
      "beforeImage": coalesce(beforeImage.asset->url, ""),
      "afterImage": coalesce(afterImage.asset->url, ""),
      "category": ${categoryField},
      "metaDescription": ${metaDescField}
    }`;

    const service = await client.fetch(query, { slug });
    return service || null;
  } catch (error) {
    console.error('[Services Detail] Sanity fetch error:', error);
    return null;
  }
}

// ===========================================
// FALLBACK DATA
// ===========================================

const servicesData: Record<string, {
  title: string;
  titleKey: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  beforeImage?: string;
  afterImage?: string;
  metaDescription: string;
}> = {
  "plaster-casts": {
    title: "Plaster casts",
    titleKey: "plasterCasts",
    description: "Professional interior and exterior plastering services. Smooth finishes, textured surfaces, and decorative plasterwork to enhance your space.",
    heroImage: "/images/services/plaster.png",
    beforeImage: "/images/leranmore services/plaster/01.jpg",
    afterImage: "/images/leranmore services/plaster/after.jpg",
    galleryImages: [
      "/images/leranmore services/plaster/01.jpg",
      "/images/leranmore services/plaster/02.jpg",
      "/images/leranmore services/plaster/03.jpg",
      "/images/leranmore services/plaster/04.jpg",
      "/images/leranmore services/plaster/05.jpg",
      "/images/leranmore services/plaster/06.jpg",
    ],
    metaDescription: "Professional plaster casting services with Swiss precision."
  },
  "drywall": {
    title: "Drywall",
    titleKey: "drywall",
    description: "Complete drywall installation and finishing services. Professional drywalling solutions for interior spaces.",
    heroImage: "/images/services/drywall.jpg",
    beforeImage: "/images/leranmore services/drywalling learn more/img1.jpg",
    afterImage: "/images/leranmore services/drywalling learn more/img6.jpg",
    galleryImages: [
      "/images/leranmore services/drywalling learn more/img1.jpg",
      "/images/leranmore services/drywalling learn more/img2.jpg",
      "/images/leranmore services/drywalling learn more/img3.jpg",
      "/images/leranmore services/drywalling learn more/img4.jpg",
      "/images/leranmore services/drywalling learn more/img5.jpg",
      "/images/leranmore services/drywalling learn more/img6.jpg",
    ],
    metaDescription: "Professional drywall installation and finishing services."
  },
  "painting": {
    title: "Painting",
    titleKey: "painting",
    description: "Interior and exterior painting services with premium paints and finishes.",
    heroImage: "/images/services/Bathroom%20and%20kitchen%20renovation.jpg",
    beforeImage: "/images/leranmore services/bathroom/before.jpg",
    afterImage: "/images/leranmore services/bathroom/after.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
    ],
    metaDescription: "Professional interior and exterior painting services."
  },
  "facades-and-insulation": {
    title: "Facades and insulation",
    titleKey: "facadesAndInsulation",
    description: "Expert facade design, installation, and renovation with comprehensive insulation solutions.",
    heroImage: "/images/services/Facades%20and%20insulation.jpg",
    beforeImage: "/images/leranmore services/facades before nad after/before.jpg",
    afterImage: "/images/leranmore services/facades before nad after/after.jpg",
    galleryImages: [
      "/images/leranmore services/facades before nad after/facades/img-01.jpg",
      "/images/leranmore services/facades before nad after/facades/img-02.jpg",
      "/images/leranmore services/facades before nad after/facades/img-03.jpg",
      "/images/leranmore services/facades before nad after/facades/img-04.jpg",
      "/images/leranmore services/facades before nad after/facades/img-05.jpg",
      "/images/leranmore services/facades before nad after/facades/img-06.jpg",
    ],
    metaDescription: "Expert facade design and insulation solutions."
  },
  "customer-masons": {
    title: "Customer Masons",
    titleKey: "customerMasons",
    description: "Professional masonry services for all your construction needs.",
    heroImage: "/images/services/Customer%20bricklayer.png",
    beforeImage: "/images/leranmore services/bricklayering/img-01.jpg",
    afterImage: "/images/leranmore services/bricklayering/img-06.jpg",
    galleryImages: [
      "/images/leranmore services/bricklayering/img-01.jpg",
      "/images/leranmore services/bricklayering/img-02.jpg",
      "/images/leranmore services/bricklayering/img-03.jpg",
      "/images/leranmore services/bricklayering/img-04.jpg",
      "/images/leranmore services/bricklayering/img-05.jpg",
      "/images/leranmore services/bricklayering/img-06.jpg",
    ],
    metaDescription: "Professional masonry and bricklaying services."
  },
  "bathroom-kitchen-renovation": {
    title: "Bathroom-kitchen renovation",
    titleKey: "bathroomKitchenRenovation",
    description: "Complete renovation services for bathrooms and kitchens.",
    heroImage: "/images/services/Bathroom%20and%20kitchen%20renovation.jpg",
    beforeImage: "/images/leranmore services/bathroom/before.jpg",
    afterImage: "/images/leranmore services/bathroom/after.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
      "/images/leranmore services/bathroom/gallery/img-05.jpg",
      "/images/leranmore services/bathroom/gallery/img-06.jpg",
    ],
    metaDescription: "Complete bathroom and kitchen renovation services."
  },
  "general-demolition-work": {
    title: "General demolition work",
    titleKey: "generalDemolitionWork",
    description: "Professional demolition services for safe and efficient removal of structures.",
    heroImage: "/images/services/General%20demolition%20work.png",
    beforeImage: "/images/leranmore services/general/before-01.jpg",
    afterImage: "/images/leranmore services/general/after-01.jpg",
    galleryImages: [
      "/images/leranmore services/general/gallery/img-01.jpg",
      "/images/leranmore services/general/gallery/img-02.jpg",
      "/images/leranmore services/general/gallery/img-03.jpg",
      "/images/leranmore services/general/gallery/img-04.jpg",
      "/images/leranmore services/general/gallery/img-05.jpg",
      "/images/leranmore services/general/gallery/img-06.jpg",
    ],
    metaDescription: "Professional demolition services."
  },
};

// ===========================================
// PAGE COMPONENT
// ===========================================

type PageProps = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  // ⚠️ CRITICAL: Call noStore() FIRST - opts out of static rendering immediately
  noStore();
  
  // Await params (Next.js 15 async params)
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  
  // Fetch data in parallel
  let service: any = null;
  let t: (key: string) => string;
  let tNav: (key: string) => string;
  
  try {
    [service, t, tNav] = await Promise.all([
      getServiceBySlug(slug, locale),
      getTranslations('services'),
      getTranslations('navbar')
    ]);
  } catch (error) {
    console.error('[Services Detail] Error loading page:', error);
    // Fallback translations
    t = (key: string) => key;
    tNav = (key: string) => key;
  }

  // Fallback to static data if Sanity returns nothing
  const legacyService = !service ? servicesData[slug] : null;
  
  if (!service && !legacyService) {
    notFound();
  }

  // Merge service data
  const activeService = service || {
    title: legacyService!.title,
    description: legacyService!.description,
    heroImage: legacyService!.heroImage,
    galleryImages: legacyService!.galleryImages,
    beforeImage: legacyService!.beforeImage,
    afterImage: legacyService!.afterImage,
  };

  const serviceTitle = service 
    ? service.title 
    : (tNav(`submenu.${legacyService!.titleKey}`) || legacyService!.title);

  return (
    <>
      <title>{`${serviceTitle} | POSKA MANOLITO AG`}</title>
      <meta name="description" content={service?.metaDescription || legacyService?.metaDescription || activeService.description} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[500px] flex items-center">
          <div className="absolute inset-0 z-0">
            {activeService.heroImage ? (
              <Image
                src={activeService.heroImage}
                alt={serviceTitle}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full bg-gray-800"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#016aac]/85 via-[#016aac]/75 to-[#016aac]/85"></div>
          </div>

          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4">
            <div className="max-w-3xl" data-aos="fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                {serviceTitle}
              </h1>
              <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow-md">
                {service?.shortDescription || service?.description || activeService.description}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert max-w-none" data-aos="fade-up">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                  {service?.description || activeService.description}
                </p>
              </div>

              {/* Before/After Slider */}
              {activeService.beforeImage && activeService.afterImage && (
                <ServiceBeforeAfter
                  beforeImage={activeService.beforeImage}
                  afterImage={activeService.afterImage}
                  beforeLabel={t('before') || 'Before'}
                  afterLabel={t('after') || 'After'}
                  title={t('transformationShowcase') || 'Transformation Showcase'}
                  description={t('transformationDescription') || 'See the before and after'}
                />
              )}

              {/* CTA Button */}
              <div className="mt-12" data-aos="fade-up" data-aos-delay="200">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
                >
                  {t('getQuote') || 'Get a Quote'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {activeService.galleryImages && activeService.galleryImages.length > 0 && (
          <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
              <div className="text-center mb-12" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-4">
                  {t('ourWork') || 'Our Work'}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {`Examples of our ${serviceTitle.toLowerCase()} projects`}
                </p>
              </div>

              <ServiceGallery 
                images={activeService.galleryImages} 
                serviceTitle={serviceTitle}
                autoPlay={false}
              />
            </div>
          </section>
        )}

        {/* Contact CTA Section */}
        <section className="py-16 lg:py-24 bg-[#016aac]">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center">
            <div className="max-w-2xl mx-auto" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {t('readyToStart') || 'Ready to Start Your Project?'}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                {`Contact us for your ${serviceTitle.toLowerCase()} needs`}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-[#016aac] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:scale-105"
              >
                {t('contactUs') || 'Contact Us'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
