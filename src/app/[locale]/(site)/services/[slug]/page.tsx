import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import BeforeAfterSlider from "@/app/components/shared/before-after-slider";
import ServiceGallery from "@/app/components/services/service-gallery";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

// Fetch service by slug from Sanity with language support
async function getServiceBySlug(slug: string, locale: string) {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'title.en' : `coalesce(title.${locale}, title.en)`;
    const descField = locale === 'en' ? 'description.en' : `coalesce(description.${locale}, description.en)`;
    const shortDescField = locale === 'en' ? 'shortDescription.en' : `coalesce(shortDescription.${locale}, shortDescription.en)`;
    const categoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;
    const metaDescField = locale === 'en' ? 'metaDescription.en' : `coalesce(metaDescription.${locale}, metaDescription.en)`;

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

    const service = await client.fetch(query, { slug }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    console.log(`✅ Fetched service from Sanity (locale: ${locale}):`, service ? service.title : 'Not found');
    return service;
  } catch (error) {
    console.error('❌ Error fetching service from Sanity:', error);
    return null;
  }
}

// Legacy service data mapping (fallback for old slugs)
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
    description: "Professional interior and exterior plastering services. Smooth finishes, textured surfaces, and decorative plasterwork to enhance your space. Our expert team delivers precision plaster casting work for both residential and commercial projects, ensuring durable and aesthetically pleasing results.",
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
    metaDescription: "Professional plaster casting services with Swiss precision. Expert interior and exterior plastering for residential and commercial projects."
  },
  "drywall": {
    title: "Drywall",
    titleKey: "drywall",
    description: "Complete drywall installation and finishing services. Professional drywalling solutions for interior spaces, including framing, installation, taping, and finishing. We provide smooth, seamless walls and ceilings that meet the highest quality standards.",
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
    metaDescription: "Professional drywall installation and finishing services. Expert drywalling solutions for interior spaces with Swiss precision."
  },
  "painting": {
    title: "Painting",
    titleKey: "painting",
    description: "Interior and exterior painting services with premium paints and finishes. Professional preparation and application for lasting results. Our skilled painters deliver flawless finishes that protect and beautify your property, using only the highest quality materials and techniques.",
    heroImage: "/images/services/Bathroom%20and%20kitchen%20renovation.jpg",
    beforeImage: "/images/leranmore services/bathroom/before.jpg",
    afterImage: "/images/leranmore services/bathroom/after.jpg",
    galleryImages: [
      "/images/leranmore services/bathroom/gallery/img-01.jpg",
      "/images/leranmore services/bathroom/gallery/img-02.jpg",
      "/images/leranmore services/bathroom/gallery/img-03.jpg",
      "/images/leranmore services/bathroom/gallery/img-04.jpg",
    ],
    metaDescription: "Professional interior and exterior painting services with premium paints. Expert preparation and application for lasting results."
  },
  "facades-and-insulation": {
    title: "Facades and insulation",
    titleKey: "facadesAndInsulation",
    description: "Expert facade design, installation, and renovation. Modern materials and techniques to protect and beautify your building exterior. Comprehensive insulation solutions that improve energy efficiency while enhancing the aesthetic appeal of your property.",
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
    metaDescription: "Expert facade design, installation, and renovation with modern insulation solutions. Improve energy efficiency and building aesthetics."
  },
  "customer-masons": {
    title: "Customer Masons",
    titleKey: "customerMasons",
    description: "Professional masonry services for all your construction needs. Expert bricklaying and stonework by skilled masons. We deliver precision masonry work for foundations, walls, facades, and decorative elements, combining traditional craftsmanship with modern techniques.",
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
    metaDescription: "Professional masonry and bricklaying services. Expert masons delivering precision stonework and brick construction."
  },
  "bathroom-kitchen-renovation": {
    title: "Bathroom-kitchen renovation",
    titleKey: "bathroomKitchenRenovation",
    description: "Complete renovation services for bathrooms and kitchens. From planning to execution, we transform your space efficiently. Our renovation experts handle everything from plumbing and electrical work to tiling, cabinetry, and finishing touches, ensuring your renovated space meets your exact specifications.",
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
    metaDescription: "Complete bathroom and kitchen renovation services. Expert planning and execution to transform your space efficiently."
  },
  "general-demolition-work": {
    title: "General demolition work",
    titleKey: "generalDemolitionWork",
    description: "Professional demolition services for safe and efficient removal of structures. Expert demolition work for renovations, rebuilds, and site preparation. We handle all aspects of demolition with precision, safety, and environmental responsibility, ensuring proper disposal and site cleanup.",
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
    metaDescription: "Professional demolition services for safe and efficient structure removal. Expert demolition work for renovations and site preparation."
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);
  
  if (!service) {
    // Fallback to legacy data
    const legacyService = servicesData[slug];
    if (legacyService) {
      return {
        title: `${legacyService.title} | POSKA MANOLITO AG`,
        description: legacyService.metaDescription,
      };
    }
    return {
      title: "Service Not Found | POSKA MANOLITO AG",
    };
  }

  return {
    title: `${service.title} | POSKA MANOLITO AG`,
    description: service.metaDescription || service.description || `Service: ${service.title}`,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const service = await getServiceBySlug(slug, locale);
  const t = await getTranslations('services');
  const tNav = await getTranslations('navbar');

  // Fallback to legacy data if Sanity service not found
  const legacyService = !service ? servicesData[slug] : null;
  
  if (!service && !legacyService) {
    notFound();
  }

  // Use Sanity service if available, otherwise use legacy
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
    : tNav(`submenu.${legacyService!.titleKey}`);

  return (
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
              {service 
                ? (service.shortDescription || service.description || t('heroDescription', { service: serviceTitle.toLowerCase() }))
                : t('heroDescription', { service: serviceTitle.toLowerCase() })
              }
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
                {service 
                  ? (service.description || service.shortDescription || '')
                  : (legacyService ? t(`descriptions.${legacyService.titleKey}`) : '')
                }
              </p>
            </div>

            {/* Before/After Slider */}
            {activeService.beforeImage && activeService.afterImage && (
              <div className="my-16" data-aos="fade-up" data-aos-delay="100">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-midnight_text dark:text-white mb-2">
                    {t('transformationShowcase')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('transformationDescription')}
                  </p>
                </div>
                <BeforeAfterSlider
                  beforeImage={activeService.beforeImage}
                  afterImage={activeService.afterImage}
                  beforeLabel={t('before')}
                  afterLabel={t('after')}
                  className="w-full"
                />
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-12" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
              >
                {t('getQuote')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Images Section */}
      {activeService.galleryImages && activeService.galleryImages.length > 0 && (
        <section className="py-16 lg:py-24 bg-section dark:bg-darklight">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="text-center mb-12" data-aos="fade-up">
              <h2 className="text-3xl md:text-4xl font-bold text-midnight_text dark:text-white mb-4">
                {t('ourWork')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('ourWorkDescription', { service: serviceTitle.toLowerCase() })}
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
              {t('readyToStart')}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {t('readyToStartDescription', { service: serviceTitle.toLowerCase() })}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#016aac] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-lg shadow-lg hover:scale-105"
            >
              {t('contactUs')}
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
