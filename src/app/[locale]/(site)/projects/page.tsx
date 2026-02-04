import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import HeroSub from "@/app/components/shared/hero-sub";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { client } from '@/sanity/lib/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Always fetch fresh data

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Projects | POSKA MANOLITO AG",
    description: "Explore our portfolio of completed construction, renovation, and building projects. Showcasing our expertise and commitment to quality across Switzerland.",
  };
}

// Fetch projects from Sanity with language support
async function getProjects(locale: string) {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'property_title.en' : `coalesce(property_title.${locale}, property_title.en)`;
    const locationField = locale === 'en' ? 'location.en' : `coalesce(location.${locale}, location.en)`;
    const categoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;
    const worksField = locale === 'en' ? 'works.en' : `coalesce(works.${locale}, works.en)`;
    
    const query = `*[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ] | order(_createdAt desc) {
      _id,
      propertyId,
      "property_title": ${titleField},
      "image": coalesce(thumbnail.asset->url, ""),
      "location": ${locationField},
      "category": ${categoryField},
      "works": ${worksField},
      architecturePlanning,
      tag,
      "slug": slug.current
    }`;

    const projects = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    // Normalize architecturePlanning for backward compatibility
    const normalizedProjects = projects.map((project: any) => {
      if (project.architecturePlanning) {
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
      return project;
    });

    console.log(`✅ Fetched ${normalizedProjects.length} projects from Sanity (locale: ${locale})`);
    return normalizedProjects || [];
  } catch (error) {
    console.error('❌ Error fetching projects from Sanity:', error);
    return [];
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('projects');
  const projects = await getProjects(locale);
  
  const breadcrumbLinks = [
    { href: "/", text: t('breadcrumb.home') },
    { href: "/projects", text: t('breadcrumb.projects') },
  ];

  return (
    <main>
      {/* Hero Section */}
      <HeroSub
        title={t('title')}
        description={t('description')}
        breadcrumbLinks={breadcrumbLinks}
      />

      {/* Projects Grid Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-darkmode">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('noProjects') || 'No projects found. Please check back later.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: any, index: number) => (
                <div
                  key={project._id || project.slug}
                  className="group bg-white dark:bg-darklight rounded-xl overflow-hidden border border-gray-200 dark:border-dark_border shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Project Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.property_title || 'Project image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                        <span className="text-gray-400 dark:text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-4">
                    {/* Property ID */}
                    {project.propertyId && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          {t('propertyId')}
                        </p>
                        <p className="text-sm font-bold text-[#016aac]">
                          {project.propertyId}
                        </p>
                      </div>
                    )}

                    {/* Object / Title */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                        {t('object')}
                      </p>
                      <p className="text-base font-semibold text-midnight_text dark:text-white">
                        {project.property_title || 'Untitled Project'}
                      </p>
                    </div>

                    {/* Works */}
                    {project.works && project.works.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                          {t('works')}
                        </p>
                        <ul className="space-y-1.5">
                          {project.works.map((work: string, workIndex: number) => (
                            <li key={workIndex} className="flex items-start">
                              <span className="text-[#016aac] mr-2 mt-1.5">•</span>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {work}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Architecture and planning */}
                    {project.architecturePlanning && project.architecturePlanning.title && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                          {t('architectureAndPlanning')}
                        </p>
                        {project.architecturePlanning.url && project.architecturePlanning.url !== '#' ? (
                          <a
                            href={project.architecturePlanning.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#016aac] hover:text-[#015a94] hover:underline leading-relaxed transition-colors"
                          >
                            {project.architecturePlanning.title}
                            <svg className="w-3 h-3 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                            {project.architecturePlanning.title}
                          </p>
                        )}
                      </div>
                    )}

                    {/* LEARN MORE Button */}
                    <div className="pt-2">
                      <Link
                        href={`/projects/${project.slug || project._id}`}
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-sm shadow-md hover:scale-[1.02] group/btn"
                      >
                        {t('learnMore')}
                        <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
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
