import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allProjects } from "@/data/projects";

// Enable ISR with revalidation for better production performance
export const revalidate = 60; // Revalidate every 60 seconds

// Generate static params for all projects
export async function generateStaticParams() {
  return allProjects.map((project) => ({
    id: String(project.id),
  }));
}

// Explicit type for page props with async params
type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    return {
      title: "Project Not Found | POSKA MANOLITO AG",
    };
  }

  return {
    title: `${project.title} | POSKA MANOLITO AG`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = allProjects.find(p => p.id === parseInt(id));

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-white dark:bg-darkmode">
      {/* Minimal Hero Section - Swiss Style */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh]">
        {/* Hero Image */}
        <div className="absolute inset-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>

        {/* Hero Content - Bottom aligned, minimal */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8 pb-16 lg:pb-24">
            {/* Property ID Badge */}
            {project.propertyId && (
              <div className="mb-6" data-aos="fade-up" data-aos-duration="600">
                <span className="inline-flex items-center gap-2 text-xs font-medium text-white/70 uppercase tracking-[0.2em]">
                  <span className="w-8 h-px bg-[#016aac]"></span>
                  Property ID {project.propertyId}
                </span>
              </div>
            )}
            
            {/* Main Title - Bold Architectural Typography */}
            <h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-white leading-[0.9] tracking-[-0.03em] max-w-5xl"
              data-aos="fade-up" 
              data-aos-duration="800"
              data-aos-delay="100"
            >
              {project.title}
            </h1>
            
            {/* Description Subtitle */}
            {project.description && (
              <div className="mt-8" data-aos="fade-up" data-aos-duration="600" data-aos-delay="200">
                <p className="text-lg md:text-xl text-white/80 font-light tracking-wide max-w-2xl">
                  {project.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden lg:block" data-aos="fade-up" data-aos-delay="400">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-[10px] uppercase tracking-[0.3em] rotate-90 origin-center translate-y-4">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Project Metadata Section - Clean Grid */}
      <section className="py-20 lg:py-32 border-b border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 lg:mb-24" data-aos="fade-up">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#016aac]"></div>
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">
                Object
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-[-0.02em] leading-tight max-w-4xl">
              {project.object || project.title}
            </h2>
          </div>

          {/* Metadata Grid - Swiss Style Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 dark:bg-neutral-700" data-aos="fade-up" data-aos-delay="100">
            {/* Property ID Card */}
            {project.propertyId && (
              <div className="bg-white dark:bg-darkmode p-8 lg:p-12 group hover:bg-neutral-50 dark:hover:bg-darklight transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#016aac]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#016aac]/40 transition-colors">
                    <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.2em] mb-2">
                      Property ID
                    </p>
                    <p className="text-2xl lg:text-3xl font-semibold text-[#016aac] tracking-tight">
                      {project.propertyId}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Category Card */}
            {project.category && (
              <div className="bg-white dark:bg-darkmode p-8 lg:p-12 group hover:bg-neutral-50 dark:hover:bg-darklight transition-colors duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-[#016aac]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#016aac]/40 transition-colors">
                    <svg className="w-5 h-5 text-[#016aac]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium text-neutral-400 uppercase tracking-[0.2em] mb-2">
                      Category
                    </p>
                    <p className="text-xl lg:text-2xl font-medium text-neutral-800 dark:text-white">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Works Section - Clean List */}
      {project.works && project.works.length > 0 && (
        <section className="py-20 lg:py-32 border-b border-neutral-100 dark:border-neutral-800">
          <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Section Label */}
              <div className="lg:col-span-4" data-aos="fade-up">
                <div className="lg:sticky lg:top-32">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-[#016aac]"></div>
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">
                      Works
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                    Scope of Work
                  </h3>
                </div>
              </div>

              {/* Works List */}
              <div className="lg:col-span-8">
                <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                  {project.works.map((work, workIndex) => (
                    <li 
                      key={workIndex}
                      className="py-6 lg:py-8 group"
                      data-aos="fade-up"
                      data-aos-delay={workIndex * 50}
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-sm font-medium text-[#016aac] tabular-nums mt-1">
                          {String(workIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg lg:text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                          {work}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Architecture & Planning Section */}
      {project.architectureAndPlanning && (
        <section className="py-20 lg:py-32 border-b border-neutral-100 dark:border-neutral-800">
          <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Section Label */}
              <div className="lg:col-span-4" data-aos="fade-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-[#016aac]"></div>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">
                    Architecture & Planning
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                  Design Partner
                </h3>
              </div>

              {/* Architecture Info */}
              <div className="lg:col-span-8" data-aos="fade-up" data-aos-delay="100">
                <div className="p-8 lg:p-12 bg-neutral-50 dark:bg-darklight rounded-sm border-l-2 border-[#016aac]">
                  <p className="text-2xl lg:text-3xl font-medium text-neutral-900 dark:text-white">
                    {project.architectureAndPlanning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reference Gallery Section - Masonry-like Grid */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8">
            {/* Gallery Header */}
            <div className="flex items-center justify-between mb-12 lg:mb-16" data-aos="fade-up">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-px bg-[#016aac]"></div>
                  <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">
                    Gallery
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Visual Documentation
                </h2>
              </div>
              <span className="hidden md:block text-5xl lg:text-6xl font-bold text-neutral-100 dark:text-neutral-800">
                {String(project.galleryImages.length).padStart(2, '0')}
              </span>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
              {project.galleryImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative overflow-hidden group ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  data-aos="fade-up"
                  data-aos-delay={Math.min(index * 50, 200)}
                >
                  <div className={`relative ${index === 0 ? 'aspect-[4/3]' : 'aspect-square'} bg-neutral-100 dark:bg-neutral-800`}>
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    {/* Image number */}
                    <div className="absolute bottom-4 left-4 text-xs font-medium text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Project Details Section */}
      <section className="py-20 lg:py-32 border-t border-neutral-100 dark:border-neutral-800">
        <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Section Label */}
            <div className="lg:col-span-4" data-aos="fade-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#016aac]"></div>
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-[0.2em]">
                  About
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                Reference Details
              </h3>
            </div>

            {/* Details Content */}
            <div className="lg:col-span-8" data-aos="fade-up" data-aos-delay="100">
              <div className="space-y-6">
                <p className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-200 leading-relaxed">
                  {project.description}
                </p>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  This reference showcases our commitment to quality craftsmanship and attention to detail. 
                  Our team worked diligently to ensure every aspect met the highest standards, 
                  from initial planning through final completion. The result is a testament to our expertise 
                  in {project.category.toLowerCase()} and our dedication to delivering exceptional results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - Minimal, Elegant */}
      <section className="py-24 lg:py-40 bg-neutral-900 dark:bg-neutral-950 relative overflow-hidden">
        {/* Subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#016aac] to-transparent"></div>
        
        <div className="container mx-auto lg:max-w-screen-xl px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8" data-aos="fade-up">
              <span className="inline-flex items-center gap-3 text-xs font-medium text-neutral-500 uppercase tracking-[0.2em]">
                <span className="w-8 h-px bg-[#016aac]"></span>
                Get in Touch
                <span className="w-8 h-px bg-[#016aac]"></span>
              </span>
            </div>
            
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-[-0.02em] leading-tight"
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              Ready to Start<br />Your Project?
            </h2>
            
            <p 
              className="text-lg lg:text-xl text-neutral-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              data-aos="fade-up" 
              data-aos-delay="150"
            >
              Contact us today to discuss your project requirements and get a free consultation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-[#016aac] text-white rounded-sm hover:bg-[#015a94] transition-all duration-300 font-medium text-sm uppercase tracking-[0.1em]"
              >
                <span>Get a Quote</span>
                <svg className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-neutral-700 text-white rounded-sm hover:border-neutral-500 hover:bg-white/5 transition-all duration-300 font-medium text-sm uppercase tracking-[0.1em]"
              >
                <span>Contact Us</span>
                <svg className="w-4 h-4 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
