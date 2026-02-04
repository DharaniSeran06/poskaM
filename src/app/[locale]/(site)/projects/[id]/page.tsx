import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

// Fetch project by slug from Sanity with language support
async function getProjectBySlug(slug: string, locale: string) {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'property_title.en' : `coalesce(property_title.${locale}, property_title.en)`;
    const locationField = locale === 'en' ? 'location.en' : `coalesce(location.${locale}, location.en)`;
    const categoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;
    const worksField = locale === 'en' ? 'works.en' : `coalesce(works.${locale}, works.en)`;
    
    // Architecture Planning: handle both new format (object with title/url) and old format (string)
    // Fetch the raw structure to handle backward compatibility
    const query = `*[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      slug.current == $slug
    ][0] {
      _id,
      propertyId,
      "property_title": ${titleField},
      "image": coalesce(thumbnail.asset->url, ""),
      "location": ${locationField},
      "category": ${categoryField},
      "works": ${worksField},
      architecturePlanning,
      tag,
      "slug": slug.current,
      "gallery": gallery[] {
        "image": coalesce(image.asset->url, ""),
        "alt": coalesce(alt, ""),
        "caption": coalesce(caption, "")
      }
    }`;

    const project = await client.fetch(query, { slug }, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    // Normalize architecturePlanning for backward compatibility
    if (project && project.architecturePlanning) {
      const arch = project.architecturePlanning;
      const localeData = arch[locale] || arch.en;
      
      // New format: object with title and url
      if (localeData && typeof localeData === 'object' && 'title' in localeData) {
        project.architecturePlanning = {
          title: localeData.title || '',
          url: localeData.url || '#',
        };
      }
      // Old format: plain string
      else if (typeof localeData === 'string' && localeData.trim() !== '') {
        project.architecturePlanning = {
          title: localeData,
          url: '#',
        };
      }
      // Fallback: try English if current locale doesn't have data
      else if (locale !== 'en' && arch.en) {
        if (typeof arch.en === 'object' && 'title' in arch.en) {
          project.architecturePlanning = {
            title: arch.en.title || '',
            url: arch.en.url || '#',
          };
        } else if (typeof arch.en === 'string' && arch.en.trim() !== '') {
          project.architecturePlanning = {
            title: arch.en,
            url: '#',
          };
        } else {
          project.architecturePlanning = null;
        }
      } else {
        project.architecturePlanning = null;
      }
      
      // Remove if no title
      if (!project.architecturePlanning?.title) {
        project.architecturePlanning = null;
      }
    }

    console.log(`✅ Fetched project from Sanity (locale: ${locale}):`, project ? project.property_title : 'Not found');
    if (project && project.gallery) {
      console.log(`📸 Project gallery: ${project.gallery.length} images`);
    }
    return project;
  } catch (error) {
    console.error('❌ Error fetching project from Sanity:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const project = await getProjectBySlug(id, locale);
  
  if (!project) {
    return {
      title: "Project Not Found | POSKA MANOLITO AG",
    };
  }

  return {
    title: `${project.property_title} | POSKA MANOLITO AG`,
    description: project.architecturePlanning?.title || `Project ${project.propertyId}`,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const project = await getProjectBySlug(id, locale);
  const t = await getTranslations('projectDetail');

  if (!project) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden min-h-[600px] lg:min-h-[700px] flex items-center">
        <div className="absolute inset-0 z-0">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.property_title || 'Project image'}
              fill
              className="object-cover scale-105 transition-transform duration-[20s] ease-out"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/75"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4">
          <div className="max-w-4xl" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-out">
            {project.propertyId && (
              <div className="mb-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
                <p className="text-sm font-semibold text-white/80 uppercase tracking-[0.15em] mb-3 letter-spacing-wider">
                  {t('propertyId')}
                </p>
                <p className="text-lg font-bold text-white inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                  {project.propertyId}
                </p>
              </div>
            )}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl tracking-tight" data-aos="fade-up" data-aos-delay="150" data-aos-duration="700">
              {project.property_title || 'Project'}
            </h1>
            {project.architecturePlanning && project.architecturePlanning.title && (
              <div className="mt-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
                <p className="text-xl md:text-2xl lg:text-3xl text-white/95 leading-relaxed drop-shadow-lg font-light">
                  {project.architecturePlanning.url && project.architecturePlanning.url !== '#' ? (
                    <a
                      href={project.architecturePlanning.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-all duration-300 hover:underline underline-offset-4 decoration-2"
                    >
                      {project.architecturePlanning.title}
                    </a>
                  ) : (
                    project.architecturePlanning.title
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="py-24 lg:py-36 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              {/* Left Column */}
              <div className="space-y-12 lg:space-y-16">
                {project.propertyId && (
                  <div 
                    className="group transition-all duration-300 ease-out hover:opacity-80"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-easing="ease-out"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1 h-6 bg-[#016aac] rounded-full"></div>
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] letter-spacing-wider">
                        {t('propertyId')}
                      </p>
                    </div>
                    <p className="text-3xl lg:text-4xl font-bold text-[#016aac] tracking-tight leading-tight pl-4">
                      {project.propertyId}
                    </p>
                  </div>
                )}

                <div 
                  className="group transition-all duration-300 ease-out hover:opacity-80"
                  data-aos="fade-up"
                  data-aos-delay="100"
                  data-aos-duration="600"
                  data-aos-easing="ease-out"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-[#016aac] rounded-full"></div>
                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] letter-spacing-wider">
                      {t('object')}
                    </p>
                  </div>
                  <p className="text-3xl lg:text-5xl font-bold text-midnight_text dark:text-white leading-tight tracking-tight pl-4">
                    {project.property_title || 'Untitled Project'}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-12 lg:space-y-16">
                {project.works && project.works.length > 0 && (
                  <div 
                    className="group transition-all duration-300 ease-out"
                    data-aos="fade-up"
                    data-aos-delay="150"
                    data-aos-duration="600"
                    data-aos-easing="ease-out"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1 h-6 bg-[#016aac] rounded-full"></div>
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] letter-spacing-wider">
                        {t('works')}
                      </p>
                    </div>
                    <ul className="space-y-6 pl-4">
                      {project.works.map((work: string, workIndex: number) => (
                        <li 
                          key={workIndex} 
                          className="flex items-start group/item transition-all duration-300 ease-out hover:translate-y-[-2px] hover:opacity-90"
                          data-aos="fade-up"
                          data-aos-delay={200 + workIndex * 80}
                          data-aos-duration="500"
                          data-aos-easing="ease-out"
                        >
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-2 h-2 rounded-full bg-[#016aac] flex-shrink-0 mt-2"></div>
                            <span className="text-lg lg:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-light">
                              {work}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.architecturePlanning && project.architecturePlanning.title && (
                  <div 
                    className="group transition-all duration-300 ease-out"
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-duration="600"
                    data-aos-easing="ease-out"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-6 bg-[#016aac] rounded-full"></div>
                      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] letter-spacing-wider">
                        {t('architectureAndPlanning')}
                      </p>
                    </div>
                    <div className="pl-4">
                      {project.architecturePlanning.url && project.architecturePlanning.url !== '#' ? (
                        <a
                          href={project.architecturePlanning.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl lg:text-2xl text-[#016aac] hover:text-[#015a94] leading-relaxed transition-all duration-300 ease-out inline-flex items-center gap-3 group/link hover:opacity-80"
                        >
                          <span className="font-light">{project.architecturePlanning.title}</span>
                          <svg className="w-5 h-5 transition-transform duration-300 ease-out group-hover/link:translate-x-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <p className="text-xl lg:text-2xl text-gray-800 dark:text-gray-200 leading-relaxed font-light">
                          {project.architecturePlanning.title}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20 lg:py-32 bg-white dark:bg-darkmode">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="max-w-7xl mx-auto" data-aos="fade-up" data-aos-duration="700">
              <div className="text-center mb-12 lg:mb-16" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-midnight_text dark:text-white mb-6 tracking-tight">
                  {t('projectGallery')}
                </h2>
                {t('galleryDescription') && (
                  <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                    {t('galleryDescription')}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {project.gallery.map((galleryItem: any, index: number) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
                    data-aos="fade-up"
                    data-aos-delay={100 + index * 100}
                    data-aos-duration="600"
                  >
                    {galleryItem.image ? (
                      <>
                        <Image
                          src={galleryItem.image}
                          alt={galleryItem.alt || galleryItem.caption || `Gallery image ${index + 1}`}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {(galleryItem.caption || galleryItem.alt) && (
                          <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <p className="text-white text-base font-semibold drop-shadow-lg">
                                {galleryItem.caption || galleryItem.alt}
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional Details Section */}
      {project.architecturePlanning && project.architecturePlanning.title && (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-gray-50/50 to-white dark:from-darklight/30 dark:to-darkmode">
          <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
            <div className="max-w-5xl mx-auto" data-aos="fade-up" data-aos-duration="700">
              <h2 className="text-4xl md:text-5xl font-bold text-midnight_text dark:text-white mb-8 tracking-tight" data-aos="fade-up" data-aos-delay="100">
                {t('projectDetails')}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none" data-aos="fade-up" data-aos-delay="150">
                <div className="bg-white dark:bg-darklight rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100 dark:border-dark_border/50">
                  {project.architecturePlanning.url && project.architecturePlanning.url !== '#' ? (
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      <a
                        href={project.architecturePlanning.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#016aac] hover:text-[#015a94] hover:underline transition-all duration-300 inline-flex items-center gap-3 group/link"
                      >
                        <span>{project.architecturePlanning.title}</span>
                        <svg className="w-6 h-6 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </p>
                  ) : (
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                      {project.architecturePlanning.title}
                    </p>
                  )}
                  {project.category && (
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('projectDetailsText', { category: project.category.toLowerCase() })}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#016aac] via-[#015a94] to-[#016aac] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="700">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight" data-aos="fade-up" data-aos-delay="100">
              {t('interestedInSimilar')}
            </h2>
            <p className="text-xl lg:text-2xl text-white/95 mb-12 leading-relaxed font-light" data-aos="fade-up" data-aos-delay="150">
              {t('interestedDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-5 bg-white text-[#016aac] rounded-xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-1"
              >
                <span>{t('getQuote')}</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-10 py-5 bg-transparent border-2 border-white/90 text-white rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 font-semibold text-lg backdrop-blur-sm"
              >
                <span>{t('contactUs')}</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
