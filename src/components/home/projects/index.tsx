import React from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { client } from '@/sanity/lib/client';

// Fetch featured references from Sanity with language support
async function getFeaturedProjects(locale: string) {
  try {
    // Build language-aware field selections
    const titleField = locale === 'en' ? 'property_title.en' : `coalesce(property_title.${locale}, property_title.en)`;
    const categoryField = locale === 'en' ? 'category.en' : `coalesce(category.${locale}, category.en)`;
    
    // Architecture Planning: fetch as object with title and url, with fallback
    const archTitleField = locale === 'en' 
      ? 'coalesce(architecturePlanning.en.title, architecturePlanning.en)' 
      : `coalesce(architecturePlanning.${locale}.title, architecturePlanning.en.title, architecturePlanning.${locale}, architecturePlanning.en)`;

    const query = `*[
      _type == "project" &&
      !(_id in path("drafts.**")) &&
      defined(slug.current)
    ] | order(_createdAt desc) [0...3] {
      _id,
      propertyId,
      "title": ${titleField},
      "category": ${categoryField},
      "description": ${archTitleField},
      "image": coalesce(thumbnail.asset->url, ""),
      "slug": slug.current
    }`;

    // Use caching for better performance - revalidate every hour
    const projects = await client.fetch(query, {}, {
      cache: 'force-cache',
      next: { revalidate: 3600, tags: ['projects', 'home-projects'] }
    });

    console.log(`✅ Home: Fetched ${projects.length} featured references from Sanity (locale: ${locale})`);
    console.log('📋 Home References data:', projects);
    return projects || [];
  } catch (error) {
    console.error('❌ Home: Error fetching references from Sanity:', error);
    return [];
  }
}

export default async function Projects({ locale }: { locale: string }) {
  const t = await getTranslations('home.projects');
  const projects = await getFeaturedProjects(locale);

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-darkmode">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-midnight_text dark:text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('noProjects') || 'No projects available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project: any, index: number) => (
              <div
                key={project._id || project.slug}
                className="group bg-white/95 dark:bg-darklight/95 backdrop-blur-sm rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Semi-transparent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/95 to-[#016aac]/5 dark:from-darklight/90 dark:via-darklight/95 dark:to-[#016aac]/10 rounded-xl pointer-events-none z-0"></div>
                
                <div className="relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-800 z-0">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title || 'Reference image'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                      <span className="text-gray-400 dark:text-gray-500">No Image</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#016aac] text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-3 group-hover:text-[#016aac] transition-colors">
                    {project.title || 'Untitled Reference'}
                  </h3>
                  {project.description && (
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  )}
                  <Link
                    href={`/projects/${project.slug || project._id}`}
                    className="inline-flex items-center text-[#016aac] font-semibold group-hover:translate-x-2 transition-transform duration-300"
                  >
                    {t('viewDetails')}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12" data-aos="fade-up">
          <Link
            href="/projects"
            className="inline-flex items-center px-8 py-4 bg-[#016aac] text-white rounded-lg hover:bg-[#015a94] transition-all duration-300 font-semibold text-lg shadow-md hover:scale-105"
          >
            {t('viewAllProjects')}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
